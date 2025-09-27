const API_BASE = process.env.REACT_APP_API_URL;

async function fetchUsers() {
  const res = await fetch(`${API_BASE}/api/users`);
  const data = await res.json();
  console.log(data);
}
