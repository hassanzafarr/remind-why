import React from "react";
import ArrowUpTrayIcon from "@heroicons/react/24/solid/ArrowUpTrayIcon";
import { InputAdornment, IconButton, Paper, SvgIcon, Typography } from "@mui/material";
const Upload = ({ selectedImage, handleImageChange }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#C74545",
        color: "white",
        padding: "9px",
        borderRadius: "12px",
      }}
    >
      <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
        <InputAdornment position="start">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <SvgIcon fontSize="small">
              <ArrowUpTrayIcon color="white" />
            </SvgIcon>
          </IconButton>
        </InputAdornment>
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <Typography variant="subtitle2" mr={2}>
        {selectedImage ? selectedImage.name : "Upload"}
      </Typography>
    </Paper>
  );
};

export default Upload;
