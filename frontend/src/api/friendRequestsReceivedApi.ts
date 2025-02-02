const API_URL = 'http://localhost:8080/'; // Adjust API URL if needed

// API function to fetch received friend requests
export const friendRequestsReceivedApi = async () => { 
  const user = localStorage.getItem("user");

  if (!user) {
    console.error("🛑 [API] No user data found! Authentication required.");
    throw new Error("User not logged in.");
  }

  const parsedUser = JSON.parse(user); // Parse the JSON string into an object
  const userId = parsedUser._id; // Extract the _id
  console.log("User ID:", userId);

  const token = localStorage.getItem("token");

  if (!token) {
    console.error("🛑 [API] No token found! Authentication required.");
    throw new Error("Authentication token missing.");
  }

  try {
    const response = await fetch(`${API_URL}friendRequests/received/pending/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token ? `${token}` : ""
      },
    });

    console.log("📡 [API] Response received:", response);

    const data = await response.json();
    console.log("📡 [API] Parsed JSON:", data);

    if (!response.ok) {
      console.error("❌ [API] Fetch failed:", data.message);
      throw new Error(data.message || "Failed to fetch received friend requests");
    }

    return data;
  } catch (error) {
    console.error("🔥 [API] Error fetching received friend requests:", error);
    throw error;
  }
};
