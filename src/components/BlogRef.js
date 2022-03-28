import React from "react";

const BlogRef = (props) => {
  return (
    <li key={props.blog.id}>
      <a href={props.blog.url} target="_blank" rel="noreferrer">
        {props.blog.title} : {props.blog.author}
      </a>
      <button className="blog__button" onClick={props.upVote}>
        upVote
      </button>
    </li>
  );
};

export default BlogRef;
