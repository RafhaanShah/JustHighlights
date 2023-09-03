import './App.css';
import React, { useEffect, useState } from 'react';
import PostList from './component/PostList';
import { fetchSoccerPosts } from './service/redditService';

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSoccerPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}

export default App;