// src/components/Feed.js
import { useEffect, useState } from 'react';
import Post from './Post';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/billets`)
      .then(res => res.json())
      .then(json => {
        console.log('Réponse brute API →', json);
        // si json.data existe, on prend ça, sinon on prend json directement
        const list = Array.isArray(json) ? json : (json.data || []);
        setPosts(list);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement…</p>;

  return (
    <ul className="feed-list">
      {posts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          date={post.Date}
          title={post.Titre}
          content={post.Contenu}
          comments={post.Commentaires}
          user={user}
        />
      ))}
    </ul>
  );
}
