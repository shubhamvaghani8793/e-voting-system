import { useEffect, useState } from 'react'
import styles from './login.module.css'
import { ref, get } from 'firebase/database'
import { db } from '../fireconfigu';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => { 
    const isLoggedin = localStorage.getItem('logged')
    if(isLoggedin == "true"){
      navigate('/user');
    }
  },[])

  const initial = {
    voterid: '',
    username: '',
    password: '',
  }
  const [formvalue, setFormvalue] = useState(initial);
  const [errors, setError] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [isdata, setData] = useState(false);
  const [oneuserdata, setoneuserdata] = useState(null);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    await getdata();
    setError(validate(formvalue));
    setSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      

      if(isdata){
        if(oneuserdata.username != formvalue.username){
          setError({username : "Invalid username....."})
        }else if(oneuserdata.password != formvalue.password){
          setError({password : "Invalid Password....."})
        }else{
          localStorage.setItem('singleUser', JSON.stringify(oneuserdata));
          localStorage.setItem('logged', true)
          loginuser();
        }
      }else{
        setError({voterid : 'VoterId Does not exists'})
      }
    }
  }, [errors]);

  const loginuser = () => {
    navigate('/user')
  }

  const getdata = async () => {
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
        if(user.voterid == formvalue.voterid){
          return user
        } 
      });
      
      if (singleuser) {
        setoneuserdata(singleuser);
        setData(true);
      } 
    } catch (errr) {
      console.log(errr);
    }
  }

  const validate = (values) => {
    const err = {};

    if (!values.voterid) {
      err.voterid = "VoterId is Required....";
    }else if(values.voterid.length <= 9){
      err.voterid = "VoterId Must be more than 9 Digits....."
    }

    if (!values.username) {
      err.username = 'UserName is Required....';
    }

    if (!values.password) {
      err.password = "Password is Required....";
    }
    return err;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftImage}>
          <img src="img/giphy.gif" alt="gif" />
        </div>

        <div className={styles.loginform}>
          <h1>Login</h1>
          <hr className={styles.hr} />
          <form className={styles.form} onSubmit={handlesubmit}>
            <div className={styles.field}>
              <label htmlFor="voterid">Voter Id</label>
              <input type="number" value={formvalue.voterid} name="voterid" id="voterid" placeholder="Enter Your Voter Id" onChange={handlechange} />
              <p className={styles.errmsg}>{errors.voterid}</p>
            </div>
            <div className={styles.field}>
              <label htmlFor="username">Username</label>
              <input type="text" value={formvalue.username} name="username" id="username" placeholder="Enter Your Username" onChange={handlechange} />
              <p className={styles.errmsg}>{errors.username}</p>
            </div>
            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <input type="password" value={formvalue.password} name="password" id="password" placeholder="Enter Your Password" onChange={handlechange} />
              <p className={styles.errmsg}>{errors.password}</p>
            </div>

            <input type="submit" name="sub" id={styles.submit} value="Login" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Login