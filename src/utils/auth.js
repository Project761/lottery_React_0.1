const BASE_URL = "https://lotteryapi.arustu.com/api";

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const expiry = localStorage.getItem("token_expiry");

  if (!accessToken || !expiry) return null;

  // Check if access token expired
  const expiryTime = new Date(expiry).getTime();
  const now = new Date().getTime();

  if (now >= expiryTime) {
    // Token expired → refresh it
    const newToken = await refreshAccessToken();
    return newToken;
  }

  return accessToken;
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  try {
    const payload = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    const res = await fetch(`${BASE_URL}/User/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data?.access_token) {
      // Store updated tokens
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("token_expiry", data.expires);
      console.log("Token refreshed successfully");
      return data.access_token;
    } else {
      console.warn("Token refresh failed:", data?.error_description);
      localStorage.clear(); // logout fallback
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.clear();
    return null;
  }
};
