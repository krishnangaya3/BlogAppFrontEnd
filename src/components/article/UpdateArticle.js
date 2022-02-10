import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../error/Error";
import { useNavigate } from "react-router-dom";

function UpdateArticle(props) {
  let navigate = useNavigate();
  const { name } = useParams();

  // Temporary storage of DB data
  const [articleData, setarticleData] = useState({});

  useEffect(() => {
    fetchAPI();
  }, [name]);

  async function fetchAPI() {
    const response = await fetch(`http://localhost:5001/article/${name}`);
    const body = await response.json();
    console.log(body);
    setarticleData(body);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setarticleData({ ...articleData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateArticle();
  };

  async function updateArticle() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: articleData.name,
        title: articleData.title,
        description: articleData.description,
      }),
    };
    const response = await fetch(
      "http://localhost:5001/edit-article",
      requestOptions
    );
    const respData = await response.json();
    console.log("resp::", respData);
    if (respData) {
      console.log("navigating to article list::");
      navigate("/article-list");
    }
  }

  // Article Not Exist in DB
  if (!articleData) return <Error />;
  return (
    <div className="createNewArticle">
      <h1>Update Article: {articleData.name}</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <div className="form-group">
          <label>Title of Article</label>
          <input
            className="form-control"
            name="title"
            id="title"
            placeholder="Enter title of Article"
            required
            value={articleData.title}
            onChange={handleChange}
          ></input>
        </div>
        <br />
        <div className="form-groups">
          <label>Write Your Article</label>
          <input
            name="description"
            className="form-control"
            id="article"
            placeholder="Write your Article"
            required
            value={articleData.description}
            onChange={handleChange}
          ></input>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateArticle;
