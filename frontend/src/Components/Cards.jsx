import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import newContext from "../Context/newContext";

function Cards(props) {

  let value = useContext(newContext);
  let { email, setEmail, blogid, setBlogid } = value;
  const navigate = useNavigate();

  const deleteHandler = async () => {
    const res = await axios.delete("https://blog-app-liim.onrender.com/api/blogs/delete/" + props.id);
    navigate("/blogs");
  }

  const editHandler = (e) => {
    setBlogid(e.target.value);
    navigate("/editblog");
  }

  return (

    <div>
      <div className="w-full relative  shadow-2xl rounded-md  flex flex-col justify-between md:hidden  ">
        <div className="flex justify-center">
          <img className="h-[15rem] md:w-96 w-full rounded-t-md" src={props.image} alt="" />
        </div>
        <div className=" md:h-[15rem] overflow-hidden overflow-ellipsis ">
          <div className="font-bold text-lg text-green-500 text-center pt-3">
            {props.title}
          </div>
          <div className="text-sm pt-3 px-3 leading-7 text-center ">
            <p className="">{props.desc}</p>
          </div>
          {props.username && (
            <div className="mt-2 flex justify-center text-white absolute top-0 cursor-pointer right-0">
              <span className="bg-green-400 py-1 px-2 ">@{props.username}</span>
            </div>
          )}
          {!props.username && (
            <div className="mt-2 flex justify-center text-white gap-2  absolute  right-2 top-0">
              <button value={props.id} className="bg-green-400 px-2 py-1 flex items-center hover:bg-green-500" onClick={editHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit
              </button>
              <button className="bg-red-400 px-2 py-1 flex items-center hover:bg-red-500" onClick={deleteHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:flex flex justify-center mb-5">
        <div className="w-[60rem] h-[18rem] flex shadow-xl ">
          <div className="w-[17rem] h-[18rem] ">
            <img src={props.image} className="w-[17rem] h-[18rem]" />
          </div>
          <div className="w-[43rem] p-5 relative">
            <div className="text-center p-2 text-green-400">{props.title}</div>
            <div className="leading-7">{props.desc}</div>
            {props.username && <div>
              <p className="right-1 bottom-1 absolute bg-green-400 text-white px-2 py-1">@{props.username}</p>
            </div>}
            {!props.username && <div className="flex absolute bottom-1 gap-2 right-1 text-white">
              <button value={props.id} className="bg-green-400 px-2 py-1 flex items-center hover:bg-green-500" onClick={editHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit
              </button>
              <button className="bg-red-400 px-2 py-1 flex items-center hover:bg-red-500" onClick={deleteHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                Delete
              </button>
            </div>}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cards;
