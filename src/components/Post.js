import { useState } from 'react';
import Comment from './Comment';
import '../styles/Post.css';
import { apiFetch } from '../api';

function Post({ id, date, title, content, comments, user }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiFetch('/commentaires', {
        method: 'POST',
        body: JSON.stringify({
          com_date: new Date().toISOString().slice(0, 10),
          com_contenu: commentText,
          billet_id: id,
          user_id: user.id,
        }),
      });

      setConfirmation('Commentaire envoyé !');
      setCommentText('');
    } catch (error) {
      setConfirmation(`Erreur : ${error.message}`);
      console.error(error);
    }
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

      {user && (
        <form onSubmit={handleSubmit} className="comment-form">
          <h4>Ajouter un commentaire</h4>
          <textarea
            placeholder="Votre commentaire"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <button type="submit">Envoyer</button>
          {confirmation && <p className="confirmation-message">{confirmation}</p>}
        </form>
      )}
    </li>
  );
}

export default Post;
