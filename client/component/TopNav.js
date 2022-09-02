import React from "react";
import { Menu } from "antd";
import { UserAddOutlined, HomeFilled, LoginOutlined } from "@ant-design/icons";
import Link from "next/link";

function TopNav() {
  return (
    <Menu mode="horizontal" className="bg-dark text-warning">
      <Menu.Item icon={<HomeFilled />}>
        <Link href="/">
          <a className="text-light">Home</a>
        </Link>
      </Menu.Item>
      <Menu.Item icon={<LoginOutlined />}>
        <Link href="/login">
          <a className="text-light">Login</a>
        </Link>
      </Menu.Item>
      <Menu.Item icon={<UserAddOutlined />}>
        <Link href="/register">
          <a className="text-light">Register</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default TopNav;
