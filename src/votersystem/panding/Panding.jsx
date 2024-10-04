import { useEffect, useState } from 'react';
import styles from './panding.module.css'
import { useNavigate } from 'react-router-dom';
import { ref, get} from 'firebase/database'
import { db } from '../fireconfigu';
import DeleteTk from './DeleteTk';
import { IoTicket } from 'react-icons/io5';
import { FaHome, FaRegEdit } from 'react-icons/fa';

const Panding = () => {

  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const dbRef = ref(db, 'tickets')
      try {
        const snapshot = await get(dbRef)
        const data = snapshot.val()

        const myobj = Object.keys(data).map((key) => (
          {
            id:key,
            ...data[key]
          }
        ))
        setUsersData(myobj)
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  },[])

  const handleDelete = (deleteid) => {
    setUsersData((pre) => pre.filter((user) => user.id != deleteid))
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <img src="img/facebook_indian_elections_empower_eng_190327_master_h264.gif" alt="gif"/>
          </div>
          <div className={styles.items}>
            <p className={styles.mobileNav} onClick={() => {navigate('/updateinformation')}}><FaRegEdit /></p>
            <p className={styles.mobileNav} onClick={() => {navigate('/admin')}}><FaHome /></p>

            <p className={styles.pcnav} onClick={() => {navigate('/admin')}}>Home</p>
            <p className={styles.pcnav} onClick={() => {navigate('/updateinformation')}}>Update Ticket</p>
          </div>
        </div>

        <div className={styles.container}>
          <h1>Users Tickets Message</h1>

          <table className={styles.pndTB} >
            <tr>
              <th>VoterID</th>
              <th>Message</th>
            </tr>

            {usersData.map((data) => <tr key={data.id}>
              <td>{data.voterid}</td>
              <td>{data.message}</td>
              <td><DeleteTk userid={data.id} onDelete={handleDelete}/></td>
            </tr>)}
          </table>
        </div>
      </div>
    </>
  )
}

export default Panding