import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import ShortenForm from "../components/ShortenForm";
import ShortenResultList from "../components/ShortenResultList";

export default function ShortenerPage() {
  const [results, setResults] = useState([]);
  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px 0 rgba(25, 114, 120, 0.10)' }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', mb: 2, fontFamily: 'Montserrat, Roboto, Arial' }}>
          <span role="img" aria-label="link">🔗</span> URL Shortener
        </Typography>
        <ShortenForm onResult={setResults} />
        <ShortenResultList results={results} />
      </Paper>
    </Box>
  );
}
