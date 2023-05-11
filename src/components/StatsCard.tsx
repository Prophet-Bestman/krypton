interface StatsCardType {
  title: string;
  value: string;
}

const StatsCard = ({ title, value }: StatsCardType) => {
  return (
    <div className={` text-[#333] bg-white py-8 px-6 rounded-md grid gap-2`}>
      <h2 className="text-sm sm:text-base">{title}</h2>
      <h3 className="text-xl md:text-3xl font-bold text-primary">{value}</h3>
    </div>
  );
};

export default StatsCard;
