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
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import PencilSquareIcon from "@heroicons/react/24/solid/PencilSquareIcon";

export const UsersTable = (props) => {
  const { items = [], onPageChange = () => {}, page = 0, count = 0, pageData = [] } = props;

  const [openModal, setOpenModal] = useState(false);
  const [User, setModalUser] = useState(null);

  const handleOpenViewModal = (user) => {
    setModalUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setModalUser(null);
    setOpenModal(false);
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((user) => (
                <TableRow hover key={user._id}>
                  <TableCell>{user.profile.fullName}</TableCell>
                  <TableCell>{user.profile.auth.identifier}</TableCell>
                  <TableCell>{user.profile.gender}</TableCell>
                  <TableCell>{user.profile.city}</TableCell>
                  <TableCell>{new Date(user.profile.dob).toLocaleDateString()}</TableCell>

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
                        onClick={() => handleOpenViewModal(user)}
                      >
                        View
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
        rowsPerPageOptions={[]}
        labelDisplayedRows={({ from, to, count }) => {
          return `${pageData.currentPage} of ${pageData.totalPages}`;
        }}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          borderRadius: "25px",
        }}
      >
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
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            User Details
          </Typography>
          {User && (
            <>
              <Typography variant="subtitle1">Full Name: {User.profile.fullName}</Typography>
              <Typography variant="subtitle1">Gender: {User.profile.gender}</Typography>
              <Typography variant="subtitle1">
                Date of Birth: {new Date(User.profile.dob).toLocaleDateString()}
              </Typography>
            </>
          )}
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCloseModal} color="primary" mr={1}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};

UsersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  page: PropTypes.number,
};
