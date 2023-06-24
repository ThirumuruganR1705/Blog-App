import React from "react";
import img from "../Images/Blog.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Store";
import { useContext } from "react";
import newContext from "../Context/newContext";
import { useEffect } from "react";

function Home() {
  let isLoggedIn = useSelector((state) => state.isloggedin);
  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let value = useContext(newContext);
  let { email, setEmail, blogid, setBlogid } = value;

  useEffect(() => {
    if (cookie.email != null && cookie.pass != null && !isLoggedIn) {
      try {
        let res = axios
          .post("https://blog-app-liim.onrender.com/api/user/login", {
            email: cookie.email,
            password: cookie.pass,
          })
          .then(() => {
            dispatch(authActions.login());
            navigate("/");
          })
          .catch((e) => {
            console.log(e);
          })
          .then(() => {
            setEmail(cookie.email);
          });
        let data = res.data;
      } catch (e) {
        console.log(e);
      }
    }
  }, [])

  let clickHandler = () => {
    if (isLoggedIn) {
      navigate("/blogs");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="">
      <div className="">
        <Header />
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
