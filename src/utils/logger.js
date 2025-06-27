const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

// Allowed values
const STACKS = ["backend", "frontend"];
const LEVELS = ["debug", "info", "warn", "error", "fatal"];
const FRONTEND_PACKAGES = ["api", "component", "hook", "page", "state", "style"];
const BACKEND_PACKAGES = [
  "cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"
];
const COMMON_PACKAGES = ["auth", "config", "middleware", "utils"];

function isValidStack(stack) {
  return STACKS.includes(stack);
}
function isValidLevel(level) {
  return LEVELS.includes(level);
}
function isValidPackage(pkg, stack) {
  if (COMMON_PACKAGES.includes(pkg)) return true;
  if (stack === "frontend") return FRONTEND_PACKAGES.includes(pkg);
  if (stack === "backend") return BACKEND_PACKAGES.includes(pkg);
  return false;
}

/**
 * Logs a message to the evaluation server.
 * @param {"frontend"|"backend"} stack
 * @param {"debug"|"info"|"warn"|"error"|"fatal"} level
 * @param {string} pkg
 * @param {string} message
 */
export async function Log(stack, level, pkg, message) {
  // Validate inputs
  if (!isValidStack(stack)) throw new Error("Invalid stack");
  if (!isValidLevel(level)) throw new Error("Invalid level");
  if (!isValidPackage(pkg, stack)) throw new Error("Invalid package for stack");

  const body = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    // Optionally, handle logging failure (do not use console.log)
    // You may want to retry or queue logs for later
  }
}
