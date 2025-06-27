export async function getGeoLocation() {
  // Try browser geolocation first
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
      });
      const { latitude, longitude } = position.coords;
      // Use a reverse geocoding API to get city/country from lat/lon
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await res.json();
      const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || "Unknown";
      const country = data.address.country || "Unknown";
      // Get IP as well (for consistency)
      const ipRes = await fetch("https://ipapi.co/json/");
      const ipData = await ipRes.json();
      return { location: `${city}, ${country}`, ip: ipData.ip };
    } catch (e) {
      // If browser geolocation fails, fall back to IP-based
    }
  }
  // Fallback: IP-based geolocation
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return { location: `${data.city}, ${data.country_name}`, ip: data.ip };
  } catch {
    return { location: "Unknown", ip: "Unknown" };
  }
}