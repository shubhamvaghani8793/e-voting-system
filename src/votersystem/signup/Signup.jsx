import { useEffect, useState } from 'react'
import styles from './signup.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { set, ref } from 'firebase/database';
import { db } from '../fireconfigu';

const Signup = () => {

  const navigate = useNavigate();

  useEffect(() => { 
    const isLoggedin = localStorage.getItem('logged')
    if(isLoggedin == "true"){
      navigate('/user');
    }
  },[])

  const initialFormValue = {
    voterid: '',
    username: '',
    password: '',
    conpass: '',
    age: '',
    gender: '',
    mobile: '',
    email: '',
  }

  const [formvalue, setFormvalue] = useState(initialFormValue);
  const [errors, setError] = useState({});
  const [isSubmit, setSubmit] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(validate(formvalue));
    setSubmit(true);

    
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      senddata();
    }
  }, [errors]);

  const senddata = () => {
    let id = Date.now();
    try {
      const userRef = ref(db, 'newusers/' + id)
      set(userRef, {
        voterid: formvalue.voterid,
        username: formvalue.username,
        password: formvalue.password,
        age: formvalue.age,
        gender: formvalue.gender,
        mobileno: formvalue.mobile,
        email: formvalue.email,
        party: '--',
        status: 'Not Voted'
      })
    } catch (error) {
      console.log(error);
    }
  }

  const validate = (vales) => {
    const err = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!vales.voterid) {
      err.voterid = 'VoterId is Required....'
    }else if(vales.voterid.length <= 9){
      err.voterid = "VoterID Must be at least 10 Digits...."
    }

    if (!vales.username) {
      err.username = 'UserName is Required....'
    }

    if (!vales.password) {
      err.password = 'Password is Required....'
    } else if(vales.password.length <= 7){
      err.password = "Password Must be At least 8 Digite...."
    }

    if (!vales.conpass) {
      err.confirmpassowrd = 'Confirm Passowrd is Required....'
    } else if (vales.password != vales.conpass) {
      err.confirmpassowrd = 'Confirm Password Missmatch....'
    }

    if (!vales.age) {
      err.age = 'Age is Required....'
    }else if(vales.age <= 17){
      err.age = 'Age Must be more than 18 years....'
    }

    if (!vales.gender) {
      err.gender = 'Gender is Required....'
    }

    if (!vales.mobile) {
      err.mobileno = 'Mobile Number is Required....'
    }

    if (!vales.email) {
      err.email = 'Email is Required....'
    } else if (!regexEmail.test(vales.email)) {
      err.email = 'Please Enter Valid Email....'
    }

    return err;
  }

  const resetdata = () => {
    setFormvalue(initialFormValue)
  }
  return (
    <>
      <div className={styles.main}>
        { Object.keys(errors).length === 0 && isSubmit ? <div className={styles.successBox}>
            <div className={styles.successImg}>
              <img src="img/successCheck.png" alt="successImage"/>
            </div>

            <h2>Signup <span> Successful </span> know You can Login.</h2>

            <Link to="/login" className={styles.redirection}>Go To Login Page</Link>
          </div> 
          :
        <div className={styles.container}>
          <h1 className={styles.heading}>Sign Up</h1>
          <hr className={styles.hr} />
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.twopair}>
              <div className={styles.items}>
                <label htmlFor="voterid">Voter Id</label>
                <input
                  type="number"
                  name="voterid"
                  placeholder="Enter your voter id...."
                  value={formvalue.voterid}
                  onChange={handlechange}
                />
                <p className={styles.errmsg}>{errors.voterid}</p>
              </div>
              <div className={styles.items}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="Enter your username...." onChange={handlechange} value={formvalue.username} />
                <p className={styles.errmsg}>{errors.username}</p>
              </div>
            </div>

            <div className={styles.twopair}>
              <div className={styles.items}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Enter your Password...." onChange={handlechange} value={formvalue.password} />
                <p className={styles.errmsg}>{errors.password}</p>
              </div>
              <div className={styles.items}>
                <label htmlFor="conpass">Confirm Password</label>
                <input type="password" name="conpass" placeholder="Enter your Password...." onChange={handlechange} value={formvalue.confirmpassowrd} />
                <p className={styles.errmsg}>{errors.confirmpassowrd}</p>
              </div>
            </div>

            <div className={styles.twopair}>
              <div className={styles.items}>
                <label htmlFor="age">Age</label>
                <input type="number" name="age" placeholder="Enter your Age...." onChange={handlechange} value={formvalue.age} />
                <p className={styles.errmsg}>{errors.age}</p>
              </div>
              <div className={styles.items}>
                <label htmlFor="gender">gender</label>
                <select name="gender" className={styles.selectbox} onChange={handlechange} value={formvalue.gender}>
                  <option value="" default>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <p className={styles.errmsg}>{errors.gender}</p>
              </div>
            </div>

            <div className={styles.twopair}>
              <div className={styles.items}>
                <label htmlFor="mobile">Mobile Number</label>
                <input type="number" name="mobile" onChange={handlechange} placeholder="Enter your Mobile No...." value={formvalue.mobileno} />
                <p className={styles.errmsg}>{errors.mobileno}</p>
              </div>
              <div className={styles.items}>
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" onChange={handlechange} placeholder="Enter your Email...." value={formvalue.emailaddress} />
                <p className={styles.errmsg}>{errors.email}</p>
              </div>
            </div>

            <div className={`${styles.terms} ${styles.mb}`}>
              <input type="checkbox" name="agree" id={styles.chbox} />
              <p>Yes, I agree to the <a href="#">Terms of Service.</a></p>
            </div>

            <div className={styles.btns}>
              <input type="submit" name="signup" className={styles.signup} value="Sign Up" />
              <input type="reset" className={styles.signup} onClick={resetdata} value="Reset" />
            </div>

            <div className={`${styles.terms} ${styles.mt}`}>
              <p>Already have an account? <Link to="/login">Sing In</Link></p>
            </div>
          </form>
        </div>
        }

        {/* Succeess boxxxxxx  */}

        

      </div>
    </>
  )
}

export default Signup;