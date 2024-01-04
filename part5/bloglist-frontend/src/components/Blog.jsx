import { useState } from 'react';
import BlogService from '../services/blogs';

const Blog = ({ blog, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const createNote = async () => {
    try {
      // Utiliza newBlog en lugar de updatedBlog
      const newBlog = await BlogService.updateLikes(blog);
      const blogs = await BlogService.getAll();
      setBlogs(blogs);

    } catch (exception) {
      console.log(exception);
    }
  };

  const deleteBlogHandler = async () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      try {
        await BlogService.deleteBlog(blog.id);
        const blogs = await BlogService.getAll();
        setBlogs(blogs);
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  const storedUser = JSON.parse(localStorage.getItem('loggedUser'));

  const blogUsername = blog.user.username;
  console.log("usuario del Blog", blogUsername)
  const userDelete = storedUser.username
  console.log("el que quiere borrar", userDelete)

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => toggleVisibility()}>view</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title} <button onClick={() => toggleVisibility()}>hidden</button></p>
        <p>{blog.url}</p>
        <p> likes {blog.likes} <button onClick={() => createNote()}>like</button></p>
        <p>{blog.author}</p>
        {blogUsername != userDelete ? "" : <button onClick={() => deleteBlogHandler()}>Delete</button>}
      </div>
    </div>
  );
};

export default Blog;
