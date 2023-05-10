import React, { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Coin } from "../types/coinsTypes";
import { Link } from "react-router-dom";
import { Card, Input, Skeleton } from "antd";
import millify from "millify";

const CryptoCurrencies = ({ simplified }: { simplified?: boolean }) => {
  const count = simplified ? 12 : 100;
  const [cryptoList, setCryptoList] = useState<Coin[] | null>(null);
  const [searchText, setSearchText] = useState("");

  const { data: cryptosResp, isFetching } = useGetCryptosQuery(
    count.toLocaleString()
  );

  useEffect(() => {
    if (!!cryptosResp && cryptosResp?.status === "success") {
      const filteredData = cryptosResp?.data?.coins?.filter((coin: Coin) =>
        coin.name.toLowerCase().includes(searchText.toLowerCase())
      );

      setCryptoList(filteredData);
    }
  }, [cryptosResp, searchText]);

  return (
    <div className=" grid gap-4 my-4">
      {!simplified && (
        <div className="w-[300px]">
          <Input
            placeholder="Search Cryptocurrencies"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      )}
      {isFetching ? (
        <Skeleton paragraph={false} active />
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {cryptoList?.map((currency) => (
            <div className="col-span-4" key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img
                      src={currency.iconUrl}
                      alt={currency.name}
                      className="w-8"
                    />
                  }
                  hoverable
                >
                  <div className="grid gap-3">
                    <p>Price: {millify(Number.parseInt(currency.price))} </p>
                    <p>
                      Market Cap: {millify(Number.parseInt(currency.marketCap))}
                    </p>
                    <p>
                      Daily Change: {millify(Number.parseInt(currency.change))}%
                    </p>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoCurrencies;
