import React, {Fragment, useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import getCookie from './cookieHelper';

const ProfilePage = () => {
    const [email, setEmail] = useState(''); 
    const [updatedEmail, setUpdateEmail] = useState('');
    const [password,setPassword] = useState('');
    const [userInformation, setUserInformation] = useState([]);
    const [name, setName] = useState('');    
    const [bio, setBio] = useState('');
    const [visibility, setVisibility] = useState('');
    const [updatedVisibility, setUpdateVisibility] = useState('');
    const [option, setOption] = useState('');
    const [userUID, setUserUID] = useState('');

    //edit visibility function 

    const updateVisibility = async e => {
        e.preventDefault();
        try {
            console.log(updatedVisibility);
            let Optionvalue = null; 
            if (updatedVisibility==='Public') {
                Optionvalue = true; 
            }
            else if (updatedVisibility==='Private') {
                Optionvalue = false; 
                
            }
            setOption(Optionvalue); 
            const bodyInput = 
            {
                "option" : Optionvalue
            }

            console.log(option);
            const response = await fetch(`http://localhost:3001/profileEditVisibility/${userUID}`,{
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(bodyInput)
            });
            console.log(response);
            window.location = "/ProfilePage";
        }
        catch (err) {
            console.error(err.message);
        } 
    }

    //edit email function 

    const updateEmail = async e => {
        e.preventDefault();
        try {

            const bodyInput = 
            {
                "email" : updatedEmail
            }
     
            console.log(userUID);
            const response = await fetch(`http://localhost:3001/profileEditEmail/${userUID}`,{
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(bodyInput)
            });
            if(response)
            {
                document.cookie = `email=${updatedEmail}`;
                console.log(response);
                window.location = "/";
            }
        }
        catch (err) {
            console.error(err.message);
        } 
    }

    //edit bio function 

    const updateBio = async e => {
        e.preventDefault();
        try {
            const body = { bio };
            const response = await fetch(`http://localhost:3001/profileEditBiography/${email}/${password}`,{
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/ProfilePage";
        }
        catch (err) {
            console.error(err.message);
        } 
    }

    //edit name function 

    const updateName = async e => {
        e.preventDefault();
        try {
            const body = { name };
            const response = await fetch(`http://localhost:3001/profileEditName/${email}/${password}`,{
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/ProfilePage";
        }
        catch (err) {
            console.error(err.message);
        } 
    }

    //get the user profile details 

    const getProfileDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3001/profileGetInfo/${email}/${password}`);
            const jsonData = await response.json(); 
            setUserInformation(jsonData);

            const test = userInformation.visibility;
            if (test) 
            {
                setVisibility("Public");
            } 
            else {
                setVisibility("Private");
            }

            console.log("visibility", visibility)
            console.log("userInformation", userInformation);
        }
        catch (err) {
            console.error(err.message);
        }
    }

    useEffect (() => {
        setEmail(getCookie('email')); 
        setPassword(getCookie('password'));
        getProfileDetails();
        setUserUID(getCookie('uid'));
        console.log(userUID);
        
    },[email==""&&password=="", name != "", bio != "", updatedVisibility != ""]);

    return (
        <body>
            {/* Navigation bar */}
            <Fragment>
                <nav class="navbar navbar-expand-sm navbar-light fixed-top">
        `            <div class="container-fluid">
                        <a class="navbar-brand" href="/ProfilePage">
                            <img src="/images/placeholder.jpg" style={{width:"40px"}} class="rounded-pill"/>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="mynavbar">
                            <ul class="navbar-nav me-auto">
                                <li class="nav-item">
                                <a class="nav-link" href="/Default">Home</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0)">Friends</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0)">Community</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0)">Marketplace</a>
                                </li>
                            </ul>
                            <form class="d-flex text-center ">
                                <input class="form-control me-4" type="text" placeholder="Search"/>
                                <div>
                                <button class="btn btn-primary" type="button"
                                style = {{
                                    background: 'linear-gradient(to right,  #a0d7fa, #474dff)',
                                    color: 'white',
                                    borderRadius: '5px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    marginRight: '130px',
                                    width: '100px',
                                    }}
                                >
                                    Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>
            </Fragment>

            <br/>

            {/* Header */}
            <Fragment>
                <div class="container-fluid bg-light bg-gradient">
                    <div class="text-center mt-5">
                        <form action="upload.php" method="post" encType="multipart/form-data"> 
                            <label for="filetoupload">
                                <div class="profile-pic">
                                <img src="/images/placeholder.jpg" class="profile-pic"/>
                                    <span>Change Image</span>
                                </div>
                            </label>
                            <input type="File" name="filetoupload" id="filetoupload"/>
                        </form>
                        <h1 className = "fw-bold display-5 text-center">
                            <label placeholder='Name'>{userInformation.name}</label>
                        </h1>
                    </div>
                    <div class="text-center mt-3"> 
                        <label placeholder='Friends'>{userInformation.friend_count} friends</label>
                    </div>
                    <hr></hr>
                    <div>
                        <nav class="navbar navbar-expand-sm">
                            <div class="collapse navbar-collapse" id="mynavbar">
                                <ul class="navbar-nav me-auto">
                                    <li class="nav-item">
                                    <a class="nav-link" href="/Home">Posts</a>
                                    </li>
                                    <li class="nav-item">
                                    <a class="nav-link" href="javascript:void(0)">About</a>
                                    </li>
                                    <li class="nav-item">
                                    <a class="nav-link" href="javascript:void(0)">Friends</a>
                                    </li>
                                </ul>
                                <form class="d-flex">
                                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editNameModal"
                                    style = {{
                                    background: 'linear-gradient(to right,  #cba0fa, #9a47ff)',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    marginRight: '20px',
                                    marginBottom: '10px',
                                    width: '120px',
                                    height: '45px',
                                    }}
                                    >
                                    Edit Name
                                    </button>
                                </form>
                            </div>
                        </nav>
                    </div>
                </div>
            </Fragment>

            <br/><br/><br/><br/><br/><br/><br/>

            {/* Body */}
            <Fragment>
                <div class="container bg-light bg-gradient mt-5" style={{top:"50%", left:"50%", transform: "translate(0%, -50%)", position:"left"}}>
                    <label id="ProfileIntro" class="fw-bold fs-4">Intro</label>
                    <br/>
                    <br/>

                    <label id="ProfileBiography" class="text-center"  
                    style={{ fontSize: '19px', color: 'blue'}}>{userInformation.biography}</label>
                    <br/>
                    <br/>
                    <br/>

                    <div class="text-left">
                        <img src="images/mail.jpg" style={{width:"3%"}} class="rounded"/>
                        <label id="ProfileEmail">&nbsp;{userInformation.email}</label>
                    <br/>
                        <img src="images/dob.png" style={{width:"3%"}} class="rounded"/>
                        <label id="ProfileDOB" class="mt-3">&nbsp;{userInformation.date_of_birth}</label>
                    <br/>
                        <img src="images/visibility.jpg" style={{width:"3%"}} class="rounded"/>
                        <label id="ProfileVisibilty" class="mt-3">&nbsp;{visibility}</label>
                    <br/>
                        <img src="images/post.png" style={{width:"3%"}} class="rounded"/>
                        <label id="ProfilePostCount" class="mt-3">&nbsp;{userInformation.post_count} posts</label>
                    </div>

                    <div style = {{ display: 'flex', justifyContent: 'center'}}>
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editBioModal"
                        style = {{
                            background: 'linear-gradient(to right, #FFA07A, #FF6347)',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            marginLeft: '90px',
                            marginBottom: '20px',
                            width: '190px',
                            height: '45px',
                        }}
                        >
                        Edit Bio
                        </button>

                    {/* <div class="text-center"> */}
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editDetailModal"
                        style = {{
                            background: 'linear-gradient(to right, #FFA07A, #FF6347)',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            marginLeft: '80px',
                            marginBottom: '20px',
                            width: '190px',
                            height: '45px',
                            }}
                        >
                        Edit Details
                        </button>
                    {/* </div> */}
                    </div>
                </div>
            </Fragment>

            {/* Modal for edit name */}
            <div class="modal" id="editNameModal" tabindex="-1" aria-labelledby="editNameModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="editNameModalLabel">Edit name</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Please insert a New Name</p>
                            <label for="users-name" class="form-label">Your new name: </label>
                            <input type="text" class="form-control" id="modal-name" placeholder="e.g. Anonymous" onChange={e => setName(e.target.value)}/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-bs-dismiss="modal" id="closeNameBtn"
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
                                width: '145px',
                                height: '45px',
                                }}
                            >
                            Close
                            </button>
                            
                            <button type="button" class="btn btn-primary" onClick={e => updateName(e)}
                            style = {{
                                background: 'linear-gradient(to right, #cba0fa, #9a47ff)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                marginRight: '5px',
                                width: '145px',
                                height: '45px',
                                }}
                            >
                            Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for edit bio */}
            <div class="modal" id="editBioModal" tabindex="-1" aria-labelledby="editBioLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="editBioLabel">Edit bio</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Please insert a New Bio</p>
                            <label for="users-name" class="form-label">Your new bio: </label>
                            <input type="text" class="form-control" id="modal-name" placeholder="e.g. Just a guy trying to get by." onChange={e => setBio(e.target.value)}/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-bs-dismiss="modal" id="closeNameBtn"
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
                                width: '145px',
                                height: '45px',
                                }}
                            >
                            Close
                            </button>
                            <button type="button" class="btn btn-primary" onClick={e => updateBio(e)}
                            style = {{
                                background: 'linear-gradient(to right, #cba0fa, #9a47ff)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                marginRight: '5px',
                                width: '145px',
                                height: '45px',
                                }}
                            >
                            Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for edit details */}
            <div class="modal" id="editDetailModal" tabindex="-1" aria-labelledby="editDetailModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="editDetailModalLabel">Edit Details</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Please enter new options for Intro</p>
                            <label for="users-email" class="form-label fw-bold">Email</label>
                            <input type="text" class="form-control" id="modal-email" placeholder="e.g. Update email" onChange={e => setUpdateEmail(e.target.value)}/>
                            <br/>
                            <button type="button" class="btn btn-primary" onClick={e => updateEmail(e)}
                            style = {{
                                background: 'linear-gradient(to right, #cba0fa, #9a47ff)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                marginRight: '5px',
                                width: '145px',
                                height: '45px',
                                }}
                            >
                            Save changes
                            </button>

                            <br/><br/>
                            <label for="users-visibility" class="form-label fw-bold">Visibility</label>
                            <input type="text" class="form-control" id="modal-visibility" placeholder="e.g. Private/Public" onChange={e => setUpdateVisibility(e.target.value)}/>
                            <br/>
                            <button type="button" class="btn btn-primary" onClick={e => updateVisibility(e)}
                            style = {{
                                background: 'linear-gradient(to right, #cba0fa, #9a47ff)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                marginRight: '5px',
                                width: '145px',
                                height: '45px',
                                }}
                            >
                            Save changes
                            </button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-bs-dismiss="modal" id="closeNameBtn"
                            style = {{
                                background: 'linear-gradient(to right, #FFA07A, #FF6347)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                marginRight: '5px',
                                width: '145px',
                                height: '45px',
                                }}
                            >
                            Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
};
export default ProfilePage;