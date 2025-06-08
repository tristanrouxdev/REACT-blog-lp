import React, { useState, useEffect } from 'react';
import Post from './Post';

export default function Feed({ user }) {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchBillets() {
      try {
        const res = await fetch(`${API_URL}/billets`);
        if (!res.ok) throw new Error(res.statusText);
        const json = await res.json();
        // on prend json.data tel quel, sans commentaires
        setPosts(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBillets();
  }, [API_URL]);

  if (loading) return <p>Chargement des billets...</p>;

  return (
    <ul className="feed-list">
      {posts.map(post => (
        <Post
          key={post.billet_id ?? post.id}
          id={post.billet_id ?? post.id}
          date={post.Date ?? post.date}
          title={post.Titre ?? post.title}
          content={post.Contenu ?? post.content}
          comments={post.commentaires}
          user={user}
        />
      ))}
    </ul>
  );
}
