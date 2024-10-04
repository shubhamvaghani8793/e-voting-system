// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import React, { useState } from 'react'
// import { auth } from './setup';

// const Sendmsg = () => {
//     const [phone, setPhone] = useState();
//     const [user, setUser] = useState(null);
//     const [otp, setotp] = useState('');

//     const sendotp = async () => {
//         try{
//             const recaptcha = new RecaptchaVerifier(auth, 'myrecaptcha', {})
//             const confirmation = await signInWithPhoneNumber(auth,phone,recaptcha)
//             setUser(confirmation);
//         }catch(err){
//             console.log(err);
//         }
//     }

//     const Verifyotp = () => {
//         try{
//             user.confirm(otp);
//         }catch(err){
//             console.log(err);
//         }

//     }

//   return (
//     <div>
//         <input type="text" name='phonenumber' onChange={(e) => setPhone(e.target.value)}/><br />
//         <button onClick={sendotp}>Send</button><br />
//         <div id='myrecaptcha'></div>
//         <input onChange={(e) => setotp(e.target.value)} type="text" name="otp" id="otp" /><br />
//         <button onClick={Verifyotp}>Verify OTP</button>
//     </div>
//   )
// }

// export default Sendmsg