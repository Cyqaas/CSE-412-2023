import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostFinder from '../apis/PostFinder';

function UpdatePost() {
  let navigate = useNavigate();
    const {id} = useParams();
    const image_URL = "http://localhost:3001/posts/image/" + id;
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState();
    const today = new Date();
    const post_date = today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    

    useEffect(() => {
      const fetchData = async() => {
        try {
          const response = await PostFinder.get(`/${id}`);
          setCaption(response.data.data.post.caption);
        } catch(err){console.log(err);}
      };
      fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const updatedPost = await PostFinder.put(`/${id}`, {
        caption,
        post_date
      });
      console.log(updatedPost);

      if (file !== undefined){
        const formdata = new FormData();
        formdata.append('image', file);
        const response = await PostFinder.put(`/image/${id}`, formdata);
        console.log(response);
      }

      navigate(`/Home`);
    };
    
  return (
    <div>
      <form action="">
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="caption" className="form-Label">Caption</label>
            <input value={caption} onChange={e => setCaption(e.target.value)} id="caption" className="form-control" type="text" />
          </div>
          <div className="col-12">
            <label htmlFor="fileUploader" className="form-label">Image</label>
            <input onChange={e => setFile(e.target.files[0])} id="fileUploader" type="file" className="form-control"/>
          </div>
          <div className="col-12">
          <button onClick={handleSubmit} className="btn btn-primary"
          style={{
            background: 'linear-gradient(to right, #cba0fa, #9a47ff)',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100px',
            height: '45px',
          }}
          >
          Submit
          </button>
          </div>
          <div className="col-12 text-center">
          <img src={image_URL+'?n=' + today.getSeconds()} className="img-fluid" style={{width:"100%"}} alt="Empty"/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;