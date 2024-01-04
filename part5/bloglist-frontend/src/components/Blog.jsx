import { useState } from 'react';
import BlogService from '../services/blogs';

const Blog = ({ blog, updateLikes, setBlogs }) => {
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
      updateLikes(newBlog);
    } catch (exception) {
      console.log(exception);
    }
  };
  const deleteBlog = async (blog) => {
    if (confirm(`Delete blog ${blog.title} by  ${blog.author}`)) {
      try {

        const newBlog = await BlogService.deleteBlog(blog.id);
        const blogs = await BlogService.getAll();
        setBlogs(blogs);
      } catch (exception) {
        console.log(exception);
      }
    }

  };


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
        <button onClick={() => deleteBlog(blog)}>Delete</button>
      </div>
    </div>
  );
};

export default Blog;
