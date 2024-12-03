import { Box } from "@mui/material";
import { useEffect, useState } from "react"
import { Post } from "../Post/Post";
import { Post as PostType } from "../../models";
import axios from "axios";
import { CreatePostModal } from "../CreatePostModal/CreatePostModal";
import { PostView } from "../PostView/PostView";

export const Posts = () => {
    const [posts, setPosts] = useState([] as PostType []);
    const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

    const getposts = () => {
        axios.get('http://localhost:8080/api/posts').then((res) => {setPosts(res.data)});
    }

    const handleSelectedPostClick = (post: PostType) => {
        setSelectedPost(post);
    }

    useEffect(() => {
        getposts();
    }, []);

    return (
        <Box sx={{width: '400px', mx: 'auto', mt: '50px'}}>
            <CreatePostModal getposts={getposts} />
            <PostView post={selectedPost} setPost={setSelectedPost} />
            {
                posts.map(post => (
                    <Post post={post} key={post.id} handleSelectedPostClick={handleSelectedPostClick} />
                ))
            }
        </Box>
    )
}