import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './routers/Home';
import PostDetailPage from './routers/PostDetailPage';
import UpdatePage from './routers/UpdatePage';
import { PostsContextProvider } from './context/PostsContext';


const App = () => {
    return(
        <PostsContextProvider>
            <div className="container">
        <Router>
            <Routes>
                <Route path ="/" element = {<Home/>}/>
                <Route path ="/posts/:id/update" element = {<UpdatePage/>}/>
                <Route path ="/posts/:id" element = {<PostDetailPage/>}/>
            </Routes>
        </Router>
    </div>
        </PostsContextProvider>
    );
};

export default App;