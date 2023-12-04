import React from 'react';

function Header() {
  return (
    <div>
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
                <br/><br/>
        <h1 className="font-weight-light display-1 text-center">
            Post Image
        </h1>
    </div>
  )
};

export default Header;