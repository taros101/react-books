export default function req(url: string, method: string, id?: string, token?: string, body?: object) {
  return (fetch(`http://localhost:3000/v1/${url}/${id}`, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
    }).then(response => response.json())
  );
}
