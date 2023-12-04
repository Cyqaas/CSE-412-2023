import React, { useEffect } from 'react';
import Header from '../components/Header';
import AddPost from '../components/AddPost';
import PostList from '../components/PostList';
import getCookie from './cookieHelper';

const Home = () => {
  return (
    <div>
      <Header/>
      <AddPost/>
      <PostList/>
    </div>
  )
};

export default Home;