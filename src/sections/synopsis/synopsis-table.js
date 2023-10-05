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

export const SynoTable = (props) => {
  const { items = [], onPageChange = () => {}, page = 0, count = 0 } = props;

  const [openModal, setOpenModal] = useState(false);
  const [Syno, setModalSyno] = useState(null);

  const handleOpenViewModal = (synopsis) => {
    setModalSyno(synopsis);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setModalSyno(null);
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
                <TableCell>Behavior</TableCell>
                <TableCell>Alarm Time</TableCell>
                <TableCell>Answer</TableCell>

                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.data?.map((synopsis) => (
                <TableRow hover key={synopsis._id}>
                  <TableCell>{synopsis.user.fullName}</TableCell>
                  <TableCell>{synopsis.behavior.title}</TableCell>
                  <TableCell>{synopsis.alarm.alarmTime}</TableCell>
                  <TableCell>{synopsis.answer}</TableCell>

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
                        onClick={() => handleOpenViewModal(synopsis)}
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
          return `${items.currentPage} of ${items.total_pages}`;
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
            Synopsis Details
          </Typography>
          {Syno && (
            <>
              <Typography variant="subtitle1">Full Name: {Syno.answer}</Typography>
              {/* <Typography variant="subtitle1">Gender: {Syno.profile.gender}</Typography>
              <Typography variant="subtitle1">
                Date of Birth: {new Date(Syno.profile.dob).toLocaleDateString()}
              </Typography> */}
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

SynoTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  page: PropTypes.number,
};
