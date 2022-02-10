import React, { useState, useEffect } from "react";
import Home from "./components/home/Home";
import About from "./components/about/About";
import ArticleList from "./components/article/ArticleList";
import Article from "./components/article/Article";
import CreateArticle from "./components/article/CreateArticle";
import Error from "./components/error/Error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import HomeHeader from "./components/header/HomeHeader";
import UpdateArticle from "./components/article/UpdateArticle";

import "./App.css";

function App() {
  const [loggedInUserData, setLoggedInUserData] = useState({});

  const updateLoggedInUserInfo = (userInfo) => {
    setLoggedInUserData(userInfo);
  };

  return (
    <Router>
      <div className="App">
        {loggedInUserData && Object.keys(loggedInUserData).length === 0 ? (
          <div>
            <HomeHeader />
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/login"
                element={<Login loggedInUser={updateLoggedInUserInfo} />}
              />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        ) : (
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/article-list"
                element={<ArticleList loggedInUserData={loggedInUserData} />}
              />
              <Route path="/article/:name" element={<Article />} />
              {loggedInUserData &&
              loggedInUserData.email === "gayathri@admin.com" ? (
                <>
                  <Route
                    path="/create-new-article"
                    element={<CreateArticle />}
                  />
                  <Route
                    path="/update-article/:name"
                    element={<UpdateArticle />}
                  />
                </>
              ) : (
                ""
              )}
              <Route exact path="*" element={<Error />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
