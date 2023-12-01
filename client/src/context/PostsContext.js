import React, {useState, createContext} from 'react';


export const PostsContext = createContext();

export const PostsContextProvider = props => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    return(
        <PostsContext.Provider value={{ posts, setPosts, selectedPost, setSelectedPost }}>
            {props.children}
        </PostsContext.Provider>
    );
};
