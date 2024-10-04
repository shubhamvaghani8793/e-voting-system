import { useEffect, useRef, useState } from 'react'
import styles from './admin.module.css'
import { ref, get} from 'firebase/database'
import { db } from '../fireconfigu';
import { useNavigate } from 'react-router-dom';
import { IoTicket } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { TiArrowSortedDown } from 'react-icons/ti';

const Admin = () => {
  const navigate = useNavigate();
  const [getSelect, SetSelect] = useState('');

  useEffect(() => {
    const islogged = localStorage.getItem('adminLogged');
    if(islogged == "false" || islogged == null){
      navigate('/adminlogin');
    }
  },[])

  const [usersData, setUsersData] = useState([]);
  const [search, setSearch] = useState('');
  
  
  useEffect(() => {
    const getData = async () => {
      const dbRef = ref(db, 'newusers')
      try {
        const snapshot = await get(dbRef)
        const data = snapshot.val()

        const myobj = Object.keys(data).map((key) => (
          {
            id:key,
            ...data[key]
          }
        ))
        setUsersData(myobj);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  },[])

  // get pandding ticket data

  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dbRef = ref(db, 'tickets')
      try {
        const snapshot = await get(dbRef)
        const data = snapshot.val()
        
        const myobj = Object.keys(data);
        
        let totalTicket = myobj.length
        setTicketData(totalTicket)
        
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  },[])

  const handlechange = (e) => {
    setSearch(e.target.value);
  }

  const handleSelect = (e) => {
    SetSelect(e.target.value);
  }

  return(
    <>
      <div className={styles.main}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
              <img src="img/facebook_indian_elections_empower_eng_190327_master_h264.gif" alt="gif"/>  
          </div>
          <div className={styles.items}>
              <p className={`${styles.mobileNav} ${styles.ticketnumber}`} onClick={() => {navigate('/pandingtickets')}}><IoTicket /><p className={styles.panddingnumber}>{ticketData}</p></p>
              <p className={styles.mobileNav} onClick={() => {navigate('/updateinformation')}}><FaRegEdit /></p>
              <p className={styles.mobileNav} onClick={() => {    
                  localStorage.setItem('adminLogged', false);
                  navigate('/')
              }}><IoIosLogOut /></p>

              <p className={`${styles.pcNav} ${styles.ticketnumber}`} onClick={() => {navigate('/pandingtickets')}}><p className={styles.panddingnumber2}>{ticketData}</p>Panding Tickets</p>
              <p className={styles.pcNav} onClick={() => {navigate('/updateinformation')}}>Update Ticket</p>
              <p 
                className={styles.pcNav} 
                onClick={() => {  
                  localStorage.setItem('adminLogged', false);
                  navigate('/')
                }}

              >Logout</p>
          </div>
        </div>
          <div className={styles.selectoption} >
            <select name="voted" id="voted" onChange={handleSelect} className={styles.selectbox} >
              <option value="">All</option>
              <option value="Not Voted">Not Voted</option>
              <option value="Voted">Voted</option>
            </select>
            <div  className={styles.selectarrow}>
              <TiArrowSortedDown  className={styles.arrow}/>
            </div>
          </div>
        <div className={styles.container}>


          <h1>Users Information</h1>
          <div className={styles.search}>
            <input
              onChange={handlechange}
              value={search} 
              type="text" 
              name="search" 
              placeholder="Search UserName...."/>
          </div>

          <table className={styles.adminTB}>
            <thead>
            <tr>
              <th>VoterID</th>
              <th>Name</th>
              <th>Party</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            
              {
                usersData.filter(val => {
                  if(getSelect == ''){
                    return val;
                  }else{
                    return val.status == getSelect;
                  }
                })
                .filter(val => val.username.includes(search)).map((data) => <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.username}</td>
                <td>{data.party}</td>
                <td>{data.status}</td>
              </tr>)
              }
            </tbody>
            <tfoot>

            </tfoot>
          </table>
        </div>
      </div>
    </>
  )
}

export default Admin