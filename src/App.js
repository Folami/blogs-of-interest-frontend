import React from "react";
import { useState, useEffect } from "react";
import blogsRefPlug from "./services/blogsRefPlug";
import AddBlogRefForm from "./components/AddBlogRefForm";
import ReferencedBlogs from "./components/ReferencedBlogs";
import Notification from "./components/Notification";
import BlogRef from "./components/BlogRef";
import Footer from "./components/Footer";

const App = () => {
  const [blogRefs, setBlogRefs] = useState([
    {
      title: "Multimodal Neurons in Artificial Neural Networks",
      author: "Gabriel Goh et al.",
      url: "https://distill.pub/2021/multimodal-neurons/",
      likes: 0
    }
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newURL, setNewURL] = useState("");
  const [voteTally, setVoteTally] = useState(0);
  const [errorMessage, setErrorMessage] = useState("some error happened...");
  const [notificationMessage, setNotificationMessage] = useState(null);

  const hook = () => {
    const promise = blogsRefPlug.getAllBlogRefs();
    const eventHandler = (initialBlogRefs) => {
      console.log("get all promise fulfilled");
      setBlogRefs(initialBlogRefs);
    };
    promise.then(eventHandler);
  };
  useEffect(hook, []);

  const handleTitleEntry = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorEntry = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleURLEntry = (event) => {
    setNewURL(event.target.value);
  };

  const createBlogRef = () => {
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
      votes: voteTally
    };
    console.log("effect");
    console.log(blogObject);

    const promise = blogsRefPlug.createBlogRef(blogObject);
    const eventHandler = (newBlogRef) => {
      console.log("promise fulfilled");
      console.log(newBlogRef);
      setBlogRefs(blogRefs.concat(newBlogRef));
      setNewTitle("");
      setNewAuthor("");
      setNewURL("");
    };
    const errorHandler = (error) => {
      console.log("fail");
    };
    promise.then(eventHandler).catch(errorHandler);
  };

  const updateBlogRef = () => {
    const updateMessage = `${newTitle} is already in list, update blog info?`;
    const confirmUpdate = window.confirm(updateMessage);
    if (confirmUpdate) {
      const blogRefToUpdate = blogRefs.find((blog) => blog.url === newURL);
      const updatedBlogRef = {
        ...blogRefToUpdate,
        author: newAuthor,
        title: newTitle
      };
      const promise = blogsRefPlug.updateBlogRef(updatedBlogRef);
      const eventHandler = () => {
        const message = `Updated '${blogRefToUpdate.name}' succesfully`;
        const updatedBlogRef = blogRefs.map((blog) =>
          blog.title === newTitle ? updatedBlogRef : blog
        );
        alterBlogRefs(updatedBlogRef, message);
      };
      const errorHandler = (error) => {
        const message = `Error -- : '${blogRefToUpdate.title}' was already deleted from server`;
        const blogs = blogRefs.filter((blog) => blog.title !== newTitle);
        alterBlogRefs(blogs, message);
      };
      promise.then(eventHandler).catch(errorHandler);
    } else {
      setNewTitle("");
      setNewAuthor("");
      setNewURL("");
    }
  };

  const alterBlogRefs = (blogs, message) => {
    setBlogRefs(blogs);
    setNewTitle("");
    setNewAuthor("");
    setNewURL("");
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const addBlogRef = (event) => {
    event.preventDefault();
    const blogs = blogRefs.map((blog) => blog.title);
    if (blogs.includes(newTitle)) updateBlogRef();
    else createBlogRef();
  };

  const upVote = (id) => {
    const blog = blogRefs.find((blogToToggle) => blogToToggle.id === id);
    const votedBlog = { ...blog, votes: blog.votes + 1 };
    const promise = blogsRefPlug.updateBlogRef(id, votedBlog);
    const eventHandler = (returnedBlogRef) => {
      setBlogRefs(
        blogRefs.map((blog) => (blog.id !== id ? blog : returnedBlogRef))
      );
    };
    const errorHandler = (error) => {
      setErrorMessage(
        `Blog Ref '${blog.title}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogRefs(blogRefs.filter((blog) => blog.id !== id));
    };
    promise.then(eventHandler).catch(errorHandler);
  };

  return (
    <div className="App">
      <Notification message={errorMessage} />
      <AddBlogRefForm
        add={addBlogRef}
        title={newTitle}
        author={newAuthor}
        url={newURL}
        votes={voteTally}
        handleTitle={handleTitleEntry}
        handleAuthor={handleAuthorEntry}
        handleURL={handleURLEntry}
      />
      <div className="blogs__container">
        <h4>Referenced Blogs</h4>
        <ul>
          {blogRefs.map((blog) => (
            <BlogRef key={blog.id} blog={blog} upVote={() => upVote(blog.id)} />
          ))}
        </ul>
        {/*<Footer />*/}
      </div>
    </div>
  );
};

export default App;
