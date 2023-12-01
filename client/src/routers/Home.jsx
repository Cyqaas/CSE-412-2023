import React from 'react';
import Header from '../components/Header';
import AddPost from '../components/AddPost';
import PostList from '../components/PostList';

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