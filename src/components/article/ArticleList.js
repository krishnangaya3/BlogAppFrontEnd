import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ArticleList.css";

function ArticleList(props) {
  const [articleData, setarticleData] = useState([]);
  const [adminUser, setAdminUser] = useState(false);
  useEffect(() => {
    fetchAPI();
    if (
      props.loggedInUserData &&
      props.loggedInUserData.email === "gayathri@admin.com"
    ) {
      setAdminUser(true);
    }
  }, []);
  async function fetchAPI() {
    console.log("fetchapi");
    const reqparams = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      "http://localhost:5001/article-list",
      reqparams
    );

    const respData = await response.json();
    console.log("resp::", respData);
    setarticleData(respData);
  }
  async function deleteArticle(event) {
    console.log("event data::", event.target.dataset.articlename);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: event.target.dataset.articlename,
      }),
    };
    console.log("called fetch");
    const response = await fetch(
      "http://localhost:5001/deletearticle",
      requestOptions
    );
    const respData = await response.json();
    console.log("resp::", respData);
    if (respData) {
      console.log("navigating to article list::");
      fetchAPI();
    }
  }

  return (
    <div>
      <div className="grid">
        <div className="articlesHeader">
          <h1>Articles</h1>
        </div>
        {adminUser ? (
          <div className="moveRight">
            <Link
              className="btn btn-primary moveRight"
              type="button"
              to="/create-new-article"
            >
              Create New Article
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="row mb-2">
        {articleData.map((i, key) => (
          <div className="col-md-4" key={key}>
            <div className="container row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0">{i.title}</h3>

                <p className="card-text mb-auto">
                  {i.description.substring(0, 50)}...
                </p>
                <Link
                  className="article text-info"
                  key={key}
                  to={`/article/${i.name}`}
                >
                  Continue reading
                </Link>
              </div>
              <div className="col-auto d-none d-lg-block">
                <div className="articleRightContainer">
                  {adminUser ? (
                    <div className="d-grid gap-2 col-6 mx-auto verticallyAlign">
                      <Link
                        className="btn btn-primary"
                        key={key}
                        to={`/update-article/${i.name}`}
                      >
                        Update
                      </Link>
                      <button
                        onClick={deleteArticle}
                        type="button"
                        className="btn btn-danger"
                        data-articlename={i.name}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
