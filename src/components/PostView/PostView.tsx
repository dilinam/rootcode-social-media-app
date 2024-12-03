import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import { Post as PostType } from "../../models";
import { useState } from "react";
import { Post } from "../Post/Post";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const PostView = ({
  post,
  setPost,
}: {
  post: PostType | null;
  setPost: any;
}) => {
  const [comment, setComment] = useState("");

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8080/api/comments", {
        commentText: comment,
        post: { id: post?.id },
      });
      setComment("");
      const res = await axios.get(
        "http://localhost:8080/api/posts/" + post?.id
      );
      setPost(res.data);
    } catch (e) {
      alert(e);
    }
  };

  const handleClose = () => {
    setPost(null);
  };

  return (
    <Modal
      open={post !== null}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {post?.title}
        </Typography>
        <Post post={post} />
        {post?.comments.map((comment) => (
          <Card
            key={comment.id}
            sx={{ minWidth: 275, my: 2, backgroundColor: colors.grey[100] }}
          >
            <CardContent>
              <Typography gutterBottom sx={{ fontSize: 12 }}>
                {comment.commentText}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <TextField
          sx={{ mt: 3 }}
          label="Comment"
          multiline
          rows={2}
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
          fullWidth
        />
        <Button
          sx={{ mt: 2 }}
          fullWidth
          variant="contained"
          color="success"
          onClick={handleSave}
          disabled={comment.trim() === ""}
        >
          Comment
        </Button>
      </Box>
    </Modal>
  );
};
