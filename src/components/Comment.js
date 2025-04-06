
function Comment({ date, author, comment }) {
  return (
    <li>
        <p>{date}</p>
        <span>{author}</span>
        <p>{comment}</p>
    </li>
  );
}
export default Comment