import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './routers/Home';
import PostDetailPage from './routers/PostDetailPage';
import UpdatePage from './routers/UpdatePage';
import { PostsContextProvider } from './context/PostsContext';
import InputLogin from './routers/login';
import SignUp from './routers/signup';
import DefaultPage from './routers/default';
import ProfilePage from './routers/ProfilePage';

const App = () => {
    return(
        <PostsContextProvider>
            <div className="container">
        <Router>
            <Routes>
            <Route path ="/" element = {<InputLogin/>}/>
                <Route path ="/posts/:id/update" element = {<UpdatePage/>}/>
                <Route path ="/posts/:id" element = {<PostDetailPage/>}/>
                <Route path ="/home" element = {<Home/>} />
                <Route path ="/signup" element = {<SignUp/>}/>
                <Route path ="/profilepage" element = {<ProfilePage/>}/>
                <Route path ="/default" element = {<DefaultPage/>}/>
                
            </Routes>
        </Router>
    </div>
        </PostsContextProvider>
    );
};

export default App;