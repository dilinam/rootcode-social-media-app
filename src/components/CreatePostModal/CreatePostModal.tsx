import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

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

export const CreatePostModal = ({ getposts }: { getposts: any }) => {
  const [createPostModal, setCreatePostModal] = useState(false);
  const [title, setTile] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setCreatePostModal(false);
  };

  const handleSave = async () => {
    try {
      let error = false;
      if (title.trim() === "") {
        setTitleError("Title Canno be empty");
        error = true;
      }

      if (description.trim() === "") {
        setDescriptionError("Description Canno be empty");
        error = true;
      }

      if (error) return;

      setIsLoading(true);

      await axios.post("http://localhost:8080/api/posts", {
        title,
        description,
      });
      setTile("");
      setDescription("");
      setCreatePostModal(false);
      getposts();
    } catch (e) {
      alert(e);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        fullWidth
        color="success"
        onClick={() => {
          setCreatePostModal(true);
        }}
      >
        Create New Post
      </Button>
      <Modal
        open={createPostModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Post
          </Typography>
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            label="title"
            value={title}
            onChange={(event) => {
              setTile(event.target.value);
              setTitleError("");
            }}
            fullWidth
            error={titleError.trim() !== ""}
            helperText={titleError}
            disabled={isLoading}
          />
          <TextField
            sx={{ mt: 3 }}
            label="Description"
            multiline
            rows={2}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setDescriptionError("");
            }}
            fullWidth
            error={descriptionError.trim() !== ""}
            helperText={descriptionError}
            disabled={isLoading}
          />
          <Button
            sx={{ mt: 2 }}
            fullWidth
            variant="contained"
            color="success"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={25} /> : "Save"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
