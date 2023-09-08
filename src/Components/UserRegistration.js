import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserRegistration.css'
import { v4 as uuidv4 } from 'uuid';
import { SHA256 } from 'crypto-js';
const UserRegistration = () => {
  let navigate = useNavigate();
  
  const [user, setUsers] = useState({
    firstname: "",
    lastname: "",
    password: "",
    mobilenumber: "",
    emailid: "",
    Aadharcardnumber: "",
    dateofbirth: "",
    AccountNumber: "",
    Accountbalance: 0,
    Accounttype: "",
    salt:""
  });

  const { firstname, lastname, password, mobilenumber, emailid, Aadharcardnumber, dateofbirth,  Accounttype } = user;


  //Validation
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isAadharValid, setIsAadharValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const validateEmail = (email) => {
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = pattern.test(email);
    setIsEmailValid(isValidEmail);
  };


  const onInputChange = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
    if (e.target.name === 'emailid') {
      validateEmail(e.target.value);
    } else if (e.target.name === 'Aadharcardnumber') {
      validateAadhar(e.target.value);
    } else if (e.target.name === 'mobilenumber') {
      validateMobile(e.target.value);
    } else if (e.target.name === 'password') {
      validatePassword(e.target.value);
    }
  };


  const validateAadhar = (aadhar) => {
    const aadharRegex = /^[2-9]{1}[0-9]{11}$/; // Example: 123456789012
    setIsAadharValid(aadharRegex.test(aadhar));
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile numbers
    setIsMobileValid(mobileRegex.test(mobile));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsPasswordValid(passwordRegex.test(password));
  };



  // Account number generation
  const padString = (str, len) => {
    if (str.length < len) {
      const random = Math.floor(Math.random() * 10);
      return padString(str + random, len);
    };
    return str;
  };



  //Hashing password

  const generateSalt = () => {
    const randomBytes = new Uint8Array(16);
    window.crypto.getRandomValues(randomBytes);
    return Array.from(randomBytes, (byte) => byte.toString(16)).join('');
  };
  
  // Function to hash the password with a salt
  const hashPassword = (password, salt) => {
    const hashedPassword = SHA256(password + salt).toString();
    return hashedPassword;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid && isAadharValid && isMobileValid && isPasswordValid) {

      const salt = generateSalt();
      const hashedPassword = hashPassword(user.password, salt);

      console.log('Salt:', salt);
      console.log('Hashed Password:', hashedPassword);
      
      //   //Accountnumber generation
      const uuid = uuidv4();
      const numericuuid = uuid.replace(/[^0-9]/g, "");
      let acc = ""
      if (numericuuid.length < 12) {
        acc = (padString(numericuuid, 12));
      }
      else
        acc = (numericuuid.slice(0, 12));


      try {
        await axios.post("http://localhost:3000/bank", {
          ...user,
          AccountNumber: acc,
          salt: salt,
          password: hashedPassword,
        });
        navigate("/");
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      alert('Please enter valid details');
    }

  }
  return (
    <div className="container">
      <div className='row formrow flex-grow'>
        <div id="formcontent" className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className="text-center"> RegisterUsers</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor='firstname' className='form-label login-label'>Firstname</label>
              <input type={"text"}
                className='form-control'
                placeholder='enter your First name'
                name="firstname"
                value={firstname}
                onChange={(e) => onInputChange(e)} />
                
            </div>

            <div className='mb-3'>
              <label htmlFor='Lastname' className='form-label login-label'>Lastname</label>
              <input type={"text"}
                className='form-control'
                placeholder='enter your name'
                name="lastname"
                value={lastname}
                onChange={(e) => onInputChange(e)} />
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label login-label'>Password</label>
              <input type={"password"}
                className='form-control'
                placeholder='enter your password'
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)} />
              {!isPasswordValid && <span className='text-danger'>Invalid Password</span>}
            </div>

            <div className='mb-3'>
              <label htmlFor='mobilenumber' className='form-label login-label'>MobileNumber</label>
              <input type={"text"}
                className='form-control'
                placeholder='enter your MobileNumber'
                name="mobilenumber"
                value={mobilenumber}
                onChange={(e) => onInputChange(e)} />
              {!isMobileValid && <span className='text-danger'>Invalid Mobile Number</span>}
            </div>

            <div className='mb-3'>
              <label htmlFor='emailid' className='form-label login-label'>Emailid</label>
              <input type={"email"}
                className='form-control'
                placeholder='enter your Emailid'
                name="emailid"
                value={emailid}
                onChange={(e) => onInputChange(e)} />

            </div>

            <div className='mb-3'>
              <label htmlFor='Aadharcardnumber' className='form-label login-label'>Aadharcardnumber</label>
              <input type={"text"}
                className='form-control'
                placeholder='enter your Aadharcardnumber'
                name="Aadharcardnumber"
                value={Aadharcardnumber}
                onChange={(e) => onInputChange(e)} />
              {!isAadharValid && <span className='text-danger'>Invalid Aadharcardnumber</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='dateofbirth' className='form-label login-label'>Dateofbirth</label>
              <input type={"date"}
                className='form-control'
                placeholder='enter your Dateofbirth'
                name="dateofbirth"
                value={dateofbirth}
                onChange={(e) => onInputChange(e)} />
            </div>
            <div className='mb-3'>
              <label htmlFor='Accounttype' className='form-label login-label'></label>
              <select class="form-select" name="Accounttype" onChange={(e) => onInputChange(e)} value={Accounttype}>
                <option selected>Account type</option>
                <option value="Savings Account">Savings Account</option>
                <option value="Current Account">Current Account</option>
                <option value="Individual Retirement Account">Individual Retirement Account</option>
                <option value="Business Account">Business Account</option>
                <option value="Joint Account">Joint Account</option>
                <option value="StudentAccount">StudentAccount</option>
              </select>
            </div>
            <button type="submit" className='btn btn-outline-primary'>Submit</button>
            <button type="cancel" className='btn btn-danger mx-2'>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UserRegistration;