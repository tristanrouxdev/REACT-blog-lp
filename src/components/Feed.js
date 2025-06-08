// src/components/Feed.js
import React, { useState, useEffect } from 'react';
import Post from './Post';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchBillets() {
      try {
        const res = await fetch(`${API_URL}/billets`);
        if (!res.ok) {
          throw new Error(`Erreur chargement billets: ${res.statusText}`);
        }
        const json = await res.json();
        console.log('💬 Réponse brute /billets:', json);
        // On attend que json.data soit bien un tableau
        const list = Array.isArray(json.data) ? json.data : [];
        setPosts(list);
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
         key={post.id}            // ta vraie PK non-nulle
         id={post.id}             // on passe billet_id en id pour Post
         date={post.date}                // champ 'date' (minuscule)
         title={post.title}              // champ 'title'
         content={post.content}          // champ 'content'
         comments={post.commentaires}    // champ 'commentaires'
         user={user}
       />
      ))}
    </ul>
  );
}
