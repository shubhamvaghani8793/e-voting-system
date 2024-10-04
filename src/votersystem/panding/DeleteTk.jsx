import { ref, remove } from 'firebase/database'
import { db } from '../fireconfigu';
import { MdDelete } from "react-icons/md";
import styles from './delete.module.css'

const DeleteTk = ({userid, onDelete}) => {

  const handleDT = () => {
    onDelete(userid);
    try {
      const DBref = ref(db, `tickets/${userid}`)
      remove(DBref)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>  
      <p className={styles.deletebtn}><MdDelete onClick={handleDT} /></p> 
    </>
  )
}

export default DeleteTk