import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import Cards from "../Components/Cards";
import Header from "../Components/Header";
import newContext from "../Context/newContext";

function MyBlogs() {
  let value = useContext(newContext);
  let [email, setEmail] = value;
  let [myblogs, setMyblogs] = useState([]);
  let array = [];
  let [uid, setUid] = useState("");
  let [loadFlag, setLoadFlag] = useState(true);

  useEffect(() => {
    if(loadFlag){
      getmyBlogs();
    }
    // setMyblogs(array);
  },[]);

  let getmyBlogs = async () => {
    let data = await axios.post("http://localhost:4000/api/user/fuser",{email});
    console.log(data.data.message);
    setMyblogs(data.data.message);
  };

  return (
    <>
      <Header />
      <div className="myBlogs">
        <div className="title">
          {/* <p className="text-xl">My Blogs</p> */}
        </div>
        <div className="myblogs md:mx-48 m-1  gap-x-4">
          {myblogs.map((arr) => {
            return (
              <Cards title={arr.title} desc={arr.description} image={arr.image} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MyBlogs;
