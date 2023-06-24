import axios from "axios";
import React from "react";
import { useContext, useRef } from "react";
import { useState } from "react";
import Header from "../Components/Header";
import newContext from "../Context/newContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../firebase";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from 'react-loader-spinner'

function BlogCreation() {
  let value = useContext(newContext);
  const [loader, setLoader] = useState(false);
  let { email, setEmail, blogid, setBlogid } = value;
  const [file, setFile] = useState({});
  const inputref = useRef();
  const navigator = useNavigate();
  console.log(value);
  console.log(email);

  let [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  let imageChangeHandler = async (e) => {
    inputref.current.disabled = true;
    setFile((prevState) => {
      return { file: e.target.files[0] }
    })
    console.log(e.target.files[0]);
    const storageRef = ref(storage, "/files/" + e.target.files[0].name);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      console.log(url);
      setInputs({ ...inputs, image: url });
    });
  }

  let changeHandler = (e) => {
    setInputs((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  let submitHandler = async () => {
    console.log(inputs);
    setLoader(true);
    let userid = await axios.post("https://blog-app-liim.onrender.com/api/user/finduser", {
      email: email,
    }).catch((e) => { console.log(e) })
    if (userid) {
      console.log(userid.data.message);
    }
    let res = await axios
      .post("https://blog-app-liim.onrender.com/api/blogs/create", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: userid.data.message,
      })
      .then(console.log("Blog Is Created"));
    setLoader(false);
    navigator("/blogs");
  };

  return (
    <div className="">
      <div className="">
        <Header />
      </div>
      {!loader && <div className="">
        <div className="blogCreation flex flex-col items-center">
          <div>
            <p className="text-xl p-5 font-bold text-green-500">CREATE NEW BLOG</p>
          </div>
          <div className="inputs mx-1  p-8 border">
            <div className="title">
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
            <div className="flex flex-col">
              <input
                ref={inputref}
                className="border border-gray-300 focus:border-green-500 focus:outline-none focus:text-black my-3 p-1 text-green-500  w-96 h-12"
                type="text"
                value={inputs.image}
                name="image"
                onChange={changeHandler}
                placeholder="Enter Image Url"
              />
              <span className="text-center mb-1">OR</span>
              <label className="border py-2 bg-blue-400 text-white text-center cursor-pointer mb-3">
                <input className="hidden" type="file" onChange={imageChangeHandler} />
                Upload As File</label>
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
      </div>}
      {loader &&
        <div className="flex justify-center items-center h-[70vh]">
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor='#ebf5ec'
            barColor='#4be35d'
          />
        </div>
      }
    </div>
  );
}

export default BlogCreation;
