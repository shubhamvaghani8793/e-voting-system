import { useEffect, useState } from 'react'
import styles from './user.module.css'
import { ref, get, update } from 'firebase/database'
import { db } from '../fireconfigu';
import { useNavigate } from 'react-router-dom';

const User = () => {

  useEffect(() => {
    const islogged = localStorage.getItem('logged');
    if(islogged == "false" || islogged == null){
      navigate('/login');
    }
  },[])

  const navigate = useNavigate();
  const [dbdata, setdbdata] = useState({});
  const [toggle, settoggle] = useState(true);
  let objdata = localStorage.getItem('singleUser');
  let userdata = JSON.parse(objdata);


  useEffect(() => { 
    const getdatafromdb = async () => {
      const DBRef = ref(db, `newusers/${userdata?.id}`)
      try{
        const snapshort = await get(DBRef)
        const realdata = snapshort.val();
        setdbdata(realdata);
      }catch(errs){
        console.log(errs);
      }
    } 
    getdatafromdb();
  },[])

 

  const initialVal = {
    firstname : '',
    lastname : '',
    aadharno : '',
    voterid: '',
    phonenumber: '',
    email: '',
    age: '',
    birthdate: '', 
  }

  const initialVal2 = {
    address: '',
    state : '',
    city : '',
    pincode : '',
    uploadaadhar : '',
    voteridphoto : '',
    patry : ''
  }

  const [firstformvalue, setFirstformvalue] = useState(initialVal);
  const [secondformvalue, setSecondformvalue] = useState(initialVal2);

  const [Allerror, setError] = useState({})
  const [Allerror2, setError2] = useState({})

  const [gonext, setNext] = useState(false)
  const [senddata, setSenddata] = useState(false)

  const [shownext, setShownext] = useState(false)
  const [showSuccess, setShowsuccess] = useState(false)

  const handlechange = (e) => {
    const {name, value} = e.target;
    setFirstformvalue({...firstformvalue, [name] : value})
  }

  const handlechange2 = (e) => {
    const {name, value} = e.target;
    setSecondformvalue({...secondformvalue, [name] : value})
  }

  const handleNext = (e) => {
    e.preventDefault();
    setError(validate(firstformvalue));
    setNext(true)
  }

  const handleradio = (e) => {
    setSecondformvalue({...secondformvalue, patry:e.target.value})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError2(validate2(secondformvalue));
    setSenddata(true);
  }

  
  useEffect(() => {
    if(Object.keys(Allerror).length === 0 && gonext){
      setShownext(true)
    }
  },[Allerror])

  useEffect(() => {
    if(Object.keys(Allerror2).length === 0 && senddata){
      setShowsuccess(true);
      updateDB();
    }
  },[Allerror2])

  const updateDB = async () => {
    setdbdata({...dbdata, status : "Voted"})
    const refdb = ref(db, `newusers/${userdata.id}`)
    try{
      await update(refdb, {
        party: secondformvalue.patry,
        status : "Voted"
      })
    }catch(err){
      console.log(err);
    }
  }

  const validate = (vales) => {
    const err = {}
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexText =  /^[a-zA-Z]+$/;

    if(!vales.firstname){
      err.firstname = "FirstName is Required...."
    }else if(!regexText.test(vales.firstname)){
      err.firstname = "FirstName Can only be Alphabets...."
    }

    if(!vales.lastname){
      err.lastname = "LastName is Required...."
    }else if(!regexText.test(vales.lastname)){
      err.lastname = "LastName Can only be Alphabets...."
    }

    if(!vales.aadharno){
      err.aadharno = "AadharNo is Required...."
    }else if(vales.aadharno.length <= 11){
      err.aadharno = "AadharNo Must be at least 12 Digits...."
    }

    if(!vales.voterid){
      err.voterid = "VoterId is Required...."
    }else if(vales.voterid.length <= 9){
      err.voterid = "VoterID Must be at least 10 Digits...."
    }

    if(!vales.phonenumber){
      err.phonenumber = "PhoneNumber is Required...."
    }else if(vales.phonenumber.length <= 9){
      err.phonenumber = "PhoneNumber Must be at least 10 Digits...."
    }

    if(!vales.email){
      err.email = "Email is Required...."
    }else if(!regexEmail.test(vales.email)){
      err.email = 'Please Enter Valid Email....'
    }

    if(!vales.age){
      err.age = "Age is Required...."
    }else if(vales.age <= 17){
      err.age = 'Age Must be more than 18 years....'
    }else if(vales.age.length > 3){
      err.age = 'Please Enter Valid Age....'
    }

    if(!vales.birthdate){
      err.birthdate = "BirthDate is Required...."
    }else if(vales.birthdate.length != 10){
      err.birthdate = "Please Enter Valid BirthDate...."
    }
    return err;
  }

  const validate2 = (values) => {
    const err2 = {}

    if(!values.address){
      err2.address = "Address is Required....";
    }

    if(!values.state){
      err2.state = "State is Required....";
    }

    if(!values.city){
      err2.city = "City is Required....";
    }

    if(!values.pincode){
      err2.pincode = "Pincode is Required....";
    }else if(values.pincode.length != 6){
      err2.pincode = "Pincode Must be 6 Digits...."
    }

    if(!values.uploadaadhar){
      err2.uploadaadhar = "Aadhar Photo is Required....";
    }

    if(!values.voteridphoto){
      err2.voteridphoto = "VoterId Photo is Required....";
    }

    if(!values.patry){
      err2.patry = "Pleace Select at least One Patry....";
    }

    return err2;
  }
  
  const handletoggle = () => {
    settoggle(!toggle);
  }

  useEffect(() => {
    if(!toggle){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = 'auto';
    }
  },[toggle])

  return (
    <>
      <div className={styles.maincontainer}>
        <div className={`${styles.navbar} ${styles.usernav}`}>
          <div className={styles.logo}>
            <img src="img/facebook_indian_elections_empower_eng_190327_master_h264.gif" alt="gif"/>

          </div>
          
          <div className={styles.userlogo} onClick={handletoggle}>
            <img src="img/userlogo.png" alt="user"/>
          </div>
          
        </div>

        <div className={`${styles.usercontainer} ${toggle ? '' : styles.parentclass}`}>
         <div className={styles.overlay} onClick={() => settoggle(true)}></div>
          <div className={ toggle ? styles.sidebar : styles.toggleclass}>
            <div className={styles.userinfo}>
              <div className={styles.sidelogo}>
                <img src="img/userlogo.png" alt="img"/>
              </div>

              <div className={styles.userdata}>
                <div className={styles.filed}>
                  <p>Voter Id: </p>
                  { dbdata?.email ? <p className={styles.userfields}>{dbdata?.voterid} </p>:
                    <p className={styles.shimmer2}></p>
                  }
                </div>
                <div className={styles.filed}>
                  <p>Name: </p>
                  { dbdata?.email ? <p className={styles.userfields}>{dbdata?.username} </p>:
                    <p className={styles.shimmer3}></p>
                  }
                </div>
                <div className={styles.filed}>
                  <p>MobileNo: </p>
                  { dbdata?.email ? <p className={styles.userfields}>{dbdata?.mobileno} </p>:
                    <p className={styles.shimmer4}></p>
                  }
                </div>
                <div className={styles.filed}>
                  <p>Email: </p>
                  { dbdata?.email ? <p className={styles.userfields}>{dbdata?.email} </p>:
                    <p className={styles.shimmer2}></p>
                  }
                </div>
                <div className={styles.filed}>
                  <p>Status: </p>

                  { dbdata?.status ? 
                    <>
                      {dbdata?.status == "Not Voted" ? 
                        <p className={styles.status}>{dbdata?.status}</p> :
                        <p className={styles.votedstatus}>{dbdata?.status}</p>}
                    </> :
                     <p className={styles.shimmer}></p>
                  }
                </div>
              </div>

              <input 
                type='button' 
                value='Raise Ticket' 
                className={styles.ticket}
                onClick={() => {
                  navigate('/raiseticket')
                }}    
              />
              <input 
                type='button' 
                value='Logout' 
                className={styles.logoutbtn}
                onClick={() => {
                  localStorage.removeItem('singleUser');
                  localStorage.setItem('logged', false)
                  navigate('/')
                }}
              />
            </div>
          </div>

          { dbdata?.status == "Not Voted" ? <div className={styles.userform}>
            <div className={styles.infotextbox}>
              <h1>E-voting Form 2024</h1>
              <p className={styles.infoText}>Welcome to the e-voting platform. To ensure your vote is counted correctly, please check the following information Before Submiting Form :<b> 1. Personal Information 2. Identification Verification 3. Confirmation</b></p>
            </div>

            <form>
            { !shownext ? 
              <div className={styles.formfieldbox}>
                <div className={styles.formfields}>
                  <div className={styles.leftfl}>
                    <div className={styles.twopairfield}>
                      <div className={styles.fl}>
                        <label htmlFor="firstname">FirstName</label>
                        <input 
                          type="text" 
                          name="firstname" 
                          placeholder="Enter First Name...." 
                          value={firstformvalue.firstname}
                          onChange={handlechange}
                        />
                        <p className={styles.err}>{Allerror.firstname}</p>
                      </div>

                      <div className={styles.fl}>
                        <label htmlFor="lastname">LastName</label>
                        <input 
                          type="text" 
                          name="lastname" 
                          placeholder="Enter Last Name...."
                          value={firstformvalue.lastname}
                          onChange={handlechange}
                        />
                        <p className={styles.err}>{Allerror.lastname}</p>
                      </div>
                    </div>

                    <div className={styles.twopairfield}>
                      <div className={styles.fl}>
                        <label htmlFor="aadharno">Aadhar Number</label>
                        <input 
                          type="number" 
                          name="aadharno" 
                          placeholder="Enter Aadhar Number...."
                          value={firstformvalue.aadharno}
                          onChange={handlechange} 
                        />
                        <p className={styles.err}>{Allerror.aadharno}</p>
                      </div>

                      <div className={styles.fl}>
                        <label htmlFor="voterid">Voter Id Number</label>
                        <input 
                          type="number" 
                          name="voterid" 
                          placeholder="Enter Voter Id Number...."
                          value={firstformvalue.voterid}
                          onChange={handlechange}
                        />
                        <p className={styles.err}>{Allerror.voterid}</p>
                      </div>
                    </div>

                    <div className={styles.twopairfield}>
                      <div className={styles.fl}>
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input 
                          type="number" 
                          name="phonenumber" 
                          placeholder="Enter Phone Number...."
                          value={firstformvalue.phonenumber}
                          onChange={handlechange}
                        />
                        <p className={styles.err}>{Allerror.phonenumber}</p>
                      </div>

                      <div className={styles.fl}>
                        <label htmlFor="email">Email Address</label>
                        <input 
                          type="text" 
                          name="email" 
                          placeholder="Enter Email Address...."
                          value={firstformvalue.email}
                          onChange={handlechange}
                        />
                        <p className={styles.err}>{Allerror.email}</p>
                      </div>
                    </div>

                    <div className={styles.twopairfield}>
                      <div className={styles.fl}>
                        <label htmlFor="age">Age</label>
                        <input 
                          type="number"
                          name="age" 
                          placeholder="Enter Age...."
                          value={firstformvalue.age}
                          onChange={handlechange}  
                        />
                        <p className={styles.err}>{Allerror.age}</p>
                      </div>

                      <div className={styles.fl}>
                        <label htmlFor="birthdate">Birth Date</label>
                        <input 
                          type="text" 
                          name="birthdate" 
                          placeholder="Enter BirthDate(DD/MM/YYYY)"
                          value={firstformvalue.birthdate}
                          onChange={handlechange}
                        />
                        <p className={styles.err}>{Allerror.birthdate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.agrement}>
                  <input 
                    type="checkbox" 
                    name="agree" id={styles.agree}/>
                    <p>I hereby declare that information stated above is true to the best of my knowledge.</p>
                </div>

                <div className={styles.agrementbtns}>
                  <input 
                    type="reset" 
                    className={styles.nextbtn} 
                    onClick={() => setFirstformvalue(initialVal)}
                    value='Reset'
                  />
                  <input type='button'
                      value='Next' 
                      className={`${styles.nextbtn} ${styles.greennext}`}
                      onClick={handleNext} 
                  />
                </div>
              </div>
              :
              <div className={styles.residentalInfo}>
                <div className={styles.formfields}>
                  <div className={styles.leftfl}>
                    <div className={styles.twopairfield}>
                      <div className={styles.fl}>
                        <label htmlFor="address">Address</label>
                        <input 
                          value={secondformvalue.address}
                          onChange={handlechange2}
                          type="text" 
                          name="address" 
                          placeholder="Enter Address...."/>
                        <p className={styles.err}>{Allerror2.address}</p>  
                      </div>

                      <div className={styles.fl}>
                        <label htmlFor="state">State</label>
                        <input 
                          type="text" 
                          name="state" 
                          value={secondformvalue.state}
                          onChange={handlechange2}
                          placeholder="Enter State...."/>
                          <p className={styles.err}>{Allerror2.state}</p> 
                      </div>
                    </div>

                    <div className={styles.twopairfield}>
                      <div className={styles.fl}>
                        <label htmlFor="city">City</label>
                        <input 
                          type="text" 
                          name="city" 
                          value={secondformvalue.city}
                          onChange={handlechange2}
                          placeholder="Enter City...."/>
                          <p className={styles.err}>{Allerror2.city}</p> 
                      </div>

                      <div className={styles.fl}>
                        <label htmlFor="pincode">Pin code</label>
                        <input 
                          type="number" 
                          name="pincode" 
                          value={secondformvalue.pincode}
                          onChange={handlechange2}
                          placeholder="Enter Pin Code...."/>
                          <p className={styles.err}>{Allerror2.pincode}</p> 
                      </div>
                    </div>

                    <div className={styles.twopairfield}>
                      <div className={styles.fl}>
                        <input 
                          type="file" 
                          name="uploadaadhar" 
                          id="uploadaadhar" 
                          value={secondformvalue.uploadaadhar}
                          onChange={handlechange2}
                          placeholder=""/>
                          <label htmlFor="uploadaadhar" className={styles.uploadfile}>⬆ Aadhar Photo</label>
                          <p className={styles.err}>{Allerror2.uploadaadhar}</p> 
                      </div>
                      <div className={styles.fl}>
                        <input 
                          type="file" 
                          onChange={handlechange2}
                          value={secondformvalue.voteridphoto}
                          name="voteridphoto" 
                          id="voteridphoto" 
                          placeholder=""/>
                          <label htmlFor="voteridphoto" className={styles.uploadfile}>⬆ Voterid Photo</label>
                          <p className={styles.err}>{Allerror2.voteridphoto}</p> 
                      </div>
                    </div>

                    <div className={styles.twopairfield}>
                      <div className={styles.fl}>
                        <label htmlFor="partyname" className={styles.partyname}>Select Party</label>

                        <div className={styles.partybox}>
                          <div className={styles.partyselction}>
                            <input 
                              onChange={handleradio} 
                              type="radio" 
                              name="party" 
                              id="bjp" 
                              value="BJP"
                              />
                            <label htmlFor="bjp"><img src="img/bjp.png" id="bjp" alt="bjp"/></label>
                          </div>
                          <div className={styles.partyselction}>
                            <input 
                              type="radio" 
                              name="party" 
                              id="CONGRESS" 
                              onChange={handleradio} 
                              value="congress"/>
                            <label htmlFor="con"><img src="img/congress.png" id="con" alt="con"/></label>
                          </div>
                          <div className={styles.partyselction}>
                            <input 
                              type="radio" 
                              name="party" 
                              id="AAP" 
                              onChange={handleradio}
                              value="aap"/>
                            <label htmlFor="aap"><img src="img/aap.png" id="app" alt="aap"/></label>
                          </div>
                          <div className={styles.partyselction}>
                            <input 
                              type="radio" 
                              name="party" 
                              id="SP"
                              onChange={handleradio}  
                              value="sp"/>
                            <label htmlFor="sp"><img src="img/sp.png" id="sp" alt="sp"/></label>
                          </div>
                          <div className={styles.partyselction}>
                            <input 
                              type="radio" 
                              name="party" 
                              id="CM"
                              onChange={handleradio}  
                              value="cm"/>
                            <label htmlFor="cm"><img src="img/cm.png" id="cm" alt="cm"/></label>
                          </div>
                          <div className={styles.partyselction}>
                            <input 
                              type="radio" 
                              name="party" 
                              id="BSP"
                              onChange={handleradio}  
                              value="bsp"/>
                            <label htmlFor="bsp"><img src="img/bsp.png" id="bsp" alt="bsp"/></label>
                          </div>
                        </div>
                        <p className={styles.err}>{Allerror2.patry}</p> 
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.sumbitbtnbox} style={{marginTop : '50px'}} >
                  <input type='submit' onClick={handleSubmit} className={styles.sumbitbtn} value='Submit'/>
                </div>
              </div>
            }  
            </form>
            </div>
            :
              <div className={styles.outerbox}>
                <div className={styles.successBox}>
                  <div className={styles.successImg}>
                    <img src="img/icons8-tick.gif" alt="successImage"/>
                  </div>

                  <h3>Thank you For participating in the e-voting process. Your vote is important! We will Update your Information Sortly</h3>

                </div>
              </div> 
          }    

        </div>
      </div>
    </>
  )
}

export default User;