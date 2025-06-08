// src/components/Post.js
import React, { useState } from 'react';
import Comment from './Comment';
import '../styles/Post.css';

export default function Post({ id, date, title, content, comments = [], user }) {
  console.log(
    'Props normalisées pour Post →',
    { id, date, title, content, comments, user }
  );

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment]     = useState('');
  const [msg, setMsg]                   = useState('');
  const [commentList, setCommentList]   = useState(comments);

  const toggle = () => setShowComments(v => !v);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user) {
      setMsg('Veuillez vous connecter.');
      return;
    }

    console.log('📢 je poste un commentaire sur le billet', id);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/commentaires`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            billet_id:  id,
            COM_CONTENU: newComment,
            COM_DATE:   new Date().toISOString().split('T')[0],
          }),
        }
      );

      // on récupère l'enveloppe de la Resource
      const json = await res.json();

      if (!res.ok) {
        // json.message contient l'erreur de validation ou le message du serveur
        throw new Error(json.message || res.statusText);
      }

      console.log('🚀 raw API response after POST →', json);

      // json.data est le vrai commentaire créé
      const created = json.data;

      // on l'ajoute à la liste
      setCommentList(prev => [...prev, created]);

      setMsg('Commentaire envoyé !');
      setNewComment('');
    } catch (err) {
      console.error(err);
      setMsg(`Erreur : ${err.message}`);
    }
  };

  return (
    <li className="post-item">
      <article onClick={toggle} style={{ cursor: 'pointer' }}>
        <h3>{title}</h3>
        <time>{date}</time>
        <p>{content}</p>
      </article>

      {showComments && (
        <div className="comments-section">
          {commentList.map(c => (
            <Comment
              key={c.id}
              date={c.COM_DATE}
              author={c.user?.name ?? 'Anonyme'}
              comment={c.COM_CONTENU}
            />
          ))}

          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              placeholder="Votre commentaire"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              required
            />
            <button type="submit">Envoyer</button>
          </form>

          {msg && <p className="confirmation-message">{msg}</p>}
        </div>
      )}
    </li>
  );
}
