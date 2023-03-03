import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import newContext from "../Context/newContext";

function MyBlogs() {
  let value = useContext(newContext);
  let [email, setEmail] = value;
  let [myblogs, setMyblogs] = useState({  });
  let array = [];
  let [uid,setUid] = useState("");

  useEffect(() => {
    getmyBlogs();
    // setMyblogs(array);
  },[]);

  let getmyBlogs = async () => {
    let userid = await axios.post("http://localhost:4000/api/user/fuser", {
      email: email,
    });
    // let userid = await axios.post("http://localhost:4000/api/user/finduser", {
    //   email: email,
    // });
      console.log(userid);
      setUid(userid.data.message);
      console.log(uid);
    // let blogids = await axios.post("http://localhost:400/api/user/fuser",)
    if (userid) {
      console.log(userid.data.message);
      userid.data.message.map((arr) => {
        let func = async () => {
          console.log(arr);
          let blog = await axios.post(
            "http://localhost:4000/api/blogs/findbyid",
            { userid: arr }
          ).then(()=>{console.log(blog);}).catch((e)=>{console.log(e);});
          if (blog) {
            console.log(blog.data.message);
            array.push(blog);
          }else{
            console.log("no blogs");
          }
        };
        func();
      });
      console.log(array);
    } else {
      console.log("no");
    }
  };

  return (
    <div className="myBlogs">
      <div className="title">
        <p className="text-xl">My Blogs</p>
      </div>
      <div className="myblogs">
        {array.map((arr) => {
          return (
            <div className="blog">
              <p className="text-md">po</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyBlogs;
