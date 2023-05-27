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
    let data = await axios.post("http://localhost:5000/api/user/fuser", {
      email,
    });
    console.log(data.data.message);
    setMyblogs(data.data.message);
    setIsLoading(false);
  };

  if (loadFlag) {
    getmyBlogs();
    setLoadFlag(false);
  }

  console.log(typeof(myblogs.length));

  return (
    <div className="h-screen">
      <Header />
      <div className={isLoading ? "h-3/5" : "myBlogs"}>
        <div className="title">{/* <p className="text-xl">My Blogs</p> */}</div>
        <div
          className={
            isLoading
              ? "h-full flex justify-center items-center"
              : "myblogs md:mx-48 m-10  gap-x-8 grid grid-cols-3 md:grid-cols-3 grid-cols-1"
          }
        >
          {isLoading && (
            <div>
              <div className="spinner-container">
                <div className="loading-spinner"></div>
              </div>
            </div>
          )}
          {myblogs.length>0 && <div>
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
            {
              myblogs.length===0 && <div>No Blogs</div>
            }
          </div>}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
