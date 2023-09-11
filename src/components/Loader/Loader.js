import React from "react";
import { Spin } from "antd";

function Loader({ isLoading = false, ...props }) {
  return (
    <Spin spinning={isLoading} tip="Loading" size="large">
      {props.children}
    </Spin>
  );
}

export default Loader;
