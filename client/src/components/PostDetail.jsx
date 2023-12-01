import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostsContext } from '../context/PostsContext';
import PostFinder from '../apis/PostFinder';
import CommentList from './CommentList';
import AddComment from './AddComment';

function PostDetail() {
    const {id} = useParams();
    const {selectedPost, setSelectedPost} = useContext(PostsContext);
    const image_URL = "http://localhost:3001/posts/image/" + id;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await PostFinder.get(`/${id}`);
          setSelectedPost(response.data.data);
        } catch(err) {console.log(err);}
      };
      fetchData();
    },[id ,setSelectedPost]);

    return (
    <div>
      <h1 className="text-center display-1">{selectedPost && selectedPost.post.caption}</h1>
      <div className="text-center">
      <img src={image_URL+'?n=' + new Date().getSeconds()} className="img-fluid-center" style={{width:"100%"}} alt="Empty"/>
      </div>
      <div className="mt-3">
        <AddComment/>
      </div>
      <div className="mt-3">
        <CommentList comments={selectedPost && selectedPost.comments}/>
      </div>
    </div>
  );
};

export default PostDetail;