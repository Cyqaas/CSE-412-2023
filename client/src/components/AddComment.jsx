import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PostFinder from '../apis/PostFinder';

function AddComment() {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const today = new Date();
    const comment_date = today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    
    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            await PostFinder.post(`/${id}/addcomment`, {
                name,
                text: comment,
                comment_date
            });
            window.location.reload(true);
        } catch(err) {console.log(err);}
    }

  return (
    <div className="g-3">
        <form action="">
            <div className="row g-3">
                <div className="col-12">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" type="text" className="form-control" />
                </div>
                <div className="col-12">
                    <label htmlFor="comment">Comment</label>
                    <textarea value={comment} onChange={e => setComment(e.target.value)} id="comment" className="form-control"></textarea>
                </div>
                <div className="col-12">
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    </div>
  );
};

export default AddComment;