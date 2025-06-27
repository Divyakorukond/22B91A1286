import React from "react";
import { Box, Typography } from "@mui/material";
import StatsTable from "../components/StatsTable";

export default function StatsPage() {
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener Statistics
      </Typography>
      <StatsTable />
    </Box>
  );
}