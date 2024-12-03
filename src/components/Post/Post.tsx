import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Post as PostType } from "../../models";

export const Post = ({ post, handleSelectedPostClick }: { post: PostType, handleSelectedPostClick?: any }) => {
  return (
    <Card sx={{ minWidth: 275, my: 2, cursor: handleSelectedPostClick? 'pointer': 'default' }} onClick={() => {handleSelectedPostClick && handleSelectedPostClick(post)}}>
      <CardContent>
        <Typography gutterBottom sx={{ fontSize: 18 }}>
          {post.title}
        </Typography>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {post.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography>{post.comments.length} Comments</Typography>
      </CardActions>
    </Card>
  );
};
