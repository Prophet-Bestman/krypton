import React, { useEffect, useState } from "react";
import { Button, Menu, Typography, Avatar, Drawer } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Icon from "../img/krypton-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const navs = [
    {
      label: "Home",
      name: "Home",
      key: "Home",
      icon: <HomeOutlined />,
      link: "/",
      onClick: () => {
        setActive(false);
        navigate("/");
      },
    },
    {
      label: "Cryptocurrencies",
      name: "Cryptocurrencies",
      icon: <FundOutlined />,
      key: "Cryptocurrencies",
      link: "/cryptocurrencies",
      onClick: () => {
        setActive(false);
        navigate("/cryptocurrencies");
      },
    },
    {
      label: "Exchanges",
      name: "Exchanges",
      icon: <MoneyCollectOutlined />,
      key: "Exchanges",
      link: "/exchanges",
      onClick: () => {
        setActive(false);
        navigate("/exchanges");
      },
    },
    {
      label: "News",
      name: "News",
      icon: <BulbOutlined />,
      key: "News",
      link: "/news",
      onClick: () => {
        setActive(false);
        navigate("/news");
      },
    },
  ];
  return (
    <div className="py-4 md:py-12 px-3 md:fixed md:block flex items-center justify-between z-30 ">
      <div className="flex">
        <Avatar src={Icon} size="large" />

        <Typography.Title level={2} className="logo">
          <Link to="/">Krypton</Link>
        </Typography.Title>
      </div>
      <Button
        type="ghost"
        className="block md:hidden"
        onClick={() => setActive(!active)}
        color="blue"
      >
        <MenuOutlined style={{ color: "white" }} />
      </Button>
      <Drawer
        open={active}
        onClose={() => setActive(false)}
        style={{
          background: "#001628",
        }}
        closeIcon={<CloseCircleFilled size={20} style={{ color: "white" }} />}
      >
        <Menu theme="dark" items={navs} className="min-w-[200px]" />
      </Drawer>
      <div className="md:block hidden">
        <Menu theme="dark" items={navs} className="min-w-[200px]" />
      </div>
    </div>
  );
};

export default Navbar;
