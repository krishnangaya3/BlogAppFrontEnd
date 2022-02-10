import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../error/Error";
import "../article/Article.css";

function Article(props) {
  const { name } = useParams();

  // Temporary storage of DB data
  const [articleData, setarticleData] = useState({});

  // Backend Connection API Fetch
  useEffect(() => {
    fetchAPI();
  }, [name]);

  async function fetchAPI() {
    const response = await fetch(`http://localhost:5001/article/${name}`);
    const body = await response.json();
    console.log(body);
    setarticleData(body);
  }

  // Article Not Exist in DB
  if (!articleData) return <Error />;

  return (
    <div>
      <h1 className="article">{articleData.title}</h1>
      <br></br> <br></br>
      <p className="desc">{articleData.description}</p>
    </div>
  );
}

export default Article;
