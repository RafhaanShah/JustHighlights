import React from 'react';
import './PostList.css'; // Import your CSS file

function PostList({ posts }) {
  return (
    <div className="post-list-container">
      <h1 className="post-list-title">Soccer</h1>
      {posts.map((post, index) => (
        <div key={index} className="post-card">
          <h2 className="post-title">{post.title}</h2>
          {post.embed ? (
            <iframe
              title={`Embedded Video ${index}`}
              className="post-iframe"
              src={post.link}
              allowFullScreen
            ></iframe>
          ) : (
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="post-link"
            >
              {post.link}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;