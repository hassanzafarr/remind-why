/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { replyToCustomer } from "src/Services/Auth.service";
import { toast } from "react-toastify";

export const FeedbackTable = (props) => {
  const { items = [], onPageChange = () => {}, page = 0, count = 0 } = props;

  const [openModal, setOpenModal] = useState(false);
  const [modalFeedback, setModalFeedback] = useState(null);
  const [reply, setReply] = useState("");
  const [modalMode, setModalMode] = useState("view");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const replySubject = "Your Feedback";

  const handleOpenViewModal = (feedback) => {
    setModalFeedback(feedback);

    setModalMode("view");
    setOpenModal(true);
  };

  const handleOpenReplyModal = (feedback) => {
    setModalFeedback(feedback);

    setModalMode("reply");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setModalFeedback(null);
    setReply("");
    setOpenModal(false);
  };

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleReplySubmit = async () => {
    try {
      const userEmail = modalFeedback.user.auth.identifier;
      setIsSubmitting(true);
      await replyToCustomer(userEmail, replySubject, reply);
      setIsSubmitting(false);
      handleCloseModal();
      toast.success("Email Sent!");
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Message</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.data?.map((feedback) => (
                <TableRow hover key={feedback._id}>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Typography variant="subtitle2">{feedback?.user?.fullName}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{feedback.subject}</TableCell>
                  <TableCell>{feedback.message}</TableCell>
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenViewModal(feedback)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleOpenReplyModal(feedback)}
                      >
                        Reply
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        page={page}
        labelRowsPerPage=""
        rowsPerPage={0}
        rowsPerPageOptions={[]}
        labelDisplayedRows={({ from, to, count }) => {
          return `${items.currentPage} of ${items.totalPages}`;
        }}
      />

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {modalMode === "view" ? "Feedback Details" : "Reply to Feedback"}
          </Typography>
          {modalFeedback && (
            <>
              {modalMode === "view" && (
                <>
                  <Typography variant="subtitle1">Subject: {modalFeedback.subject}</Typography>
                  <Typography variant="body1">Message: {modalFeedback.message}</Typography>
                  {modalFeedback.images && modalFeedback.images.length > 0 && (
                    <Box mt={2}>
                      <Typography variant="subtitle1">Images:</Typography>
                      <Box sx={{ display: "flex", marginTop: 1, flexDirection: "column" }}>
                        {modalFeedback.images.map((image) => (
                          <img
                            key={image._id}
                            src={`https://remindwhy-api.thesuitchstaging.com/public/uploads/${image.file}`}
                            alt={`Image ${image._id}`}
                            style={{
                              maxWidth: 100,
                              maxHeight: 100,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </>
              )}
              {modalMode === "reply" && (
                <TextField
                  label="Reply"
                  // variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={reply}
                  onChange={handleReplyChange}
                />
              )}
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button onClick={handleCloseModal} color="primary" mr={1}>
                  Close
                </Button>
                {modalMode === "reply" && (
                  <Button
                    onClick={handleReplySubmit}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Reply"}
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Card>
  );
};

FeedbackTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  page: PropTypes.number,
};
