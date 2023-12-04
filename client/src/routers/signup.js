import React, {useEffect, useState} from 'react';
 import { BrowserRouter } from "react-router-dom";
 import { useNavigate } from "react-router-dom";


 function SignUp ()
{
    // Get email
    const [emailInput, setEmailInput] = useState(''); // an array 
    const [nameInput, setNameInput] = useState('');
    const [passwordInput,setPasswordInput] = useState('');
    const [dateInput, setDateInput] = useState('');
  
    let navigate = useNavigate(); 





    
    // Now call api to insert 
    const onSignUp = async (e) =>
    {   
        e.preventDefault();
         if(emailInput === ''|| passwordInput === ''|| nameInput=== '' || dateInput=== '')
            {
                return false; 
            } 

        
        try
        {  
           
            const bodyInput ={
                "email": emailInput,
                "password" :passwordInput,
                "name" : nameInput,
                "date_of_birth" : dateInput
                
            }

            console.log(dateInput);
            const response = await fetch(`http://localhost:3001/signup`, 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify(bodyInput)
                
            }); 
            const data = await response.json(); 
            console.log("Error:" +data);
            if (data)
            { 
                document.cookie =`email=${emailInput}`; 
                document.cookie = `password=${passwordInput}`; 
            navigate('/');
            }
            return true; 
        }
        catch(err)
        {
            console.log("sign up error", err);
            return false; 
        } 

    }

    
  


 
    return (
        
        <>
        <h1 className='text-center mt-5'> Sign Up </h1>
        
        <center> 
        

      
        <form className='text-center mt-5 w-25'
            > 
            <div className='form-floating mb-1'>
                
            <label className='form-label' form='name' style={{fontSize:'9px'}} > Email </label>
                <input type='text' id='emailform' className='form-control ' placeholder='Email@example.com'value={emailInput} onChange={(e) => setEmailInput(e.target.value)} ></input>
            </div>
        </form>
        <form className='text-center mt-5 w-25'
            > 
            <div className='form-floating mb-1'>
                
            <label className='form-label' form='name' style={{fontSize:'9px'}} > name </label>
                <input type='text' id='nameform' className='form-control ' placeholder='Bob' value={nameInput} onChange={(e) => setNameInput(e.target.value)}></input>
            </div>
        </form>

        <form className='text-center mt-5 w-25'
            > 
            <div className='form-floating mb-1'>
                
            <label className='form-label' form='name' style={{fontSize:'9px'}} > create password </label>
                <input type='password' id='nameform' className='form-control ' placeholder='Bob' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}></input>
            </div>
        </form>

        <form className='text-center mt-5 w-25'> 
            <div className='form-floating mb-1' >
                
            <label className='form-label' form='name' style={{fontSize:'9px'}} > Date of Birth ex: month/day/year</label>
                <input type='date' id='nameform' className='form-control ' placeholder='00/00/0000' value={dateInput} onChange={(e) => setDateInput(e.target.value)} ></input>
            </div> 
             <center>
                 <button className= 'btn btn-success mt-5' type='success' onClick={onSignUp} >Create account </button>
            </center>
        </form>
        </center>
        </> 
        ); 

}

export default SignUp; 