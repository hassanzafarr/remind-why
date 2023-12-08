import React from "react";
import ArrowUpTrayIcon from "@heroicons/react/24/solid/ArrowUpTrayIcon";
import { InputAdornment, IconButton, Paper, SvgIcon, Typography } from "@mui/material";

// Function to shorten a filename
const shortenFilename = (filename, maxLength) => {
  if (filename.length <= maxLength) {
    return filename;
  }
  const extension = filename.split(".").pop();
  const truncatedName = filename.substring(0, maxLength - extension.length - 1);
  return truncatedName + "..." + extension;
};

const Upload = ({ selectedImage, handleImageChange }) => {
  const maxLength = 10; // Set your desired maximum length
  const shortenedFilename = selectedImage
    ? shortenFilename(selectedImage.name, maxLength)
    : "Upload";
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
        textOverflow: "ellipsis",
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
        style={{ display: "none", textOverflow: "ellipsis", width: "10px" }}
      />
      <Typography
        variant="subtitle2"
        mr={2}
        style={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}
      >
        {shortenedFilename}
      </Typography>
    </Paper>
  );
};

export default Upload;
