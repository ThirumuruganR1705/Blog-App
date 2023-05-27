import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import newContext from "../Context/newContext";

function Cards(props) {

  let value = useContext(newContext);
  let {email,setEmail,blogid,setBlogid} = value;

  const navigate = useNavigate();

  if(props.id){
    console.log(props.id);
  }

  const deleteHandler = async() =>{
    const res = await axios.delete("http://localhost:5000/api/blogs/delete/"+props.id).then(()=>{
      console.log("deleted");
    })
    if(res.status===200){
      props.loadFlagFunc(true);
    }
  }

  const editHandler = (e) =>{
    setBlogid(e.target.value);
    console.log("blogid is saved");
    navigate("/editblog");
  }

  return (
    // <div className=" w-full lg:flex md:w my-5 ">
    //   <div className="h-48 lg:h-auto lg:w-48 md:w-full flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Mountain">
    //     <img src={props.image} className="h-full md:w-full" alt="" />
    //   </div>
    //   <div className="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    //     <div className="mb-8">
    //       <div className="text-gray-900 font-bold text-xl mb-2">{props.title}</div>
    //       <p className="text-gray-700 text-base">{props.desc}</p>
    //     </div>
    //     <div className="flex items-center">
    //       {props.username && <div className="">
    //         <p className=" text-sm bg-green-400 p-1 text-white rounded-lg">@{props.username}</p>
    //       </div>}
    //     </div>
    //   </div>
    // </div>

    // <div className="w-full lg:h-40  md:h-60 border  flex sm:flex-row flex-col justify-center items-center gap-4">
    //   <div className="">
    //     <img src={props.image} alt={props.title} className="lg:h-40 md:h-60 w-full" />
    //   </div>
    //   <div className="">
    //     <div className="font-bold text-green-500 mb-3 text-lg">
    //       <span>{props.title}</span>
    //     </div>
    //     <div className="text-sm">
    //       <span>{props.desc}</span>
    //     </div>
    //     <div className="my-5  pb-5">
    //       <span className="bg-red-300 p-1 float-right text-white mr-5 ">@{props.username}</span>
    //     </div>
    //   </div>
    // </div>
  

    <div className="h-[30rem] w-96 relative  border border-gray-700 shadow  flex flex-col justify-between  ">
      <div className="flex justify-center">
        <img className="h-[15rem] w-96" src={props.image} alt="" />
      </div>
      <div className=" h-[15rem] overflow-hidden overflow-ellipsis ">
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
  );
}

export default Cards;
