import React from "react";
import { Menu } from "antd";
import { UserAddOutlined, HomeFilled, LoginOutlined, UserOutlined, UserDeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import {useState, useEffect, useContext} from 'react'
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";
import {toast} from 'react-toastify'

function TopNav() {
  const [current, setCurrent] = useState("")
  const { state, dispatch } = useContext(AuthContext);
  const {user}= state;

  const router = useRouter();


  useEffect(() => {
    console.log(window.location.pathname);
   process.browser && setCurrent(window.location.pathname)
  }, [process.browser && window.location.pathname])


  const logoutHandler= async()=>{
    dispatch({
      type: "LOGOUT_USER",
    })

    window.localStorage.removeItem('user')

    try {
      const {data}= await axios.get("api/logout");
      toast.success(data.message)
      router.push('/login')
      
    } catch (err) {
      toast.error('Logout was not done!')
    }
  }



  return (
    <Menu mode="horizontal" className="bg-dark text-warning" selectedKeys={[current]} >

      <Menu.Item key='/' icon={<HomeFilled />}  onClick={(e)=> {setCurrent(e.key)}}>

        <Link href="/">
          <a className="text-light">Home</a>
        </Link>
      </Menu.Item>


     
      {!user && (<>
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
      </>)}



      {user && (<>
      <><Menu.SubMenu key='submenu' title={user.user.name.toUpperCase()} icon={<UserOutlined/>}>
      <Menu.Item key='/logout' onClick={()=> logoutHandler()} icon={<UserDeleteOutlined/>}>
        Logout
      </Menu.Item>
    </Menu.SubMenu></>
      
      
      </>)}
    </Menu>
  );
}

export default TopNav;
