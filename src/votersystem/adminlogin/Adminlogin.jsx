import { useEffect, useState } from 'react'
import styles from './adminlogin.module.css'
import { useNavigate } from 'react-router-dom'

const Adminlogin = () => {

  const navigate = useNavigate();

  useEffect(() => { 
    const isLoggedin = localStorage.getItem('adminLogged')
    if(isLoggedin == "true"){
      navigate('/admin');
    }
  },[])

  const intial = {
    username : '',
    password : '',
  }

  const [formdata, setformdata] = useState(intial);
  const [gohome, setGohome] = useState(false);
  const [errors, setErrors] = useState({});

  const handlechange = (e) => {
    const {name, value} = e.target;
    setformdata({...formdata, [name] : value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(formdata));
    setGohome(true);
  }

  const validate = (values) => {
    const err = {}

    if(!values.username){
      err.username = "UserName is Required...."
    }else if(values.username != "shubham"){
      err.username = "Invalid UserName...."
    }

    if(!values.password){
      err.password = "Password is Required...."
    }else if(values.password != "vaghani"){
      err.password = "Invalid Password...."
    }

    return err;
  }

  useEffect(() => {
    if(Object.keys(errors).length === 0 && gohome){
      localStorage.setItem('adminLogged', true)
      navigate('/admin')
    }
  },[errors])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.loginform}>
          <h1>Admin Login</h1>
          <hr className={styles.hr}/>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="username">Username</label>
                <input
                  value={formdata.username}
                  onChange={handlechange} 
                  type="text" 
                  name="username" 
                  id="username" 
                  placeholder="Enter Your Username"
                />
                <p className={styles.err}>{errors.username}</p>
              </div>
              <div className={styles.field}>
                <label htmlFor="password">Password</label>
                <input 
                  value={formdata.password}
                  onChange={handlechange}
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Enter Your Password"
                />
                <p className={styles.err}>{errors.password}</p>
              </div>

              <input type="submit" name="sub" id={styles.submit} value="Login"/>
            </form>
        </div>
      </div>
    </>
  )
}

export default Adminlogin 