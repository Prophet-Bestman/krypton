import { useEffect, useState } from "react";
import { Card, Select, Skeleton, Typography, Avatar } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { Value } from "../types/newsTypes";
import { formatDistanceToNow } from "date-fns";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Coin } from "../types/coinsTypes";

const NewsComponent = ({ simplified }: { simplified?: boolean }) => {
  const count = simplified ? 12 : 100;
  const [news, setNews] = useState<null | Value[]>(null);
  const [newsCategoty, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategoty: newsCategoty,
    count: count,
  });

  const { data: cryptosResp } = useGetCryptosQuery(100);

  useEffect(() => {
    if (cryptoNews?.value?.length > 0) {
      setNews(cryptoNews.value);
    } else setNews(null);
  }, [cryptoNews]);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
      <div className="col-span-full">
        {!!cryptosResp && (
          <Select
            showSearch
            className="w-[300px]"
            placeholder="search a crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => {
              const optionChildren = `${option?.children}`;
              return (
                optionChildren?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
              );
            }}
          >
            <Select.Option vallue="Cryptocurrency">
              Cryptocurrency
            </Select.Option>
            {cryptosResp?.data?.coins?.map((coin: Coin) => (
              <Select.Option value={coin.name} key={coin.uuid}>
                {coin.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </div>
      {isFetching ? (
        <Skeleton className="col-span-3" paragraph={false} active />
      ) : (
        !!news?.length &&
        news?.map((singleNews, i) => (
          <Card hoverable className="" key={i}>
            <a
              className="flex flex-col gap-2 justify-between h-full"
              href={singleNews?.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center gap-1 mb-4">
                <Typography.Title className="flex-1" level={4}>
                  {singleNews.name}
                </Typography.Title>
                <img
                  src={singleNews?.image?.thumbnail?.contentUrl}
                  alt="news"
                  className="w-20 object-cover"
                />
              </div>
              <p className="">
                {singleNews.description.length > 200
                  ? `${singleNews.description.substring(0, 200)}...`
                  : singleNews.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-1 items-center">
                  <Avatar
                    src={singleNews?.provider[0]?.image?.thumbnail?.contentUrl}
                    alt="news-avatar"
                  />
                  <Typography.Text className="capitalize">
                    {singleNews?.provider[0]?.name}
                  </Typography.Text>
                </div>
                <Typography.Text className="capitalize">
                  {formatDistanceToNow(new Date(singleNews.datePublished))}
                </Typography.Text>
              </div>
            </a>
          </Card>
        ))
        // !!cryptoNews && cryptoNews?.value(<></>)
      )}
    </div>
  );
};

export default NewsComponent;
