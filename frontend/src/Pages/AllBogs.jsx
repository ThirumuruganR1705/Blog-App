import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cards from "../Components/Cards";
import Header from "../Components/Header";
import img1 from "../Images/login.png";

function AllBlogs() {
  let [blogs, setBlogs] = useState([]);
  let [loadFlag, setLoadFlag] = useState(true);

  useEffect(() => {
    if (loadFlag) {
      getBlogs();
    }
  });

  let getBlogs = async () => {
    let res = await axios.get("http://localhost:4000/api/blogs").catch((e) => {
      console.log(e);
    });
    console.log(res.data);
    let data = res.data.blogs;
    setBlogs(data);
    console.log(data[0].title);
    setLoadFlag(false);
  };

  let show = () => {
    console.log(blogs);
  };

  return (
    <div className="">
      <div className="">
        <Header/>
      </div>
      <div className="md:mx-48 m-1  gap-x-4">
      {blogs.map((arr)=>{
        return(
          <Cards title={arr.title} desc={arr.description} username={arr.user.username} image={arr.image} />
        )
      })}
    </div>
    </div>
  );
}

export default AllBlogs;
