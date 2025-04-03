function Post({  date, title, content } ) {
  return (
    <li>
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{content}</p>
    </li>
  );
}

export default Post