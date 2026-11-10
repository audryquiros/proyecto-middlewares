export async function getTasks() {
  const response = await fetch('/api/tasks');
  const data = await response.json().catch(() => []);

  return {
    ok: response.ok,
    status: response.status,
    data
  };
}
