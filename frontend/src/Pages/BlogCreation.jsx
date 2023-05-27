import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import Header from "../Components/Header";
import newContext from "../Context/newContext";

function BlogCreation() {
  let value = useContext(newContext);
  let {email,setEmail,blogid,setBlogid} = value;
  console.log(value);
  console.log(email);

  // console.log(email);

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
    let userid = await axios.post("http://localhost:5000/api/user/finduser", {
      email: email,
    });
    if (userid) {
      console.log(userid.data.message);
    }
    let res = await axios
      .post("http://localhost:5000/api/blogs/create", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: userid.data.message,
      })
      .then(console.log("Blog Is Created"));
  };

  return (
    <div className="">
      <div className="">
        <Header />
      </div>
      <div className="">
        <div className="blogCreation flex flex-col items-center">
          <div>
            <p className="text-xl p-5 font-bold text-green-500">CREATE NEW BLOG</p>
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
    </div>
  );
}

export default BlogCreation;
