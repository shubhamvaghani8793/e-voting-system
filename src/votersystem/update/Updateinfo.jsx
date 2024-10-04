import { useEffect, useRef, useState } from 'react';
import styles from './updateinfo.module.css'
import { ref, get, update, remove } from 'firebase/database'
import { db } from '../fireconfigu';
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { IoTicket } from 'react-icons/io5';

const Updateinfo = () => {

  const initial = {
    search: '',
    voterid : '',
    username : '',
    password : '',
    conpass : '',
    phonenumber : '',
    email : ''
  }

  const [formdata, setFormdata] = useState(initial);
  const [senddata, setsenddata] = useState(false);
  const [BtnMode, setBtnMode] = useState(false);
  const [errors, setErrors] = useState({}); 
  const [getid, setGetId] = useState(null); 
  const [updatesucess, setupdatesuccess] = useState(false); 
  const [deletesuccess, setdeletesuccess] = useState(false); 
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    const {name, value} = e.target;
    setFormdata({...formdata, [name] : value});
  }

  const handlesubmit = (e) => {
    e.preventDefault();

    setErrors(validate(formdata));
    setsenddata(true);
  }

  useEffect(() => {
    if(Object.keys(errors).length === 0 && senddata){
      setShowSuccess(true);
      setupdatesuccess(true);
      handleupdate(formdata);
    }
  },[errors]);

  const handleupdate = async (data) => {
    const userRefe = ref(db, `newusers/${getid.id}`)
    try {
      await update(userRefe, {
        username : data.username,
        password : data.password,
        mobileno : data.phonenumber,
        email : data.email,
      })
    } catch (error) {
      console.log(error);
    }
  }


  const validate = (values) => {
    const err = {}

    if(!values.search){
      err.search = "voterid is Required...."
    }else if(values.search.length < 5){
      err.search = "Invalid voterId...."
    }

    if(!values.username){
      err.username = "voterid is Required...."
    }

    if(!values.password){
      err.password = "Password is Required...."
    }else if(values.password.length <= 7){
      err.password = "Password Must be At least 8 Digite...."
    }

    if(!values.conpass){
      err.conpass = "Confirm Password is Required...."
    }else if(values.password != values.conpass){
      err.conpass = "Password Does not Match...."
    }

    if(!values.phonenumber){
      err.phonenumber = "Phonenumber is Required...."
    }

    if(!values.email){
      err.email = "email is Required...."
    }

    return err;
  }

  const getvoterid = useRef();

  const handlegetdata = async () => {
    const uRefe = ref(db, 'newusers');
    try {
      const snaps = await get(uRefe);
      const data = snaps.val();
      const userobj = Object.keys(data).map((key) => (
        {
          id: key,
          ...data[key]
        }
      ));

      let singleuser = userobj.find((user) => {
        if(user.voterid == getvoterid.current.value){
          return user
        } 
      });
    
      if (singleuser) {
        setGetId(singleuser);
        setdataFields(singleuser);
      } else {
        alert('data not found');
      }
    } catch (errr) {
      console.log(errr);
    }
  }

  const setdataFields = (singleuser) => {
    setFormdata({...formdata, 
      voterid : singleuser.voterid,
      username : singleuser.username,
      password : singleuser.password,
      conpass : singleuser.password,
      phonenumber : singleuser.mobileno,
      email : singleuser.email,
    })
    setBtnMode(true)
  }

  const handleDelete = () => {
    setShowSuccess(true);
    setdeletesuccess(true)
    try{
      const userRef = ref(db, `newusers/${getid.id}`)
      remove(userRef)
    }catch(err){
      console.log(err);
    }
  }


  return (
    <>
      <div className={styles.main}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <img src="img/facebook_indian_elections_empower_eng_190327_master_h264.gif" alt="gif"/>
          </div>
          <div className={styles.navitems}>
              <p className={styles.mobileNav} onClick={() => {navigate('/pandingtickets')}}><IoTicket /></p>
              <p className={styles.mobileNav} onClick={() => {navigate('/admin')}}><FaHome /></p>
              

            <p className={styles.pcnav} onClick={() => {navigate('/admin')}} >Home</p>
            <p className={styles.pcnav} onClick={() => {navigate('/pandingtickets')}} >Panding Tickets</p>
          </div>
        </div>

        { !showSuccess ? 
                <div className={styles.container}>
          <h1>Update Records</h1>

          <div className={styles.search}>
            <input 
              type="number" 
              onChange={handlechange} 
              name="search" 
              placeholder="Enter Voter Id...."
              ref={getvoterid}
            />

            <button type="button" onClick={handlegetdata} className={styles.getdatabtn}>Get</button>
          </div>
          <p className={styles.err}>{errors.search}</p>

          <div className={styles.userform}>
            <form>
              <div className={styles.formfieldbox}>
                <div className={styles.formfields}>
                  <div className={styles.leftfl}>
                    <div className={styles.twopairfield}>
                      <div className={styles.fl}>
                        <label htmlFor="voterid">Voter Id Number</label>
                        <input type="number" className={styles.disinput} name="voterid" value={formdata.voterid} placeholder="Voter Id Number" disabled/>
                        
                      </div>

                      <div className={styles.fl}>
                        <label htmlFor="username">Username</label>
                        <input
                          value={formdata.username}
                          onChange={handlechange} 
                          type="text" 
                          name="username" 
                          placeholder="Enter your username...."/>
                          <p className={styles.err}>{errors.username}</p>
                      </div>
                    </div>

                    <div className={styles.twopairfield}>
                      <div className={styles.fl}>
                        <label htmlFor="text">Password</label>
                        <input
                          value={formdata.password}
                          onChange={handlechange} 
                          type="text" 
                          name="password" 
                          placeholder="Enter your Password...."/>
                          <p className={styles.err}>{errors.password}</p>
                      </div>
                      <div className={styles.fl}>
                        <label htmlFor="conpass">Confirm Password</label>
                        <input
                          value={formdata.conpass}
                          onChange={handlechange}
                          type="text" 
                          name="conpass" 
                          placeholder="Enter your Password...."/>
                          <p className={styles.err}>{errors.conpass}</p>
                      </div>
                    </div>

                    <div className={styles.twopairfield}>
                      <div className={styles.fl}>
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input
                          value={formdata.phonenumber}
                          onChange={handlechange} 
                          type="number" 
                          name="phonenumber" 
                          placeholder="Enter Phone Number...."/>
                          <p className={styles.err}>{errors.phonenumber}</p>
                      </div>

                      <div className={styles.fl}>
                        <label htmlFor="email">Email Address</label>
                        <input
                          value={formdata.email}
                          onChange={handlechange} 
                          type="email" 
                          name="email" 
                          placeholder="Enter Email Address...."/>
                          <p className={styles.err}>{errors.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.btns}>
            { !BtnMode ?  
            <>
            <button 
              type="button" 
              className={styles.updatebtndis}
              onClick={handlesubmit}
              disabled
              >Update</button>
              <button 
                type="button" 
                className={styles.updatebtn2dis}>Delete</button>
            </>
             :

             <>
                <button 
                  type="button" 
                  className={styles.updatebtn}
                  onClick={handlesubmit}
                >Update</button>
                <button 
                  type="button" 
                  className={styles.updatebtn2}
                  onClick={handleDelete}>Delete</button>
             </>
            }
          </div>
                </div>
          
          : updatesucess ?    
         <div className={styles.successBox}>
            <div className={styles.successImg}>
              <img src="img/successCheck.png" alt="successImage"/>
            </div>

            <h2>Record updated<span> Successfully </span>.</h2>
          </div> 
          : deletesuccess ? 
          <div className={styles.successBox}>
            <div className={styles.successImg}>
              <img src="img/successCheck.png" alt="successImage"/>
            </div>

            <h2>Record Deleted<span> Successfully </span>.</h2>
          </div> 
          : ''
        } 
      </div>
    </>
  )
}

export default Updateinfo