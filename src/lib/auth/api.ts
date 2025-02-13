import { fetchWithToken } from "@/util/request";

// Login
type login = {
  email: string;
  password: string;
}

export const login = async (user: login) => {
  const res = await fetch(`/api/user/login`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  })

  const data = await res.json();

  return data;
}

// Logout
export const logout = async () => {
  const res = await fetchWithToken("/api/user/logout", {
    method: "POST"
  })

  const data = await res.json();

  return data;
}