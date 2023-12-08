import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import Link from "next/link";
import Heart from "@heroicons/react/24/solid/HeartIcon";
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
import { getBehaviour } from "src/Services/Auth.service";
export const OverviewBudget = (props) => {
  const { sx } = props;

  const [behavior, setBehaviors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBehaviour();
        setBehaviors(response.data);
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
          <Stack spacing={2}>
            <Typography color="text.secondary" variant="overline">
              Total Behaviors
            </Typography>
            <Typography variant="h4">{behavior.length}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <Heart />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Stack spacing={1}>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end", margin: 0, padding: 0 }}>
            <Link href="/behaviours" style={{ color: "black" }}>
              <Button
                color="inherit"
                endIcon={
                  <SvgIcon fontSize="small">
                    <ArrowRightIcon />
                  </SvgIcon>
                }
                size="small"
              >
                See all behaviors
              </Button>
            </Link>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewBudget.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
