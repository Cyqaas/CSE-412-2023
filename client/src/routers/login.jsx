import React, {useEffect, useState} from 'react'; 
import { useNavigate } from "react-router-dom";
import './styles.css';
/*
    Hold componets and buttons/modulas to login into their account 
    Textbox for username and password, button to call event
*/

// Get the cookie
function getCookie(cname)
{
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function InputLogin  () 
{
    const [emailInput, setEmailInput] = useState(''); // an array
    const [passwordInput,setPasswordInput] = useState('');

    let navigate = useNavigate(); 

    useEffect(()=>{

        setEmailInput(getCookie('email')); 
        setPasswordInput(getCookie('password'));

    },[])

    const onLoginIn = async (e) =>
    {
        e.preventDefault();
        try{  
        const response = await fetch(`http://localhost:3001/login/${emailInput}/${passwordInput}`); 
        const data = await response.json(); 
        console.log(data);

            if(data)
            {
                // set cookie 
                document.cookie =`email=${emailInput}`; 
                document.cookie = `password=${passwordInput}`; 
                navigate('/ProfilePage'); 
            }
        }
        catch(err)
        {
            console.log("log in error", err);
        } 
    }

     return (
        <>
            <h1 className='text-center mt-5'> Login Page </h1>
            <center>
            <form className='text-center mt-5 w-25'>

            <div className='form-floating mb-1'>
            <label className='form-label' form='emailform' style={{fontSize:'9px'}} > Email </label>
                <input 
                type='text' 
                id='emailform' 
                className='form-control' 
                placeholder='Email@example.com' 
                value={emailInput} onChange={(e) => setEmailInput(e.target.value)}>
                </input>
            </div>
                
                <div className='form-floating'>
                <label className='form-label' form='passform'  style={{fontSize:'9px'}}> Password </label>
                <input 
                type ="password" 
                id='passform' 
                className='form-control mt-5' 
                placeholder= '●●●●●●●' 
                value={passwordInput} 
                onChange={  (e) => setPasswordInput(e.target.value)}>
                </input>
                </div>
                </form> 
           </center>

                <div style = {{ display: 'flex', justifyContent: 'center'}}>
                    <button 
                    className='btn btn-success mt-5' 
                    onClick ={onLoginIn} 
                    type='success'
                    style = {{
                        background: 'linear-gradient(to right, #FFA07A, #FF6347)',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        marginRight: '30px',
                        width: '120px',
                        height: '45px',
                    }}
                    >
                    Sign In 
                    </button>

                 <button 
                 onClick={() =>{navigate('/signup')}} 
                 className = 'btn btn-success mt-5' 
                 type='success'
                 style={{
                    background: 'linear-gradient(to right, #FFA07A, #FF6347)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    marginLeft: '30px',
                    width: '120px',
                    height: '45px',
                  }}
                 > 
                 Sign Up 
                 </button>
            </div>
        </>
    ); 
}

export  default InputLogin; 