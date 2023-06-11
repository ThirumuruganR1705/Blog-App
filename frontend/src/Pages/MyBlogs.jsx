import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import Cards from "../Components/Cards";
import Header from "../Components/Header";
import newContext from "../Context/newContext";
import "../Styles.css/loader.css";

function MyBlogs() {
  let value = useContext(newContext);
  let { email, setEmail, blogid, setBlogid } = value;
  let [myblogs, setMyblogs] = useState([]);
  let array = [];
  let [uid, setUid] = useState("");
  let [loadFlag, setLoadFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const functionLoader = (ele) => {
    setLoadFlag(ele);
  };

  // setMyblogs(array);

  let getmyBlogs = async () => {
    setIsLoading(true);
    let data = await axios.post(
      "https://blog-app-liim.onrender.com/api/user/fuser",
      {
        email,
      }
    );
    console.log(data.data.message);
    setMyblogs(data.data.message);
    setIsLoading(false);
  };

  if (loadFlag) {
    getmyBlogs();
    setLoadFlag(false);
  }

  console.log(myblogs.length);

  return (
    <div className="h-screen w-screen">
      <div className="w-full">
        <Header />
      </div>
      <div className={isLoading ? "h-3/5" : "myBlogs"}>
        <div className="title">{/* <p className="text-xl">My Blogs</p> */}</div>
        <div
          className={
            isLoading ? "h-full flex justify-center items-center" : "myblogs "
          }
        >
          {isLoading && (
            <div>
              <div className="spinner-container">
                <div className="loading-spinner"></div>
              </div>
            </div>
          )}
          {myblogs.length > 0 && (
            <div className="md:mx-48 md:m-10 gap-y-2  md:gap-x-8 grid md:grid-cols-3 grid-cols-1 p-2">
              {myblogs.map((arr) => {
                return (
                  <div>
                    <Cards
                      title={arr.title}
                      desc={arr.description}
                      image={arr.image}
                      id={arr._id}
                      loadFlagFunc={functionLoader}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {myblogs.length == 0 && (
            <div>
              <div className="flex justify-center">
                <p>No Blogs Here.</p>
              </div>
              <div className="flex justify-center mt-4">
                <button className="bg-green-400 text-white px-2 py-1 rounded-md flex gap-1">
                  Create New Blog
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
