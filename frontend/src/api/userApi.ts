// src/api/userApi.ts

const API_URL = 'http://localhost:8080/'; // Adjust API URL if needed

// API function to fetch a single user
export const fetchUserApi = async (userId: string) => {
  console.log(`🌐 [API] Fetching user with ID: ${userId}`);

  const token = localStorage.getItem("token");
  console.log("🛑 [API] Token retrieved:", token);

  try {
    const response = await fetch(`${API_URL}users/${userId}`, {
      headers: {
        "x-auth-token": token ? `${token}` : "",
      },
    });

    console.log("📡 [API] Response received:", response);

    const data = await response.json();
    console.log("📡 [API] Parsed JSON:", data);

    if (!response.ok) {
      console.error("❌ [API] Fetch failed:", data.message);
      throw new Error(data.message || "Failed to fetch user");
    }

    return data;
  } catch (error) {
    console.error("🔥 [API] Error in fetching user:", error);
    throw error;
  }
};
