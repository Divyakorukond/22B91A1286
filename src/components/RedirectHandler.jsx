import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUrlContext } from "../context/UrlContext";
import { Log as logger } from "../utils/logger";
import { getGeoLocation } from "../utils/geoUtils";
import { Box, Typography } from "@mui/material";

export default function RedirectHandler() {
  const { shortcode } = useParams();
  const { urls, updateUrl } = useUrlContext();
  const navigate = useNavigate();

  useEffect(() => {
    const urlObj = urls.find((u) => u.shortcode === shortcode);
    if (!urlObj) {
      logger("frontend", "error", "component", `Shortcode not found: ${shortcode}`);
      setTimeout(() => navigate("/"), 2000);
      return;
    }
    if (Date.now() > urlObj.expiresAt) {
      logger("frontend", "warn", "component", `Shortcode expired: ${shortcode}`);
      setTimeout(() => navigate("/"), 2000);
      return;
    }
    (async () => {
      const geoData = await getGeoLocation();
      const source = document.referrer || "Direct";
      updateUrl(shortcode, (u) => ({
        ...u,
        clicks: [
          ...u.clicks,
          { timestamp: Date.now(), source, geo: geoData.location, ip: geoData.ip },
        ],
      }));
      logger(
        "frontend",
        "info",
        "component",
        `Short URL clicked: ${shortcode}, source: ${source}, geo: ${geoData.location}, ip: ${geoData.ip}`
      );
      window.location.href = urlObj.original;
    })();
  }, [shortcode, urls, updateUrl, navigate]);

  return (
    <Box sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h5">Redirecting...</Typography>
    </Box>
  );
}

