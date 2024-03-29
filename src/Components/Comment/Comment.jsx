import "./Comment.css"
import { IoPersonCircle } from "react-icons/io5";

function Comment({comment}) {
  //comment.username
  //comment.description
  return (
    <div className="commentContainer">
      <div className="commentHeader">
      <IoPersonCircle size={35} color="#ADAAAA"/>
        <p>Jane Doe </p>
      </div>
      <div className="commentDescription">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi fugit cum repellat vel laboriosam illo accusamus obcaecati cumque est quos.</p>
      </div>
    </div>
  )
}

export default Comment