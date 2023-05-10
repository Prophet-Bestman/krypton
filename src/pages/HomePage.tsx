import React from "react";
import millify from "millify";
import { Statistic, Typography } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { CryptoCurrencies, News, StatsCard } from "../components";
import { CoinsResp, Stats } from "../types/coinsTypes";
import { Link } from "react-router-dom";
import NewsComponent from "../components/News";

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery("");

  const globalStats: Stats = data?.data?.stats;

  // console.log("Data: ", data);

  if (isFetching) return <p>Loading...</p>;

  return (
    <div>
      <Typography.Title level={2}>Global Crypto Stats</Typography.Title>

      {globalStats && (
        <div className="grid grid-cols-12 stats gap-y-6">
          <StatsCard
            className="col-span-6"
            title="Total Cryptocurrencies"
            value={globalStats.totalCoins.toLocaleString()}
          />
          <StatsCard
            className="col-span-6"
            title="Total Exchanges"
            value={millify(globalStats?.totalExchanges)}
          />
          <StatsCard
            className="col-span-6"
            title="Total Market Cap"
            value={millify(Number.parseFloat(globalStats.totalMarketCap))}
          />
          <StatsCard
            className="col-span-6"
            title="Total 24h Volume"
            value={millify(Number.parseFloat(globalStats.total24hVolume))}
          />
          <StatsCard
            className="col-span-6"
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
          <StatsCard
            className="col-span-6"
            title="Total"
            value={globalStats.total.toLocaleString()}
          />
        </div>
      )}

      <div className="flex items-center justify-between mt-20">
        <h3 className=" text-3xl font-bold">
          Top 10 Crypto Currencies in the World
        </h3>
        <h3 className=" text-lg font-semibold  text-primary">
          <Link to="/cryptocurrencies">Show more</Link>
        </h3>
      </div>
      <CryptoCurrencies simplified />
      <div className="flex items-center justify-between mt-8">
        <h3 className=" text-3xl font-bold">Latest Crypto News</h3>
        <h3 className=" text-lg font-semibold  text-primary">
          <Link to="/news">Show more</Link>
        </h3>
      </div>

      <NewsComponent simplified />
    </div>
  );
};

export default HomePage;
