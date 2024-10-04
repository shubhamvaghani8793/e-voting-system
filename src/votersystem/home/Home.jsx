import { useNavigate } from 'react-router-dom'
import styles from './home.module.css'
import { useEffect } from 'react';
import { Typed } from 'react-typed';
import { TypeAnimation } from 'react-type-animation';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => { 
        const isLoggedin = localStorage.getItem('logged')
        const isAdminLoggedin = localStorage.getItem('adminLogged')
        if(isLoggedin == "true"){
          navigate('/user');
        }else if(isAdminLoggedin == "true"){
          navigate('/admin');
        }
      },[])

  return (
    <>
      <div className={styles.main}>
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <img src="img/facebook_indian_elections_empower_eng_190327_master_h264.gif" alt="gif"/>
            </div>
            <div className={styles.items}>
                <p 
                    onClick={() => {
                        navigate('/adminlogin')
                    }}
                    className={styles.a} 
                >Admin</p>
            </div>
        </div>

        <div className={styles.heroSection}>
            <div className={styles.textcontent}>
                <h2>Welcome To, </h2>
                <h1>E-voting portal</h1>
                <p>The purpose of this portal is to <br/> make  
                    <TypeAnimation 
                        sequence={[" Easy voting.",700,' Voting Anywhere.',700,' Secure voting.',700]}
                        wrapper='span'
                        speed={180}
                        repeat={Infinity}
                        className={styles.TypeAnimation}
                    />
                </p>

                <div className={styles.btns}>
                    <input 
                        type='button'
                        value='Login'
                        className={styles.loginbtn}
                        onClick={() => {
                            navigate('/login')
                        }}
                    />
                    <input
                        type='button' 
                        value='Sign Up'
                        className={styles.signupbtn}
                        onClick={() => {
                            navigate('/signup')
                        }}
                    />
                </div>
            </div>

            <div className={styles.rightImage}>
                <img src="img/indianelectionre.jpg" alt="img2"/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home