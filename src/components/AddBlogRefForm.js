import React from "react";

const AddBlogRefForm = (props) => {
  return (
    <form onSubmit={props.add} className="form">
      <h3 className="title">Reference Blog</h3>
      <div class="input-container ic1">
        <input
          id="title"
          class="input"
          type="text"
          placeholder=" "
          value={props.title}
          onChange={props.handleTitle}
        />
        <div class="cut"></div>
        <label for="title" class="placeholder">
          ....add blog title
        </label>
      </div>
      <div class="input-container ic2">
        <input
          id="author"
          class="input"
          type="text"
          placeholder=" "
          value={props.author}
          onChange={props.handleAuthor}
        />
        <div class="cut"></div>
        <label for="author" class="placeholder">
          ....add blog author
        </label>
      </div>
      <div class="input-container ic2">
        <input
          id="url"
          class="input"
          type="text"
          placeholder=" "
          value={props.url}
          onChange={props.handleURL}
        />
        <div class="cut"></div>
        <label for="url" class="placeholder">
          ....add blog URL
        </label>
      </div>
      <div>
        <button type="text" class="submit">
          submit
        </button>
      </div>
    </form>
  );
};

export default AddBlogRefForm;
