import React from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Icon from "../img/krypton-logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const navs = [
    {
      label: "Home",
      name: "Home",
      key: "Home",
      icon: <HomeOutlined />,
      link: "/",
      onClick: () => navigate("/"),
    },
    {
      label: "Cryptocurrencies",
      name: "Cryptocurrencies",
      icon: <FundOutlined />,
      key: "Cryptocurrencies",
      link: "/cryptocurrencies",
      onClick: () => navigate("/cryptocurrencies"),
    },
    {
      label: "Exchanges",
      name: "Exchanges",
      icon: <MoneyCollectOutlined />,
      key: "Exchanges",
      link: "/exchanges",
      onClick: () => navigate("/exchanges"),
    },
    {
      label: "News",
      name: "News",
      icon: <BulbOutlined />,
      key: "News",
      link: "/news",
      onClick: () => navigate("/news"),
    },
  ];
  return (
    <div className="w-fit py-4 px-3 fixed h-screen ">
      <div className="flex">
        <Avatar src={Icon} size="large" />

        <Typography.Title level={2} className="logo">
          <Link to="/">Krypton</Link>
        </Typography.Title>

        {/* <Button className="menu-control-container"></Button> */}
      </div>
      <Menu theme="dark" items={navs} className="min-w-[200px]" />
    </div>
  );
};

export default Navbar;
