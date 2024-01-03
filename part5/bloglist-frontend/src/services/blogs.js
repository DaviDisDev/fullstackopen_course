import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';

const getAll =async () => {
  const storedUser = localStorage.getItem('loggedUser');

  const token = JSON.parse(storedUser).token;
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
    
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

export default { getAll,createBlog };
