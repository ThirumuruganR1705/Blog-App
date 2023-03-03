import React from "react";

function Cards(props) {
  return (
    // <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //   <img
    //     className="w-full h-1/2"
    //     src={props.image}
    //     alt="Sunset in the mountains"
    //   />
    //   <div className="px-6 py-4">
    //     <div className="font-bold text-xl mb-2">{props.title}</div>
    //     <p className="text-gray-700 text-base">{props.desc}</p>
    //   </div>
    //   <div className="px-6 pt-4 pb-2">
    //     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    //       Uploaded By {props.username}
    //     </span>
    //   </div>
    // </div>

    <div className=" w-full lg:flex mb-5">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Mountain">
        <img src={props.image} className="h-full" alt="" />
      </div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          {/* <p className="text-sm text-gray-600 flex items-center">
            @{props.username}
          </p> */}
          <div className="text-gray-900 font-bold text-xl mb-2">{props.title}</div>
          <p className="text-gray-700 text-base">{props.desc}</p>
        </div>
        <div className="flex items-center">
          {/* <img className="w-10 h-10 rounded-full mr-4" src="/ben.png" alt="Avatar of Writer"/> */}
          <div className="">
            <p className=" text-sm bg-gray-400 p-1 text-white rounded-lg">Uploaded by {props.username}</p>
            {/* <p className="text-gray-600">Aug 18</p> */}
          </div>
        </div>
      </div>
    </div>


  );
}

export default Cards;
