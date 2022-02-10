import React, { useState } from "react";
import "./CreateArticle.css";
import { useNavigate } from "react-router-dom";

function CreateArticle(props) {
  let navigate = useNavigate();
  const [articleValues, setArticleValues] = useState({
    name: "",
    title: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setArticleValues({ ...articleValues, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchAPI();
  };

  async function fetchAPI() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: articleValues.name,
        title: articleValues.title,
        description: articleValues.description,
      }),
    };
    console.log("called fetch");
    const response = await fetch(
      "http://localhost:5001/createarticle",
      requestOptions
    );
    const respData = await response.json();
    console.log("resp::", respData);
    if (respData) {
      console.log("navigating to article list::");
      navigate("/article-list");
    }
  }

  return (
    <div className="createNewArticle">
      <h1>Create New Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name of Article</label>
          <input
            name="name"
            className="form-control"
            id="name"
            placeholder="Enter name of Article "
            value={articleValues.name}
            onChange={handleChange}
            required
          ></input>
        </div>
        <br />
        <div className="form-group">
          <label>Title of Article</label>
          <input
            className="form-control"
            name="title"
            id="title"
            placeholder="Enter title of Article"
            value={articleValues.title}
            onChange={handleChange}
            required
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
            value={articleValues.description}
            onChange={handleChange}
            required
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

export default CreateArticle;
