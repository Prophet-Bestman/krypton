import millify from "millify";
import { Typography } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { CryptoCurrencies, LoadingPage, StatsCard } from "../components";
import { Stats } from "../types/coinsTypes";
import { Link } from "react-router-dom";
import NewsComponent from "../components/News";

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery("");

  const globalStats: Stats = data?.data?.stats;

  // console.log("Data: ", data);

  if (isFetching) return <LoadingPage />;

  return (
    <div>
      <Typography.Title level={2}>Global Crypto Stats</Typography.Title>

      {globalStats && (
        <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 stats gap-y-6 gap-x-8">
          <StatsCard
            title="Total Cryptocurrencies"
            value={globalStats.totalCoins.toLocaleString()}
          />
          <StatsCard
            title="Total Exchanges"
            value={millify(globalStats?.totalExchanges)}
          />
          <StatsCard
            title="Total Market Cap"
            value={millify(Number.parseFloat(globalStats.totalMarketCap))}
          />
          <StatsCard
            title="Total 24h Volume"
            value={millify(Number.parseFloat(globalStats.total24hVolume))}
          />
          <StatsCard
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
          <StatsCard title="Total" value={globalStats.total.toLocaleString()} />
        </div>
      )}

      <div className="flex items-center justify-between mt-20">
        <h3 className="text-xl md:text-3xl font-bold">
          Top 10 Crypto Currencies in the World
        </h3>
        <h3 className="text-sm sm:text-base md:text-lg font-semibold   text-primary">
          <Link to="/cryptocurrencies">Show more</Link>
        </h3>
      </div>
      <CryptoCurrencies simplified />
      <div className="flex items-center justify-between mt-8">
        <h3 className="text-xl md:text-3xl font-bold">Latest Crypto News</h3>
        <h3 className="text-sm sm:text-base md:text-lg font-semibold   text-primary">
          <Link to="/news">Show more</Link>
        </h3>
      </div>

      <NewsComponent simplified />
    </div>
  );
};

export default HomePage;
