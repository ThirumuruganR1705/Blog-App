import React from "react";
import { useState } from "react";
import img from "../Images/login.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Store";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import newContext from "../Context/newContext";
import { useCookies } from "react-cookie";
function Login() {
  let value = useContext(newContext);
  let { email, setEmail, blogid, setBlogid } = value;
  let [regFlag, setRegFlag] = useState(false);
  let [spinFlag, setSpinFlag] = useState(false);
  const [cookie, setCookie,removeCookie] = useCookies(['user']);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  let handleChange = (e) => {
    setInputs((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const PostRequest = async () => {
    setSpinFlag(true);
    const res = await axios.post(
      "https://blog-app-liim.onrender.com/api/user/signup",
      {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      }
    );
    if (res.status === 200) {
      setCookie('pass', inputs.password, { path: "/" });
      setCookie('email', inputs.email, { path: "/" });
      dispatch(authActions.login());
      navigate("/");
      setEmail(inputs.email);
      setSpinFlag(false);
    }
  };

  let LoginRequest = async () => {
    setSpinFlag(true);
    try {
      let res = await axios
        .post("https://blog-app-liim.onrender.com/api/user/login", {
          email: inputs.email,
          password: inputs.password,
        })
        .then(() => {
          setCookie('pass', inputs.password, { path: "/" });
          setCookie('email', inputs.email, { path: "/" });
          dispatch(authActions.login());
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        })
        .then(() => {
          setEmail(inputs.email);
          console.log("Email is saved");
        });
      let data = await res.data;
      console.log(data);
      setSpinFlag(false);
    } catch (e) {
      console.log(e);
    }
  };

  let postFunc = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (regFlag) {
      PostRequest().then(() => {
        dispatch(authActions.login());
      });
    } else {
      LoginRequest();
    }
  };

  return (
    <React.Fragment>
      <div className="">
        {/* {spinFlag && (
          <div className="absolute h-screen w-screen bg-white flex items-center justify-center">
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          </div>
        )} */}
        <div className="flex justify-center items-center bg-green-200 h-screen">
          <div className="w-80 h-80 bg-white shadow-md rounded-md">
            <div className="title text-center pt-2 mt-5 pb-2 text-green-600 font-extrabold">
              {regFlag ? "SIGN UP" : "SIGN IN"}
            </div>
            <div className="input-fields">
              {regFlag && (
                <div className="username flex justify-center pt-3 ">
                  <input
                    type="text"
                    className="border-black border focus:outline-none p-2 "
                    placeholder="Username"
                    name="name"
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="username flex justify-center pt-3 ">
                <input
                  type="email"
                  className="border-black border focus:outline-none p-2 "
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="username flex justify-center pt-3 pb-2">
                <input
                  type="password"
                  className="border-black border focus:outline-none p-2 "
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="btn flex justify-center mt-3">
                {regFlag && (
                  <button
                    className="bg-green-400 py-2 px-3 text-white hover:bg-green-600 flex gap-3"
                    onClick={PostRequest}
                  >
                    Create
                    {spinFlag && (
                      <div>
                        <div className="spinner-container ">
                          <div className="loading-spinner1"></div>
                        </div>
                      </div>
                    )}
                  </button>
                )}
                {!regFlag && (
                  <button
                    className={
                      spinFlag
                        ? "bg-green-400 py-2 px-3 text-white flex gap-3"
                        : "bg-green-400 py-2 px-3 text-white hover:bg-green-600 flex gap-3"
                    }
                    onClick={postFunc}
                  >
                    Login
                    {spinFlag && (
                      <div>
                        <div className="spinner-container ">
                          <div className="loading-spinner1"></div>
                        </div>
                      </div>
                    )}
                  </button>
                )}
              </div>
              <div className="rem">
                {regFlag && (
                  <p className="text-sm text-center mt-1">
                    Already Have An Account ?{" "}
                    <a
                      className="text-green-500 cursor-pointer hover:text-green-600"
                      onClick={() => {
                        setRegFlag(false);
                        setSpinFlag(false);
                      }}
                    >
                      Login Here.
                    </a>
                  </p>
                )}
                {!regFlag && (
                  <p className="text-sm text-center mt-5">
                    Doesn't Have AN Account ?{" "}
                    <a
                      className="text-green-500 cursor-pointer hover:text-green-600"
                      onClick={() => {
                        setRegFlag(true);
                        setSpinFlag(false);
                      }}
                    >
                      Register Here.
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
