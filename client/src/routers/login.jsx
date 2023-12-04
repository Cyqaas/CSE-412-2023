import React, {useEffect, useState} from 'react'; 
import { useNavigate } from "react-router-dom";
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
            console.log("error");
        } 
    }

     return (
        <>
               
             <h1 className='text-center mt-5'> Login Page </h1>
             <center> 
            <form className='text-center mt-5 w-25'
            > 
            <div className='form-floating mb-1'>
                
            <label className='form-label' form='emailform' style={{fontSize:'9px'}} > Email </label>
                <input type='text' id='emailform' className='form-control ' placeholder='Email@example.com' value={emailInput} onChange={(e) => setEmailInput(e.target.value)}></input>
            </div>
                <div className='form-floating'>
                <label className='form-label' form='passform'  style={{fontSize:'9px'}}> password </label>
                <input type ="password" id='passform' className='form-control mt-5'   placeholder= '●●●●●●●' value={passwordInput} onChange={  (e) => setPasswordInput(e.target.value)}></input>
                </div>
                
                <center>
                <button className='btn btn-success mt-5' onClick ={onLoginIn} type='success'>Sign In</button>

                </center> 
               
            </form> 
           
           </center>
           
            <center>
                 <button onClick={() =>{navigate('/signup')}}className= 'btn btn-success mt-5' type='success'>Sign Up </button>
            </center>
        </>
    ); 

}

export  default InputLogin; 