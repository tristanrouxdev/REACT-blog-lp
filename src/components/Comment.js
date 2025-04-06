
function Comment({ date, author, comment }) {
  return (
    <li>
        <p>{comment.date}</p>
        <span>{comment.author}</span>
        <p>{comment.content}</p>
    </li>
  );
}
export default Comment