import React from "react";

function UpvoteSection(props) {
  const { name, upvotes, setarticleData } = props;

  async function fetchUpVotes() {
    const response = await fetch(
      `http://localhost:5001/api/article/${name}/upvotes`,
      {
        method: "post",
      }
    );
    const body = await response.json();
    setarticleData(body);
  }

  return (
    <div>
      <button className="like" onClick={fetchUpVotes}>
        👍
      </button>
      <p className="votes">This article has {upvotes} upvotes</p>
    </div>
  );
}

export default UpvoteSection;
