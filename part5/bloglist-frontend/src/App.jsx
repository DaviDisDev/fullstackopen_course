import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [message, setmessage] = useState(null)
  const [classMessage, setClassMessage] = useState(null)

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');



  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const fetchBlogs = async () => {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      };

      fetchBlogs();
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');

      const blogs = await blogService.getAll();

      setBlogs(blogs);
    } catch (exception) {

      setmessage(`Wrong credentials`);
      setClassMessage('error');

      setTimeout(() => {
        setmessage(null);
        setClassMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );


  const blogsList = () => (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      )}
    </>
  );
  const setLogOut = () => {
    window.localStorage.removeItem('loggedUser');
    window.location.reload();
  }
  const blogFormRef = useRef()

  const createNote = async () => {
    blogFormRef.current.toggleVisibility()
    try {

      const newBlog = await blogService.createBlog({ title, author, url });

      setBlogs((prevBlogs) => {
        return [...prevBlogs, newBlog];
      });
      setTitle('');
      setAuthor('');
      setUrl('');
      setmessage(`a new blog ${title} by ${author} `);
      setClassMessage('success');

      setTimeout(() => {
        setmessage(null);
        setClassMessage(null);
      }, 5000);

    } catch (exception) {

      setmessage(`something has happened wrong`);
      setClassMessage('error');

      setTimeout(() => {
        setmessage(null);
        setClassMessage(null);
      }, 5000);
    }
  };



  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} classMessage={classMessage} />
      {!user ?
        loginForm() :
        <div>
          <h2>create new</h2>
          {user.name} logged-in<button onClick={() => setLogOut()}>log out</button>
          <br />
          <br />

          <Togglable buttonLabel="create" ref={blogFormRef}>
            <BlogForm
              title={title}
              author={author}
              url={url}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              handleClick={() => createNote()}

            />
          </Togglable>
          {blogsList()}
        </div>
      }
    </div >
  );
};

export default App;
