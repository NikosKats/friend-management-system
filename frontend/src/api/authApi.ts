// src/api/authApi.ts

const API_URL = 'http://localhost:8080/'; // Adjust API URL if needed

// API Request for Login
export const loginApi = async (email: string, password: string) => {
  console.log("🔌 API: Making API call to login with email:", email, "and password:", password);

  const response = await fetch(`${API_URL}users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    console.error("⚠️ API: Error in login API call. Response not OK.", response);
    throw new Error('Invalid credentials');
  }

  const data = await response.json();
  console.log("📥 API: Received API response:", data);

  return data;
};
