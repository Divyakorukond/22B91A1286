import React, { useState } from "react";
import { Box, Button, TextField, Grid, Typography } from "@mui/material";
import { useUrlContext } from "../context/UrlContext";
import { Log as logger } from "../utils/logger";
import { isValidUrl, isValidShortcode, generateShortcode } from "../utils/urlUtils";

const DEFAULT_VALIDITY = 30;

export default function ShortenForm({ onResult }) {
  const { urls, addUrl } = useUrlContext();
  const [inputs, setInputs] = useState([
    { url: "", validity: "", shortcode: "" },
  ]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (idx, field, value) => {
    setInputs((prev) =>
      prev.map((input, i) => (i === idx ? { ...input, [field]: value } : input))
    );
  };

  const addInput = () => {
    if (inputs.length < 5) setInputs([...inputs, { url: "", validity: "", shortcode: "" }]);
  };

  const removeInput = (idx) => {
    setInputs(inputs.filter((_, i) => i !== idx));
  };

  const validate = () => {
    const errs = {};
    const existingShortcodes = urls.map((u) => u.shortcode);
    inputs.forEach((input, idx) => {
      if (!isValidUrl(input.url)) errs[`url${idx}`] = "Invalid URL";
      if (input.validity && (!/^\d+$/.test(input.validity) || parseInt(input.validity) <= 0))
        errs[`validity${idx}`] = "Validity must be a positive integer";
      if (input.shortcode) {
        if (!isValidShortcode(input.shortcode))
          errs[`shortcode${idx}`] = "Shortcode must be 4-10 alphanumeric chars";
        if (existingShortcodes.includes(input.shortcode))
          errs[`shortcode${idx}`] = "Shortcode already exists";
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const now = Date.now();
    const results = [];
    const existingShortcodes = urls.map((u) => u.shortcode);
    inputs.forEach((input) => {
      let shortcode = input.shortcode;
      if (!shortcode) {
        shortcode = generateShortcode([...existingShortcodes, ...results.map(r => r.shortcode)]);
      }
      const validity = input.validity ? parseInt(input.validity) : DEFAULT_VALIDITY;
      const expiry = now + validity * 60 * 1000;
      const urlObj = {
        original: input.url,
        shortcode,
        createdAt: now,
        expiresAt: expiry,
        clicks: [],
      };
      addUrl(urlObj);
      logger("frontend", "info", "component", "Shortened URL created", urlObj);
      results.push(urlObj);
    });
    onResult(results);
    setInputs([{ url: "", validity: "", shortcode: "" }]);
    setSubmitting(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">Shorten up to 5 URLs</Typography>
      {inputs.map((input, idx) => (
        <Grid container spacing={2} alignItems="center" key={idx} sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <TextField
              label="Long URL"
              value={input.url}
              onChange={e => handleChange(idx, "url", e.target.value)}
              error={!!errors[`url${idx}`]}
              helperText={errors[`url${idx}`]}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Validity (min)"
              value={input.validity}
              onChange={e => handleChange(idx, "validity", e.target.value)}
              error={!!errors[`validity${idx}`]}
              helperText={errors[`validity${idx}`]}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Custom Shortcode"
              value={input.shortcode}
              onChange={e => handleChange(idx, "shortcode", e.target.value)}
              error={!!errors[`shortcode${idx}`]}
              helperText={errors[`shortcode${idx}`]}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            {inputs.length > 1 && (
              <Button color="error" onClick={() => removeInput(idx)}>Remove</Button>
            )}
          </Grid>
        </Grid>
      ))}
      <Box sx={{ mb: 2 }}>
        <Button onClick={addInput} disabled={inputs.length >= 5}>Add URL</Button>
      </Box>
      <Button type="submit" variant="contained" disabled={submitting}>Shorten</Button>
    </Box>
  );
}

