import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ListBulletIcon from "@heroicons/react/24/solid/ListBulletIcon";
import Feed from "@heroicons/react/24/solid/ChatBubbleOvalLeftEllipsisIcon";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  CardActions,
  Divider,
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
  Button,
} from "@mui/material";
import { getFeedbacks } from "src/Services/Auth.service";
import Link from "next/link";
export const OverviewTasksProgress = (props) => {
  const { value, sx } = props;

  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFeedbacks();
        setFeedback(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);
  return (
    <Card sx={{ ...sx, padding: 0, margin: 0 }}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
          mb={2}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" gutterBottom variant="overline">
              No of feedbacks
            </Typography>
            <Typography variant="h4">{feedback.length}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <Feed />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Stack spacing={1}>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end", margin: 0, padding: 0 }}>
            <Link href="/feedback" style={{ color: "black" }}>
              <Button
                color="inherit"
                endIcon={
                  <SvgIcon fontSize="small">
                    <ArrowRightIcon />
                  </SvgIcon>
                }
                size="small"
              >
                See all feedbacks
              </Button>
            </Link>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTasksProgress.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
