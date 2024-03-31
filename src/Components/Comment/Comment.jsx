import { useEffect, useState } from "react";
import "./Comment.css"
import { IoPersonCircle } from "react-icons/io5";
import { useUser } from "../../context/user";
import { getStudentById } from "../../controllers/updateUser";

function Comment({feedback}) {

  const [student, setStudent] = useState(null)

  const user = useUser();

  useEffect(() => {
    if(user){
      const handleGetStudent = async () => {
        const student = await getStudentById(feedback.userId);
        setStudent(student)
      }

      handleGetStudent()
    }
  }, [user])
  
  return (
    <div className="commentContainer">
      <div className="commentHeader">
        <IoPersonCircle size={35} color="#ADAAAA"/>
        {student ? (
          <p>{`${student?.name} ${student?.lastName}`}</p>
        ) :  (
          <p>Jane Doe</p>
        )}
      </div>
      <div className="commentDescription">
        <p>{feedback.content}</p>
      </div>
    </div>
  )
}

export default Comment