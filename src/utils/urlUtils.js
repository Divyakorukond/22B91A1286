export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidShortcode(code) {
  return /^[a-zA-Z0-9]{4,10}$/.test(code);
}

export function generateShortcode(existing) {
  let code;
  do {
    code = Math.random().toString(36).substring(2, 8);
  } while (existing.includes(code));
  return code;
}
