import React, { useState } from 'react';
import PostFinder from '../apis/PostFinder';

function AddPost() {
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState();
    const today = new Date();
    const post_date = today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const response = await PostFinder.post("/", {
                caption,
                post_date
            });
            if(file !== undefined) {

                const URL = "/image/" + response.data.data.post.pid;
                const formdata = new FormData();
                formdata.append('image', file);
                await PostFinder.put(URL, formdata);
            }
            window.location.reload(true);
        } catch(err) {console.log(err);}
    }

  return (
    <div className="mb-4">
        <form action="">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <input value={caption} onChange={e => setCaption(e.target.value)} type="text" className="form-control" placeholder="caption"/>
                    </div>
                    <div className="col">
                        <input onChange={e => setFile(e.target.files[0])} type="file" className="form-control"/>
                    </div>
                    <div className="col-auto">
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary"
                        style = {{
                            background: 'linear-gradient(to right, #a0d7fa, #474dff)',
                            color: 'white',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            width: '100px',
                            height: '45px',
                        }}
                        >
                        Post
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
};

export default AddPost;