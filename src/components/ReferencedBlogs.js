import React from "react";
// import Button from "./Button";

const ReferencedBlogs = (props) => {
  
    return (
      <div className="blogs__container">
        <h4>Referenced Blogs</h4>
        <ul>
          {props.blogs.map((blog) => (
            <li key={blog.id}>
              {blog.title} : {blog.url}
              <button onClick={props.upVote} title={blog.title} text="Delete">
                vote
              </button>
              {/*<Button
                onClick={props.deleteContact}
                name={contact.name}
                text="Delete"
              />*/}
            </li>
          ))}
        </ul>
      </div>
    );
};
  
export default ReferencedBlogs;
  