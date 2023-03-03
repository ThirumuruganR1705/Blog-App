import React from "react";
import { useState } from "react";
import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import AllBlogs from "./Pages/AllBogs";
import Home from "./Pages/Home";
import MyBlogs from "./Pages/MyBlogs";
import { Store } from "./Store/index";
import { useSelector } from "react-redux";
import BlogCreation from "./Pages/BlogCreation";
import newContext from "./Context/newContext";

function App() {
  let isLoggedIn = useSelector((state) => state.isloggedin);
  let [email,setEmail] = useState("");

  console.log(isLoggedIn);

  return (
    <newContext.Provider value={[email,setEmail]}>
      <BrowserRouter>
        <div className="h-screen">
          

          <Routes>
            <Route path="/" element={<Home />} />
            {isLoggedIn && (
              <>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/blogs" element={<AllBlogs />} />
                <Route path="/myblogs" element={<MyBlogs />} />
                <Route path="/createblog" element={<BlogCreation />} />
              </>
            )}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </newContext.Provider>
  );
}

export default App;
