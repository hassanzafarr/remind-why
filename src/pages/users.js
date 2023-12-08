import { React, useState, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Head from "next/head";

import { Box, Button, Container, Stack, SvgIcon, Typography, Table, Modal } from "@mui/material";
import { getUsers } from "src/Services/Auth.service";
import { useRouter } from "next/navigation";
import Loader from "src/components/Loader";
import { UsersTable } from "src/sections/users/users-table";
const Page = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [pageData, setPageData] = useState([]);
  const totalUsersCount = 3;
  const islogin = JSON.parse(typeof window !== "undefined" && localStorage.getItem("isLogin"));
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
        const response = await getUsers(page);
        setPageData(response.data);

        const usersWithFullName = response.data.data.filter((user) => user.profile.fullName);
        console.log(usersWithFullName, "Users With Filter");
        setUsers(usersWithFullName);
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
        <title>Users | Remind Why</title>
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
                <Typography variant="h4">Users</Typography>
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
              <UsersTable
                count={totalUsersCount}
                items={users}
                page={page}
                onPageChange={handlePageChange}
                pageData={pageData}
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
