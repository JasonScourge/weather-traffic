import React, { useEffect, useState, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Col, Row, DatePicker, TimePicker, Button, Typography } from "antd";

import WeatherForecastService from "../../services/weatherForecastService";
import TrafficImageService from "../../services/trafficImagesService";

import styles from "./styles";
import Loader from "../../components/Loader/Loader";
import {
  findNearestLocation,
  getCamerasData,
  getGeoCodesData,
} from "../../utils/utils";
import WeatherIcons from "../../components/WeatherIcons/WeatherIcons";

import {
  SelectedLocationDataType,
  WeatherTrafficDataType,
  TrafficImagesDataType,
} from "./types";

const { Title } = Typography;

function WeatherTraffic() {
  const ref = useRef<null | HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedLocationData, setSelectedLocationData] =
    useState<SelectedLocationDataType | null>(null);

  const [weatherTrafficData, setWeatherTrafficData] =
    useState<WeatherTrafficDataType | null>(null);
  const [trafficImagesData, setTrafficImagesData] =
    useState<TrafficImagesDataType | null>(null);
  const [locationList, setLocationList] = useState<string[] | null>(null);
  const [locationsData, setLocationsData] = useState<any>(null);

  useEffect(() => {
    if (trafficImagesData && weatherTrafficData) {
      const cameras = getCamerasData(trafficImagesData);
      const geoCodes = getGeoCodesData(weatherTrafficData);
      processDataForLocationList(cameras, geoCodes);
    }
  }, [trafficImagesData, weatherTrafficData]);

  const fetchWeatherTraffic = async (inputDate: Dayjs) => {
    try {
      const response = await WeatherForecastService.getWeatherForecast(
        inputDate
      );
      setWeatherTrafficData(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error in fetching weather traffic", error);
      setIsLoading(false);
    }
  };

  const fetchTrafficImages = async (inputDate: Dayjs) => {
    try {
      const response = await TrafficImageService.getTrafficImages(inputDate);
      setTrafficImagesData(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error in fetching traffic images", error);
      setIsLoading(false);
    }
  };

  const resetLocationSelection = () => {
    setSelectedLocation("");
    setSelectedLocationData(null);
  };

  const processDataForLocationList = (cameras: any[], geoCodes: any[]) => {
    const locationsData: any = {};
    const locationListing: string[] = [];

    for (const camera of cameras) {
      const latitude = camera?.location?.latitude;
      const longitude = camera?.location?.longitude;
      const nearestLocation = findNearestLocation(
        latitude,
        longitude,
        geoCodes
      );
      if (!locationsData[nearestLocation.name]) {
        locationsData[nearestLocation.name] = {
          ...nearestLocation,
          images: [camera.image],
        };
        locationListing.push(nearestLocation.name);
      } else {
        locationsData[nearestLocation.name].images.push(camera.image);
      }
    }

    setLocationList(locationListing.sort());
    setLocationsData(locationsData);
  };

  const scrollToWeather = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Loader isLoading={isLoading}>
        <Row gutter={[24, 16]}>
          <Col style={styles.datePickerContainer} span={12}>
            <DatePicker
              style={styles.datePicker}
              disabledDate={(current) => current.isAfter(dayjs())}
              onChange={(date, dateString) =>
                date ? setSelectedDate(dateString) : setSelectedDate("")
              }
            />
          </Col>
          <Col style={styles.timePickerContainer} span={12}>
            <TimePicker
              style={styles.timePicker}
              onChange={(value, timeString) =>
                value ? setSelectedTime(timeString) : setSelectedTime("")
              }
            />
          </Col>
        </Row>
        <Row gutter={[24, 16]}>
          <Col style={styles.btnContainer} span={24}>
            <Button
              block
              loading={isLoading}
              type="primary"
              style={styles.btnEnter}
              disabled={!selectedDate || !selectedTime}
              onClick={() => {
                const selectedDateTime: Dayjs = dayjs(
                  `${selectedDate}${selectedTime}`
                );
                setIsLoading(true);
                fetchTrafficImages(selectedDateTime);
                fetchWeatherTraffic(selectedDateTime);
                resetLocationSelection();
              }}
            >
              Fetch Locations
            </Button>
          </Col>
        </Row>
        <Row gutter={[24, 16]}>
          {locationList && (
            <Col lg={16} xs={24}>
              <Row style={styles.locationsBtnsContainer} gutter={[12, 16]}>
                {locationList.map((location: string) => (
                  <Col lg={8} xs={24} key={location}>
                    <Button
                      block
                      onClick={() => {
                        setSelectedLocation(location);
                        setSelectedLocationData(locationsData[location]);
                        scrollToWeather();
                      }}
                    >
                      {location}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Col>
          )}
          <Col lg={8} xs={24}>
            {selectedLocation && selectedLocationData && (
              <Row ref={ref} style={styles.weatherContainer}>
                <WeatherIcons forecast={selectedLocationData?.forecast} />
                <Col span={24}>
                  <Title style={styles.forecastText} level={3}>
                    {selectedLocationData?.forecast}
                  </Title>
                </Col>
                <Col span={24}>
                  <Title
                    style={styles.selectedLocationTitleContainer}
                  >{`${selectedLocation}`}</Title>
                </Col>
              </Row>
            )}
          </Col>
        </Row>

        {selectedLocationData && (
          <Row gutter={[24, 16]}>
            <Col lg={24} xs={24}>
              {selectedLocationData?.images.map((image, index) => (
                <div style={styles.imgContainer} key={image}>
                  <img
                    src={image}
                    alt={`${selectedLocation}CameraImage-${index}`}
                    width={"100%"}
                  />
                </div>
              ))}
            </Col>
          </Row>
        )}
      </Loader>
    </div>
  );
}

export default WeatherTraffic;
