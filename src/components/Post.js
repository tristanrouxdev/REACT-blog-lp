import '../styles/Post.css'
import { useState } from 'react';
import Comment from './Comment'

function Post({ date, title, content, comments }) {
  const [showComments, setShowComments] = useState(false); // État pour gérer la visibilité des commentaires
  const hasComments = comments && Object.keys(comments).length > 0;

  const toggleComments = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setShowComments(!showComments); // Inverse l'état de visibilité
  };

  return (
    <li>
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{content}</p>
      {hasComments && (
        <a href="/" className="post-link" onClick={toggleComments}>
          {showComments ? 'Masquer les commentaires' : 'Voir les commentaires'}
        </a>
      )}
      {showComments && hasComments && (
        <div className="post-comments">
          <h3>Commentaires</h3>
          <ul>
              {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        date={comment.Date}
                        author={comment.Auteur}
                        comment={comment.Contenu}
                    />
              ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default Post;