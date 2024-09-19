// Login
type login = {
  email: string;
  password: string;
}

export const login = async (user: login) => {
  const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  })

  const data = await res.json();

  return data;
}