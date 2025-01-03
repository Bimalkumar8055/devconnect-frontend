
// * this is for production
// export const BASE_URL = "/api";

// * This is for development
// export const BASE_URL = "http://localhost:4000";

// * for dynamic url
export const BASE_URL = location.hostname === "localhost" ? "http://localhost:4000" : "/api" ;