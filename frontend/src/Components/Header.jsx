import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../Store";
import $ from 'jquery'

function Header() {
  let isLoggedIn = useSelector((state) => state.isloggedin);

  let dispatch = useDispatch();

  let navigate = useNavigate();

  $("document").ready(()=>{
    $(".menulogo").click(()=>{
      $(".menu-items").show();
    })
  });

  $("document").ready(()=>{
    $(".closer").click(()=>{
      $(".menu-items").hide();
    })
  });

  $("document").ready(()=>{
    $(".closer-menu").click(()=>{
      $(".menu-items").hide();
    })
  })


  return (
    <div className={window.location.pathname!=="/login"?"header h-20 bg-white flex items-center md:px-10 justify-between":"hidden"}>
      {window.location.pathname!=="/login" && <div className="title font-sans font-bold text-2xl text-green-400">
        My Blog App
      </div>}
      {isLoggedIn && (
        <div className="menu hidden md:block">
          <a
            onClick={() => {
              navigate("/");
            }}
            className={window.location.pathname=="/"?"mx-2 text-green-400 hover:text-green-400 cursor-pointer":"mx-2 text-gray-400 hover:text-green-400 cursor-pointer"}
          >
            Home
          </a>
          <a
            onClick={() => {
              navigate("/blogs");
            }}
            className={window.location.pathname=="/blogs"?"mx-2 text-green-400 hover:text-green-400 cursor-pointer":"mx-2 text-gray-400 hover:text-green-400 cursor-pointer"}
          >
            All Blogs
          </a>
          <a
            onClick={() => {
              navigate("/myBlogs");
            }}
            className={window.location.pathname=="/myBlogs"?"mx-2 text-green-400 hover:text-green-400 cursor-pointer":"mx-2 text-gray-400 hover:text-green-400 cursor-pointer"}
          >
            My Blogs
          </a>
          <a
            onClick={() => {
              navigate("/createblog");
            }}
            className={window.location.pathname=="/createblog"?"mx-2 text-green-400 hover:text-green-400 cursor-pointer":"mx-2 text-gray-400 hover:text-green-400 cursor-pointer"}
          >
            Create Blog
          </a>
          <a
            onClick={() => {
              dispatch(authActions.logout());
              navigate("/");
            }}
            className="mx-2 px-1 border-2 border-white py-1 rounded-md bg-red-400 text-white cursor-pointer"
          >
            Log Out
          </a>
        </div>
      )}

      {/* Mobile Screen */}

      {isLoggedIn && (
        <div className="menu block md:hidden">
          <div className="menulogo text-white mr-2">
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="menu-items hidden absolute text-center top-0 left-0 z-10 flex flex-col w-screen h-screen bg-green-400 ">
            <div className="closer mt-2 mb-2">
              <a className="text-white bg-red-400 px-2 rounded-full float-right mr-2">X</a>
            </div>
            <div className="mb-2 mt-12">
            <a
              onClick={() => {
                navigate("/");
              }}
              className="mx-2 text-white hover:text-white cursor-pointer mb-2 closer-menu"
            >
              Home
            </a>
            </div>
            <div className="mb-2">
            <a
              onClick={() => {
                navigate("/blogs");
              }}
              className="mx-2 text-white hover:text-white cursor-pointer closer-menu"
            >
              All Blogs
            </a>
            </div>
            <div className="mb-2">
            <a
              onClick={() => {
                navigate("/myBlogs");
              }}
              className="mx-2 text-white hover:text-white cursor-pointer closer-menu"
            >
              My Blogs
            </a>
            </div>
            <div className="mb-2">
            <a
              onClick={() => {
                navigate("/createblog");
              }}
              className="mx-2 text-white hover:text-white cursor-pointer closer-menu"
            >
              Create Blog
            </a>
            </div>
            <div className="mb-2">
            <a
              onClick={() => {
                dispatch(authActions.logout());
                navigate("/")
              }}
              className="mx-2 px-1 border-white py-1 rounded-md text-white hover:bg-white hover:text-green-500 cursor-pointer closer-menu"
            >
              Log Out
            </a>
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn && window.location.pathname !== "/login" && (
        <div className="menu">
          <a
            onClick={() => {
              navigate("login");
            }}
            className="mx-2 px-1 border-2 border-green-400 py-1 rounded-md text-green-500 hover:bg-green-400 hover:text-white cursor-pointer"
          >
            Login {isLoggedIn ? "Your Account" : ""}
          </a>
        </div>
      )}
    </div>
  );
}

export default Header;
