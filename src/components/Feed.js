import { posts } from '../datas/posts'
import Post from './Post'

function Feed() {
  return (
    <div className="feed">
        <ul>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    date={post.Date}
                    title={post.Titre}
                    content={post.Contenu}
                    comments={post.Commentaires}
                />
            ))}
      </ul>
    </div>
  )
}

export default Feed