import axios from "axios";
import { data } from "jquery";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import newContext from "../Context/newContext";

function Blogform() {
  let value = useContext(newContext);
  let { email, setEmail, blogid, setBlogid } = value;
  const navigate = useNavigate();

  // console.log(value);

  useEffect(() => {
    const res = axios
      .post("https://blog-app-liim.onrender.com/api/blogs/findbyid", { blogid })
      .then((data) => {
        console.log(data.data.message);
        setInputs({
          title: data.data.message.title,
          description: data.data.message.description,
          image: data.data.message.image,
        });
      });
    // console.log(res.message);
  }, []);

  let [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  let changeHandler = (e) => {
    setInputs((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  let submitHandler = async () => {
    console.log(inputs);
    let userid = await axios.post("https://blog-app-liim.onrender.com/api/user/finduser", {
      email: email,
    });
    if (userid) {
      console.log(userid.data.message);
    }
    let res = await axios
      .put("https://blog-app-liim.onrender.com/api/blogs/update/" + blogid, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: userid.data.message,
      });
      if(res.status===200){
        navigate("/myBlogs");
      }
  };

  return (
    <div className="">
      <div className="blogCreation flex flex-col items-center">
        <div>
          <p className="text-xl p-5 font-bold text-green-500">
            {/* CREATE NEW BLOG */}
          </p>
        </div>
        <div className="inputs mx-1  p-8 border">
          <div className="title">
            {/* <label className='text-xl' htmlFor="">Title</label> */}
            <input
              className="border border-gray-300 focus:border-green-500 focus:outline-none my-3 p-1 text-green-500 focus:text-black  w-96  h-12"
              type="text"
              value={inputs.title}
              name="title"
              onChange={changeHandler}
              placeholder="Enter The Title"
            />
          </div>
          <div>
            <textarea
              className="border border-gray-300 focus:border-green-500 focus:outline-none my-3 p-1 text-green-500 focus:text-black  w-96 h-40"
              type="text"
              value={inputs.description}
              name="description"
              onChange={changeHandler}
              placeholder="Enter Description"
            />
          </div>
          <div className="">
            <input
              className="border border-gray-300 focus:border-green-500 focus:outline-none focus:text-black my-3 p-1 text-green-500  w-96 h-12"
              type="text"
              value={inputs.image}
              name="image"
              onChange={changeHandler}
              placeholder="Enter Image Url"
            />
          </div>
          <div className="btn flex justify-center items-center">
            <button
              className="bg-green-400 text-white py-2 px-3 font-bold  md:hover:bg-green-500 "
              onClick={submitHandler}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogform;
