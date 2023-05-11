import { Spin } from "antd";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <Spin />
    </div>
  );
};

export default LoadingPage;
