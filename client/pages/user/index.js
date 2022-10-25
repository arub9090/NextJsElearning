import React from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/router";



function UserIndex() {

  const [hidden, setHidden] = useState(true)
  const {state:{user}} = useContext(AuthContext)

    useEffect(() => {
      fetchUser()
    }, [])


    const fetchUser= async ()=>{
      try {
          const {data}= await axios.get("/api/current-user")
          console.log(data);
          setHidden(false)
      } catch (error) {
          console.log(error)
          setHidden(true)
      }

    }


    
  return (
    <>{
      <h1>Hello This is AriF Rubayet From User Page</h1>
    }</>
  )
}

export default UserIndex