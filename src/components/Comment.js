import '../styles/Comment.css'

function Comment({ date, author, comment }) {
  return (
    <li>
        <span className="comment-date">le {date}</span>, 
        <span className="comment-author"> par : {author}</span>
        <p>{comment}</p>
    </li>
  );
}
export default Comment