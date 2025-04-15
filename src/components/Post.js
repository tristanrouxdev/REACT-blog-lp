import { useState } from 'react';
import Comment from './Comment';
import '../styles/Post.css';

function Post({ date, title, content, comments }) {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <li className="post">
      <h2>{title}</h2>
      <p className="post-date">{date}</p>
      <p>{content}</p>

      {comments && comments.length > 0 && (
        <div className="comments-section">
          <button onClick={toggleComments}>
            {showComments ? 'Masquer les commentaires' : 'Afficher les commentaires'}
          </button>

          {showComments && (
            <div className="comments">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  date={comment.Date}
                  author={comment.Auteur}
                  comment={comment.Contenu}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export default Post;
