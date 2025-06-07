import { useEffect, useState } from 'react';
import Post from './Post';

function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/billets`);
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des billets');
        }
        const data = await response.json();
        console.log('Données reçues :', data);
        setPosts(data);
      } catch (error) {
        console.error('Erreur :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Chargement des billets...</p>;
  }

  return (
    <div>
      <ul>
        {posts.map((post) => (
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
    </div>
  );
}

export default Feed;
