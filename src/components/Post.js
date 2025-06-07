// src/components/Post.js
import React, { useState } from 'react';
import Comment from './Comment';
import '../styles/Post.css';

export default function Post({ id, date, title, content, comments = [], user }) {
  const [showComments, setShowComments]   = useState(false);
  const [newComment, setNewComment]       = useState('');
  const [msg, setMsg]                     = useState('');
  const [commentList, setCommentList]     = useState(comments);

  const toggle = () => setShowComments(v => !v);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) {
      setMsg('Veuillez vous connecter.');
      return;
    }
    console.log('📢 je poste un commentaire sur le billet', id);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/commentaires`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        billet_id: id,
        COM_CONTENU: newComment,
        COM_DATE: new Date().toISOString().split('T')[0],
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMsg(`Erreur : ${err.message||res.statusText}`);
      return;
    }
    const created = await res.json();
    console.log('🚀 raw API response after POST:', created);

    setCommentList(list => [...list, created]);
    setMsg('Commentaire envoyé !');
    setNewComment('');
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
