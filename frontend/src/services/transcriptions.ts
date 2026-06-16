const API_URL = import.meta.env.VITE_API_URL;

export async function transcribeAudio(token: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/v1/transcriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Status ${response.status}: ${message}`);
  }

  return response.json();
}
