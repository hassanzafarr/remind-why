import { React, useState, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Head from "next/head";

import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography, Table, Modal } from "@mui/material";
import { getSynopsis } from "src/Services/Auth.service";
import { useRouter } from "next/navigation";
import Loader from "src/components/Loader";
// import { SynoTable } from "src/sections/synopsis/synopsis-table";
import { SynoTable } from "src/sections/synopsis/synopsis-table";
const Page = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [synopsis, setSyno] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const islogin = JSON.parse(typeof window !== "undefined" && localStorage.getItem("isLogin"));
    if (!islogin) {
      setIsLoading(true);
      return router.push("/login");
    }
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getSynopsis(page);

        setSyno(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page]);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Head>
        <title>Synopsis | Remind Why</title>
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
                <Typography variant="h4">Synopsis</Typography>
              </Stack>
              <div></div>
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
              <SynoTable
                // count={count}
                items={synopsis}
                page={page}
                onPageChange={handlePageChange}
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
