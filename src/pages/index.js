import Head from "next/head";
import { React, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Container,
  LinearProgress,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { OverviewBudget } from "src/sections/overview/overview-behaviour";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";

import { OverviewGender } from "src/sections/overview/overview-gender";
import { useRouter } from "next/navigation";
import BaseLayout from "src/layouts/BaseLayout";
import Logo from "../../public/assets/rem.png";
import { getUsers } from "src/Services/Auth.service";
import Image from "next/image";
const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [maleUsers, setMaleUsers] = useState([]);
  const [femaleUsers, setFemaleUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loginStatus =
      typeof window !== "undefined" ? JSON.parse(localStorage.getItem("isLogin")) : null;

    setIsLogin(loginStatus);

    if (loginStatus === null) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        const usersWithFullName = response.data.data.filter((user) => user?.profile?.fullName);
        setUsers(usersWithFullName);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (users) {
      const maleUsers = users.filter((user) => user?.profile?.gender?.toLowerCase() === "male");

      const femaleUsers = users.filter((user) => user?.profile?.gender?.toLowerCase() === "female");

      const totalUsers = users.length;
      const malePercentage = Math.trunc((maleUsers.length / totalUsers) * 100);
      const femalePercentage = Math.trunc((femaleUsers.length / totalUsers) * 100);
      console.log(malePercentage);
      setMaleUsers(malePercentage);
      setFemaleUsers(femalePercentage);
    }
  }, [users]);

  const monthlyUserCounts = Array(12).fill(0);

  users.forEach((user) => {
    const createdAtDate = new Date(user.createdAt);
    const month = createdAtDate.getMonth();
    monthlyUserCounts[month]++;
  });

  const chartData = [
    {
      name: "This Month",
      data: [],
    },
  ];

  monthlyUserCounts.forEach((count) => {
    chartData[0].data.push(count);
  });

  const Layout = isLogin ? DashboardLayout : BaseLayout;
  return (
    <>
      <Head>
        <title>Overview | Remind Why</title>
      </Head>
      <Layout>
        {isLogin && !isLoading ? (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              // py: 1,
            }}
          >
            <Container maxWidth="xl">
              <Stack spacing={1}>
                <Typography variant="h4">Dashboard</Typography>
                <Stack alignItems="center" direction="row" spacing={2}></Stack>
              </Stack>
              <Grid container spacing={3}>
                <Grid xs={12} sm={6} lg={4}>
                  <OverviewBudget sx={{ height: "90%", padding: 0 }} />
                </Grid>
                <Grid xs={12} sm={6} lg={4}>
                  <OverviewTotalCustomers
                    difference={16}
                    positive={false}
                    sx={{ height: "90%", padding: 0 }}
                    value={users}
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={4}>
                  <OverviewTasksProgress sx={{ height: "90%", padding: 0 }} value={75.5} />
                </Grid>

                <Grid xs={12} lg={8}>
                  <OverviewSales chartSeries={chartData} sx={{ height: "100%" }} />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                  <OverviewGender
                    chartSeries={[maleUsers, femaleUsers]}
                    labels={["Male", "Female"]}
                    sx={{ height: "100%" }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image src={Logo} width={200} priority alt="logo" />
              <LinearProgress
                sx={{
                  width: "100%",
                  marginTop: "25px",
                  color: "neutral.700",
                }}
              />
            </div>
          </Box>
        )}
      </Layout>
    </>
  );
};

export default HomePage;
