import { Spin } from "antd";

const LoadingPage = () => {
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <Spin />
    </div>
  );
};

export default LoadingPage;
