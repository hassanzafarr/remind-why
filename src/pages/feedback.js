/* eslint-disable react/jsx-max-props-per-line */
import { React, useCallback, useMemo, useState, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Head from "next/head";

import { Box, Button, Container, Stack, SvgIcon, Typography, Table, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import Loader from "src/components/Loader";
import { getFeedbacks } from "src/Services/Auth.service";
import { FeedbackTable } from "src/sections/feedback/feedback-table";

const Page = () => {
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const islogin = JSON.parse(typeof window !== "undefined" && localStorage.getItem("isLogin"));
    if (!islogin) {
      setIsLoading(true);
      return router.push("/login");
    }
  }, []);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsLoading(true);
        const response = await getFeedbacks(page);
        setFeedback(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, [page]);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Head>
        <title>Feedbacks | Remind Why</title>
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
                <Typography variant="h4">Feedbacks</Typography>
              </Stack>
            </Stack>
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // height: "100vh",
                }}
              >
                <Loader />
              </Box>
            ) : (
              <FeedbackTable
                count={feedback.length || 0}
                items={feedback}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={""}
                rowsPerPage={0}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
