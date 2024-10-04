import { useEffect, useState } from 'react';
import styles from './raise.module.css'
import { db } from '../fireconfigu';
import { ref, set } from 'firebase/database'
import { Link, useNavigate } from 'react-router-dom';

const Raiseticket = () => {

  const navigate = useNavigate();

  let objdata = localStorage.getItem('singleUser');
  let userdata = JSON.parse(objdata);

  const initial = {
    msg : ''
  }

  const [formdata, setFormdata] = useState(initial);
  const [senddata, setsenddata] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({}); 

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
      SendDataToDB();
    }
  },[errors]);

  const SendDataToDB = async () => {
    const id = Date.now();
    const dbRef = ref(db, 'tickets/' + id)
    set(dbRef, {
      voterid : userdata.voterid,
      message : formdata.msg,
    })
  }


  const validate = (values) => {
    const err = {}

    if(!values.msg){
      err.msg = "Message is Required...."
    }else if(values.msg.length < 25){
      err.msg = "Please Enter At Least 10 words...."
    }

    return err;
  }
  return (
    <>
      <div className={styles.main}>
      { !showSuccess ? 
        <div className={styles.container}>
          <h1>Raise Ticket</h1>
          <p>This page is Design for updating your profile OR updating voterid Card information,<b> Your can not update VoterId card Number </b></p>
          <hr className={styles.hr}/>
            <div className={styles.infobox}>
              <form className={styles.form} onSubmit={handlesubmit}>
                <div className={styles.filds}>
                  <label htmlFor="voterid">Voter Id</label>
                  <input value={userdata?.voterid} type="number" name="voterid" placeholder="Enter Your Voter Id....." disabled/>
                </div>

                <div className={styles.filds}>
                  <label htmlFor="msg">Message</label>
                  <textarea
                    onChange={handlechange}
                    value={formdata.msg} 
                    name="msg" 
                    id="msg" 
                    cols="20" 
                    rows="10" 
                    placeholder="Enter Your Message OR details you want to update.....">
                  </textarea>
                  <p className={styles.err}>{errors.msg}</p>
                </div>

                <div className={styles.btns}>
                  <input type="button" name="back" className={styles.submit} value="Back" onClick={() => {
                    navigate('/user')
                  }}/>
                  <input type="submit" name="send" className={styles.submit} value="Submit"/>
                </div>
              </form>
            </div>
        </div>
        :
        <div className={styles.successBox}>
          <div className={styles.successImg}>
            <img src="img/successCheck.png" alt="successImage"/>
          </div>

          <h2>Message Sent <span> Successfully</span>. We will Update your Information Sortly</h2>

          <input 
            type='button'
            value='Go Back' 
            className={styles.redirection}
            onClick={() => {
              navigate('/user');
            }}
          />
        </div> 
      }  
      </div>
    </>
  )
}

export default Raiseticket