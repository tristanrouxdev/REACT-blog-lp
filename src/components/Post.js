import '../styles/Post.css'
import { useState } from 'react';
import Comment from './Comment'

function Post({  date, title, content, comments } ) {
    const [showComments, setShowComments] = useState(false);
    const hasComments = comments && Object.keys(comments).length > 0;
  return (
    <li>
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{content}</p>
      {hasComments ? (
        <a href="/" className="post-link">voir les commentaires.</a>
      ) : null }
    </li>
  );
}

export default Post