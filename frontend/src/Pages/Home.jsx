import React from "react";
import img from "../Images/Blog.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useState } from "react";

function Home() {
  let isLoggedIn = useSelector((state) => state.isloggedin);
  let navigate = useNavigate();


  let clickHandler = () => {
    if (isLoggedIn) {
      // window.location.assign("/allblogs");
      navigate("/blogs");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="">
      <div className="">
        <Header/>
      </div>
      <div className="homePage h-3/4 flex flex-col items-center">
        <img src={img} alt="blog" className="h-80 w-80 text-center" />
        <div>
          <button
            className="mt-5 bg-green-500 p-2 duration-500 rounded-md text-white md:hover:scale-90"
            onClick={clickHandler}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
