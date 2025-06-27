import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from "@mui/material";
import { useUrlContext } from "../context/UrlContext";

export default function StatsTable() {
  const { urls } = useUrlContext();

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Shortened URL Statistics</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Expires At</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Click Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((u, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Link href={`/${u.shortcode}`} target="_blank" rel="noopener">
                    {window.location.origin}/{u.shortcode}
                  </Link>
                  </TableCell>
                <TableCell>{u.original}</TableCell>
                <TableCell>{new Date(u.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(u.expiresAt).toLocaleString()}</TableCell>
                <TableCell>{u.clicks.length}</TableCell>
                <TableCell>
                  {u.clicks.length === 0 ? (
                    "—"
                  ) : (
                    <ul>
                      {u.clicks.map((c, i) => (
                        <li key={i}>
                          {new Date(c.timestamp).toLocaleString()} | {c.source} | {c.geo} | {c.ip} | Click #{i + 1}
                        </li>
                      ))}
                    </ul>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

