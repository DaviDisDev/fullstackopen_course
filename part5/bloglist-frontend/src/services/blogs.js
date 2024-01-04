import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';

const getAll =async () => {
  const storedUser = localStorage.getItem('loggedUser');

  const token = JSON.parse(storedUser).token;
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.get(baseUrl, config);
  const orderBlogs=response.data.sort(function (a, b) {
    return b.likes - a.likes;
  });
  return orderBlogs;
    
};
const createBlog =async ({title, author, url}) => {
  const storedUser = localStorage.getItem('loggedUser');

  const token = JSON.parse(storedUser).token;
  
  const data = {
    "title": title,
    "author": author,
    "url": url
  };
 
  const config = {
    headers: {
      Authorization: `bearer ${token}` }
  };

  const response = await axios.post(baseUrl,data, config);
  return response.data;
    
};
const updateLikes = async (blog) => {
  const storedUser = localStorage.getItem('loggedUser');
  const token = JSON.parse(storedUser).token;
  const likesPlus=parseInt(blog.likes)+1;
  const data = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: blog.user,
    likes: likesPlus,
  };

  const config = {
    headers: {
      Authorization: `bearer ${token}`, // Asegúrate de usar "Bearer" en lugar de "bearer"
    },
  };

  try {
    const response = await axios.put(baseUrl+`/${blog.id}`, data, config);
    return response.data;
  } catch (error) {
    console.error('Error updating likes:', error.message);
    throw error; // Re-lanza el error para que el componente pueda manejarlo
  }
};
const deleteBlog =async (id) => {
  const storedUser = localStorage.getItem('loggedUser');

  const token = JSON.parse(storedUser).token;
 
  const config = {
    headers: {
      Authorization: `bearer ${token}` }
  };
  
  const response = await axios.delete(baseUrl+`/${id}`, config);

  return response.data;
    
};


export default { getAll,createBlog,updateLikes,deleteBlog };
