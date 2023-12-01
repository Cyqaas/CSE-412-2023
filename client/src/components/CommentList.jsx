import React from 'react';

function CommentList({comments}) {
  return (
    <div className="table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col" style={{width: "10%"}}>Date</th>
                    <th scope="col" style={{width: "20%"}}>Name</th>
                    <th scope="col" style={{width: "70%"}}>Comment</th>
                </tr>
            </thead>
            <tbody>
                {comments && comments.map(comment => {
                    return(
                        <tr key={comment.cid}>
                            <th scope="row">{comment.comment_date}</th>
                            <td>{comment.name}</td>
                            <td>{comment.text}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  );
};

export default CommentList;