import React, {useContext, useEffect} from 'react';
import PostFinder from '../apis/PostFinder';
import { PostsContext } from '../context/PostsContext';
import { useNavigate } from 'react-router-dom';

function PostList() {
    const {posts, setPosts} = useContext(PostsContext);
    let navigate = useNavigate(); 
    
    useEffect(() => {
        async function fetchData(){
            try{
                const response = await PostFinder.get("/");
                setPosts(response.data.data.posts);
            } catch(err) {console.log(err);}
        };
        fetchData();
    }, [setPosts]);

    const handleDelete = async (e, pid) => {
        e.stopPropagation();
        try {
            const response = await PostFinder.delete(`/${pid}`);
            console.log(response );

            setPosts(posts.filter(post => {
                return post.pid !== pid;
            }));
        } catch(err) {console.log(err);}
    };

    const handleUpdate = (e, pid) => {
        e.stopPropagation();
        navigate(`/posts/${pid}/update`);
    };

    const handlePostSelect = (e, pid) => {
        navigate(`/posts/${pid}`);
    };

  return (
    <div className="list-group">
        <table className="table table-hover table-default">
            <thead>
                <tr className="table-primary">
                    <th scope="col">Caption</th>
                    <th scope="col">Date</th>
                    <th scope="col">Comments</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {posts && posts.map(post => {
                    return (
                        <tr onClick={(e) => handlePostSelect(e,post.pid)} key={post.pid}>
                            <td>{post.caption}</td>
                            <td>{post.post_date}</td>
                            <td>{post.count || 0}</td>
                            <td><button onClick={(e) => handleUpdate(e, post.pid)} className="btn btn-warning">Update</button></td>
                            <td><button onClick={(e) => handleDelete(e, post.pid)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )
};

export default PostList;