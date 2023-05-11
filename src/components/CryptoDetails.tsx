import { Select, Typography } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import millify from "millify";

import { CoinDetails } from "../types/coinsTypes";
import HTMLReactParser from "html-react-parser";
import LineChart from "./LineChart";
import { LoadingPage } from ".";

const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails: CoinDetails = data?.data?.coin;

  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  if (isFetching) return <LoadingPage />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${
        cryptoDetails?.price && millify(Number.parseInt(cryptoDetails?.price))
      }`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails["24hVolume"] &&
        millify(Number.parseInt(cryptoDetails["24hVolume"]))
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap &&
        millify(Number.parseInt(cryptoDetails?.marketCap))
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(Number.parseInt(cryptoDetails?.allTimeHigh?.price))
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  console.log(cryptoDetails?.supply?.total);

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total
          ? millify(Number.parseInt(cryptoDetails?.supply?.total))
          : "0"
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(Number.parseInt(cryptoDetails?.supply?.circulating))
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div>
      <div className="text-center border-b border-[#cdcdcd] pb-8 mb-8">
        <h2 className="text-primary font-extrabold text-3xl">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price{" "}
        </h2>
        <p>
          {cryptoDetails.name} price in US Dollars. View value statistics,
          market cap and supply
        </p>
      </div>

      <Select
        defaultValue={"7d"}
        placeholder="Select Time Period"
        value={timeperiod}
        onChange={(value) => setTimeperiod(value)}
        className="w-[300px]"
      >
        {time.map((date, i) => (
          <Option key={i} value={date}>
            {date}
          </Option>
        ))}
      </Select>

      {/* Line Chart */}
      <LineChart
        coinHistory={coinHistory}
        coinName={cryptoDetails.name}
        currentPrice={millify(Number.parseInt(cryptoDetails.price))}
      />

      <div className="text-gray-600 grid xl:grid-cols-2 py-12 justify-center gap-20">
        <div className="">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">
              {cryptoDetails.name} Value Statistics
            </h3>

            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </div>

          {stats.map(({ icon, title, value }) => (
            <div key={title} className="card-list ">
              <div className="flex items-center gap-2 text-start">
                <p className="mb-2">{icon}</p>
                <p>{title}</p>
              </div>

              <p className="font-black text-lg">{value}</p>
            </div>
          ))}
        </div>

        <div className="">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Other Statistics</h3>

            <p>An overview showing the stats of all crypto currencies</p>
          </div>

          {genericStats.map(({ icon, title, value }) => (
            <div className="card-list " key={title}>
              <div className="flex items-center gap-2 text-start">
                <p className="mb-2">{icon}</p>
                <p>{title}</p>
              </div>

              <p className="font-black text-lg">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-8 xl:grid-cols-2 justify-center">
        <div>
          <h3 className="text-primary text-2xl font-bold">
            What is {cryptoDetails.name}
          </h3>
          <p>{HTMLReactParser(cryptoDetails.description)}</p>
        </div>

        <div className="">
          <h3 className="text-2xl font-bold mb-4">
            {cryptoDetails.name} Links
          </h3>

          {cryptoDetails.links.map((link) => (
            <div key={link.name} className="card-list capitalize font-bold">
              <p className="font-bold">{link.type}</p>
              <a
                className="text-primary font-bold hover:underline"
                href={link.url}
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
