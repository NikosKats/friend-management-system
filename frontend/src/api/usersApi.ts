// src/api/userApi.ts

const API_URL = 'http://localhost:8080/'; // Adjust API URL if needed

// API function to fetch users
export const fetchUsersApi = async () => {
  console.log("🌐 [API] Fetching users..."); // Add this to track when the API function is called.

  const token = localStorage.getItem("token");
  console.log("🛑 [API] Token retrieved:", token); // Log the token being used for authentication

  try {
    const response = await fetch(`${API_URL}users/all`, {
      headers: {
        "x-auth-token": token ? `${token}` : "",
      },
    });

    console.log("📡 [API] Response received:", response); // Log the response object

    const data = await response.json();
    console.log("📡 [API] Parsed JSON:", data); // Log the parsed JSON data

    if (!response.ok) {
      console.error("❌ [API] Fetch failed:", data.message); // Log any failure message from the API
      throw new Error(data.message || "Failed to fetch users");
    }

    return data;
  } catch (error) {
    console.error("🔥 [API] Error in fetching users:", error);
    throw error;
  }
};
