import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Post } from "../Post/Post";
import { Post as PostType } from "../../models";
import axios from "axios";
import { CreatePostModal } from "../CreatePostModal/CreatePostModal";
import { PostView } from "../PostView/PostView";

export const Posts = () => {
  const [posts, setPosts] = useState([] as PostType[]);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getposts = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/api/posts")
      .then((res) => {
        setPosts(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleSelectedPostClick = (post: PostType) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    getposts();
  }, []);

  return (
    <Box sx={{ width: "400px", mx: "auto", mt: "50px" }}>
      <CreatePostModal getposts={getposts} />
      <PostView post={selectedPost} setPost={setSelectedPost} />
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        posts.map((post) => (
          <Post
            post={post}
            key={post.id}
            handleSelectedPostClick={handleSelectedPostClick}
          />
        ))
      )}
    </Box>
  );
};
