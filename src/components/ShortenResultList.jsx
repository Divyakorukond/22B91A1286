import React from "react";
import { Box, Typography, Link, Paper, Avatar, Stack } from "@mui/material";

export default function ShortenResultList({ results }) {
  if (!results.length) return null;
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
        <span role="img" aria-label="list">📋</span> Shortened URLs
      </Typography>
      <Stack spacing={2}>
        {results.map((r, idx) => (
          <Paper key={idx} sx={{ p: 2.5, display: 'flex', alignItems: 'center', borderRadius: 3, boxShadow: 2, background: '#f9fafb' }}>
            <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>{r.shortcode[0]?.toUpperCase() || 'S'}</Avatar>
            <Box>
              <Typography sx={{ fontWeight: 500 }}>
                <b>Original:</b> {r.original}
              </Typography>
              <Typography>
                <b>Short URL:</b>{' '}
                <Link href={`/${r.shortcode}`} target="_blank" rel="noopener" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  {window.location.origin}/{r.shortcode}
                </Link>
              </Typography>
              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                <b>Expires At:</b> {new Date(r.expiresAt).toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

