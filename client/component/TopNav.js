import React from "react";
import { Menu } from "antd";
import { UserAddOutlined, HomeFilled, LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import {useState, useEffect} from 'react'
function TopNav() {
  const [current, setCurrent] = useState("")
  useEffect(() => {
    console.log(window.location.pathname);
   process.browser && setCurrent(window.location.pathname)
  }, [process.browser && window.location.pathname])

  return (
    <Menu mode="horizontal" className="bg-dark text-warning" selectedKeys={[current]} >

      <Menu.Item key='/' icon={<HomeFilled />}  onClick={(e)=> {setCurrent(e.key)}}>

        <Link href="/">
          <a className="text-light">Home</a>
        </Link>
      </Menu.Item>

      <Menu.Item key='/login' icon={<LoginOutlined />} onClick={(e)=> {setCurrent(e.key)}}>
        <Link href="/login">
          <a className="text-light">Login</a>
        </Link>
      </Menu.Item>

      <Menu.Item key='/register' icon={<UserAddOutlined />} onClick={(e)=> {setCurrent(e.key)}}>
        <Link href="/register">
          <a className="text-light">Register</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default TopNav;
