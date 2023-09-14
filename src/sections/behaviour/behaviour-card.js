import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import {
  deleteBehaviour,
  editBehavior,
  updateQuestions,
  getBehaviour,
} from "src/Services/Auth.service";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  CardMedia,
  TextField,
} from "@mui/material";

export const BehaviorsCard = ({ behavior, onUpdate, onDeleteBehavior }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [behaviors, setBehaviors] = useState([]);
  const [editedTitle, setEditedTitle] = useState(behavior.title);
  const [editedImage, setEditedImage] = useState(behavior.image);

  const [editedConsQuestions, setEditedConsQuestions] = useState(
    behavior.questions.filter((question) => question.questionType === "cons")
  );

  const [editedProsQuestions, setEditedProsQuestions] = useState(
    behavior.questions.filter((question) => question.questionType === "pros")
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      await deleteBehaviour(behavior._id);
      onDeleteBehavior(behavior._id);
      toast.success("Behavior deleted successfully!");

      setIsSubmitting(false);
    } catch (error) {
      toast.error("Failed to delete behavior");
      console.error("Error deleting behavior:", error);
    }
  };

  const handleView = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    // setEditedTitle(behavior.title);
    // setEditedImage(behavior.image);
    // setEditedConsQuestions(
    //   behavior.questions.filter((question) => question.questionType === "cons")
    // );
    // setEditedProsQuestions(
    //   behavior.questions.filter((question) => question.questionType === "pros")
    // );
  };

  const handleProsQuestionChange = (event, index) => {
    const newProsQuestions = [...editedProsQuestions];
    newProsQuestions[index].question = event.target.value;
    setEditedProsQuestions(newProsQuestions);
  };
  const handleConsQuestionChange = (event, index) => {
    const newConsQuestions = [...editedConsQuestions];
    newConsQuestions[index].question = event.target.value;
    setEditedConsQuestions(newConsQuestions);
  };

  const handleUpdate = async () => {
    try {
      // Update behavior title and image
      setIsSubmitting(true);

      // await editBehavior(behavior._id, editedTitle, editedImage);
      await editBehavior(behavior._id, editedTitle);

      const updatedQuestions = editedConsQuestions.concat(editedProsQuestions);

      const updatedQuestionsArray = updatedQuestions.map((question) => ({
        questionId: question._id,
        question: question.question,
      }));

      await updateQuestions(behavior._id, updatedQuestionsArray);

      toast.success("Behavior and questions updated successfully!");
      setIsSubmitting(false);

      onUpdate({ ...behavior, title: editedTitle });
      setIsEditModalOpen(false);
      // Update the behaviors state with the new data
    } catch (error) {
      toast.error("Failed to update behavior and questions");
      console.error("Error updating behavior and questions:", error);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent
        sx={{
          p: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <CardMedia
            component="img"
            alt={`Image for ${behavior.title}`}
            height="150"
            image={behavior.image}
            sx={{
              borderRadius: 1,
            }}
          />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {behavior.title}
        </Typography>
        <Typography align="center" variant="body1">
          This behavior is related to {behavior.title}.
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button variant="outlined" color="primary" onClick={handleView}>
            View
          </Button>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button variant="outlined" color="secondary" onClick={handleEdit}>
            Edit
          </Button>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button variant="outlined" color="error" onClick={handleDelete} disabled={isSubmitting}>
            {isSubmitting ? "...." : "Delete"}
          </Button>
        </Stack>
      </Stack>
      {/* Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 1,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom paragraph>
            Behavior Details
          </Typography>

          <CardContent>
            <Typography variant="h6 " gutterBottom paragraph>
              Questions:
            </Typography>
            <Box sx={{ maxHeight: 250, overflow: "auto" }}>
              <Typography variant="h6">Pros:</Typography>

              <List>
                {behavior.questions.map((question) => {
                  if (question.questionType === "pros") {
                    return (
                      <ListItem key={question._id}>
                        <ListItemText primary={`Q. ${question.question}`} />
                      </ListItem>
                    );
                  }
                })}
              </List>
              <Typography variant="h6">Cons:</Typography>
              <List>
                {behavior.questions.map((question) => {
                  if (question.questionType === "cons") {
                    return (
                      <ListItem key={question._id}>
                        <ListItemText primary={`Q. ${question.question}`} />
                      </ListItem>
                    );
                  }
                })}
              </List>
            </Box>
          </CardContent>

          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Edit Modal */}
      <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 1,
            p: 4,
            minWidth: 600,
          }}
        >
          <Typography variant="h6" gutterBottom paragraph>
            Edit Behavior
          </Typography>
          <TextField
            label="Title"
            fullWidth
            paragraph
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
            sx={{
              marginBottom: "10px",
            }}
          />
          {/* <input
            type="file"
            accept="image/*"
            onChange={(event) => setEditedImage(event.target.files[0])}
            paragraph
          /> */}

          <Typography
            variant="h6"
            sx={{
              marginTop: "10px",
            }}
          >
            Edit Pros Questions:
          </Typography>
          <List>
            {editedProsQuestions.map((question, index) => (
              <ListItem key={index}>
                <TextField
                  fullWidth
                  label={`Pros Question ${index + 1}`}
                  value={question.question}
                  onChange={(event) => handleProsQuestionChange(event, index)}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Edit Cons Questions:</Typography>
          <List>
            {editedConsQuestions.map((question, index) => (
              <ListItem key={index}>
                <TextField
                  fullWidth
                  label={`Cons Question ${index + 1}`}
                  value={question.question}
                  onChange={(event) => handleConsQuestionChange(event, index)}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button onClick={handleCloseEditModal} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating" : "Update"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};
BehaviorsCard.propTypes = {
  behavior: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    questions: PropTypes.shape({
      pros: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          question: PropTypes.string.isRequired,
        })
      ).isRequired,
      cons: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          question: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};
