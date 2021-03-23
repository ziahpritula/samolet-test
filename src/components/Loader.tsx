import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loader = ({ size = 24 }: { size?: number }) => (
  <div className="wrapper">
    <Spin indicator={<LoadingOutlined style={{ fontSize: size }} spin />} />
  </div>
);

export default Loader;
