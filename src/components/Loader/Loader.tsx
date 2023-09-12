import { Spin } from "antd";

interface LoaderProps {
  isLoading: boolean;
  children: any;
}

function Loader({ isLoading = false, ...props }: LoaderProps) {
  return (
    <Spin spinning={isLoading} tip="Loading" size="large">
      {props.children}
    </Spin>
  );
}

export default Loader;
