import millify from "millify";
import React from "react";

interface StatsCardType {
  title: string;
  value: string;
  className?: string;
}

const StatsCard = ({ title, value, className }: StatsCardType) => {
  return (
    <div className={` text-[#333]  ${className}`}>
      <h2 className="text-sm sm:text-base">{title}</h2>
      <h3 className="text-xl md:text-3xl font-bold">{value}</h3>
    </div>
  );
};

export default StatsCard;
