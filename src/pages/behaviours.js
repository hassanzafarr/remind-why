import { React, useCallback, useState, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Head from "next/head";
import { toast } from "react-toastify";

import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useRouter } from "next/navigation";
import Loader from "src/components/Loader";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  TextField,
  Modal,
  Unstable_Grid2 as Grid,
  CardHeader,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { getBehaviour, addBehavior, addQuestion } from "src/Services/Auth.service";
import { BehaviorsCard } from "src/sections/behaviour/behaviour-card";
import ArrowUpTrayIcon from "@heroicons/react/24/solid/ArrowUpTrayIcon";
import Upload from "src/components/upload";
// import AttachFile from "@mui/icons-material/AttachFile";
const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [behaviors, setBehaviors] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [proQuestion1, setProQuestion1] = useState("");
  const [proQuestion2, setProQuestion2] = useState("");
  const [conQuestion1, setConQuestion1] = useState("");
  const [conQuestion2, setConQuestion2] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const deleteBehavior = (behaviorIdToDelete) => {
    setBehaviors((prevBehaviors) =>
      prevBehaviors.filter((behavior) => behavior._id !== behaviorIdToDelete)
    );
  };

  const updateBehavior = (updatedBehavior) => {
    // Find the index of the updated behavior in the behaviors array
    const behaviorIndex = behaviors.findIndex((b) => b._id === updatedBehavior._id);

    if (behaviorIndex !== -1) {
      // Create a new array with the updated behavior
      const updatedBehaviors = [...behaviors];
      updatedBehaviors[behaviorIndex] = updatedBehavior;

      // Update the behaviors state with the new array
      setBehaviors(updatedBehaviors);
    }
  };

  useEffect(() => {
    const islogin = JSON.parse(typeof window !== "undefined" && localStorage.getItem("isLogin"));
    if (!islogin) {
      setIsLoading(true);
      return router.push("/login");
    }
  }, []);

  const fetchBehaviours = async () => {
    try {
      const response = await getBehaviour();
      setBehaviors(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBehaviours();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setProQuestion1("");
    setProQuestion2("");
    setConQuestion1("");
    setConQuestion2("");
    setSelectedImage(null);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const reqFields = [title, selectedImage, proQuestion1, proQuestion2, conQuestion1, conQuestion2];

  const handleAddBehavior = async () => {
    try {
      if (reqFields.includes("")) {
        return toast.error("Please fill in all fields");
      }

      setIsSubmitting(true);

      const behaviorResponse = await addBehavior(title, selectedImage);

      const proQuestion1Response = await addQuestion(
        behaviorResponse.data._id,
        proQuestion1,
        "pros"
      );
      const proQuestion2Response = await addQuestion(
        behaviorResponse.data._id,
        proQuestion2,
        "pros"
      );
      const conQuestion1Response = await addQuestion(
        behaviorResponse.data._id,
        conQuestion1,
        "cons"
      );
      const conQuestion2Response = await addQuestion(
        behaviorResponse.data._id,
        conQuestion2,
        "cons"
      );

      toast.success("Behavior Added successfully!");

      setIsSubmitting(false);

      handleCloseModal();

      setBehaviors((prevBehaviors) => [...prevBehaviors, behaviorResponse.data]);
      fetchBehaviours();
      // <window.location.reload();>
    } catch (error) {
      toast.error("Failed to Add behavior");
      console.error("Error adding behavior:", error.message);
    }
  };
  return (
    <>
      <Head>
        <title>Behaviours | Remind Why</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Behaviours</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleOpenModal}
                >
                  Add
                </Button>
              </div>
            </Stack>
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader />
              </Box>
            ) : (
              <Grid container spacing={3}>
                {behaviors.map((behavior) => (
                  <Grid xs={12} md={6} lg={4} key={behavior._id}>
                    <BehaviorsCard
                      behavior={behavior}
                      onUpdate={updateBehavior}
                      onDeleteBehavior={deleteBehavior}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Stack>
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "16px",
                background: "#ffffff",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Behaviour Name"
                  name="Title"
                  onChange={handleTitleChange}
                  required
                  value={title}
                />
                <CardHeader
                  title="Pro Questions"
                  sx={{
                    padding: "15px 10px 15px 0px",
                  }}
                />
                <TextField
                  fullWidth
                  label="Pro Question 1"
                  onChange={(event) => setProQuestion1(event.target.value)}
                  required
                  value={proQuestion1}
                  sx={{ marginBottom: "16px" }}
                />
                <TextField
                  fullWidth
                  label="Pro Question 2"
                  onChange={(event) => setProQuestion2(event.target.value)}
                  required
                  value={proQuestion2}
                />
                <CardHeader
                  title="Con Questions"
                  sx={{
                    padding: "15px 10px 15px 0px",
                  }}
                />
                <TextField
                  fullWidth
                  label="Con Question 1"
                  onChange={(event) => setConQuestion1(event.target.value)}
                  required
                  value={conQuestion1}
                  sx={{ marginBottom: "16px" }}
                />
                <TextField
                  fullWidth
                  label="Con Question 2"
                  onChange={(event) => setConQuestion2(event.target.value)}
                  required
                  value={conQuestion2}
                  sx={{ marginBottom: "16px" }}
                />
              </Grid>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Upload selectedImage={selectedImage} handleImageChange={handleImageChange} />
                <Stack direction="row">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddBehavior}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add Behavior"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleCloseModal}
                    sx={{ marginLeft: "8px" }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </div>
          </Modal>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
