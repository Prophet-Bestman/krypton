import { Route, Routes, Link } from "react-router-dom";
import { Typography, Layout, Space } from "antd";

import { Navbar } from "./components";
import { Cryptocurrencies, Exchanges, HomePage, News } from "./pages";
import CryptoDetails from "./components/CryptoDetails";

function App() {
  // const { } = useGetCryptos
  return (
    <div className="md:grid md:grid-cols-10 ">
      <div className="col-span-3 w-full lg:col-span-2 bg-secondaryBg md:min-h-screen ">
        <Navbar />
      </div>
      <div className="col-span-7 min-h-screen lg:col-span-8 grid">
        <div>
          <Layout>
            <div className="px-6 md:px-12 py-8 ">
              <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<Exchanges />} path="/exchanges" />
                <Route
                  element={<Cryptocurrencies />}
                  path="/cryptocurrencies"
                />
                <Route element={<News />} path="/news" />
                <Route element={<CryptoDetails />} path="crypto/:coinId" />
              </Routes>
            </div>
          </Layout>
        </div>

        <div className="flex flex-col items-center bg-secondaryBg mt-auto py-4">
          <Typography.Title
            level={5}
            style={{ color: "#fff" }}
            className="text-center"
          >
            Krypton <br />
            All rights reserved
          </Typography.Title>

          <Space className="text-primary text-sm">
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
