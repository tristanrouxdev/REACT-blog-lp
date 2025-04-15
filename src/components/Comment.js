import '../styles/Comment.css'

function Comment({ date, author, comment }) {
  return (
    <div className="comment">
      <p><strong>{author}</strong> le <em>{date}</em></p>
      <p>{comment}</p>
    </div>
  );
}
export default Comment