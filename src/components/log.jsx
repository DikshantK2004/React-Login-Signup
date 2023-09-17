import './log.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Log() {
    const [activeIndex, setActive] = useState("username");
    const [data, setData] = useState({email :'', username : '', password:''})
    const [visible, setVisible] = useState(false);
    const notify_error = () => toast.error('Please Enter valid emails only', {
      position: "top-center",
      autoClose: 1003,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    const colour = "#F2F7A180";

    console.log(data);
    const handleFocus = (event) => {
        if (event.target.name === "username") setActive("username")
        else if (event.target.name === "password") setActive("password");
        else if(event.target.name === "email") setActive("email");
    }
    const validateEmail = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
          notify_error();
          return false;
      } 
      return true;
  };
    const handleChange = (event) =>{
        if(event.target.name === "username") setData({...data, username: event.target.value });
        else if(event.target.name === "password") setData({...data, password : event.target.value});
        else if(event.target.name === "email") setData({...data, email: event.target.value});
    }

    const handleSubmit = () =>
    {
        if(validateEmail(data.email))
        {
          return toast("Ready to submit")
        }
    }
    return (

      <div className="App">
        <div className='cent'>
          <div id='this'>
           
          
        <div className='log'>

            <FontAwesomeIcon icon={faUser} style={{ color: "#35A29F", height: "150px", margin: "20px" }} />
            <br />

            {/* box for email id */}
            <div className='box' >
            <div style={{ fontSize: "30px", margin: "10px", color: (activeIndex === "email" ? "#F2F7A1"  : colour  ) }}> Email </div>
            <Input type= "text" name = "email" style={{ marginBottom: "10px", color: "#E4F1FF", textAlign: "center" }} onFocus={handleFocus} value = {data.email} onChange={handleChange}> </Input>
            </div>

            {/* box for password */}


            <div className='box'>
            <div style={{ fontSize: "30px", margin: "10px", color: (activeIndex === "password" ? "#F2F7A1" : colour) }}> Password </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                type={!visible ? "password" : "text"}
                style={{ marginBottom: "10px", color: "#E4F1FF", textAlign: "center", flex: 1 }}
                onFocus={handleFocus}
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              {!visible ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={() => setVisible((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => setVisible((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            </div>


            
            
            <Button variant="outlined" onClick={handleSubmit}> Submit </Button>

            <ToastContainer
              position="top-center"
              autoClose={1003}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
        </div>

        </div>
        </div>
    </div>
    )
}