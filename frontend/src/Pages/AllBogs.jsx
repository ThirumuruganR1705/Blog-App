import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cards from "../Components/Cards";
import Header from "../Components/Header";
import "../Styles.css/loader.css";

function AllBlogs() {
  let [blogs, setBlogs] = useState([]);
  let [loadFlag, setLoadFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loadFlag) {
      getBlogs();
    }
  }, []);

  let getBlogs = async () => {
    setIsLoading(true);
    let res = await axios.get("https://blog-app-liim.onrender.com/api/blogs").catch((e) => {
      console.log(e);
    });
    let data = res.data.blogs;
    setBlogs(data);
    setIsLoading(false);
    setLoadFlag(false);
  };


  return (
    <div className={isLoading ? "h-screen" : "grid-rows-10 grid-flow-col"}>
      <div className={isLoading ? "" : "grid-start-1 grid-end-2"}>
        <Header />
      </div>
      <div className={isLoading ? "h-1/2 flex justify-center items-center" : "  grid-cols-1 gap-y-4 my-10 p-4 pt-0 "}>
        {isLoading && (
          <div>
            <div className="spinner-container">
              <div className="loading-spinner">

              </div>
            </div>
          </div>
        )}
        {blogs.map((arr) => {
          return (
            <Cards
              title={arr.title}
              desc={arr.description}
              username={arr.user.username}
              image={arr.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AllBlogs;
