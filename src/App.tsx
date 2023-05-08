import { Route, Routes, Link } from "react-router-dom";
import { Typography, Layout, Space } from "antd";

import { Navbar } from "./components";
import { Cryptocurrencies, Exchanges, HomePage, News } from "./pages";

function App() {
  // const { } = useGetCryptos
  return (
    <div className="grid grid-cols-10 ">
      <div className="col-span-2 bg-secondaryBg min-h-screen ">
        <Navbar />
      </div>
      <div className="col-span-8 relative">
        <div>
          <Layout>
            <div className="px-12 py-8 min-h-[90vh]">
              <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<Exchanges />} path="/exchanges" />
                <Route
                  element={<Cryptocurrencies />}
                  path="/cryptocurrencies"
                />
                <Route element={<News />} path="/news" />
              </Routes>
            </div>
          </Layout>
        </div>

        <div className="flex flex-col items-center bg-secondaryBg absolute bottom-0 left-0 w-full py-4">
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
