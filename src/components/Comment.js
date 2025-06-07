// src/components/Comment.js
import React from 'react';
import '../styles/Comment.css';

export default function Comment({ date, author, comment }) {
  return (
    <div className="comment">
      <p>{comment}</p>
      <footer>
        <span>{author}</span> – <time>{date}</time>
      </footer>
    </div>
  );
}
