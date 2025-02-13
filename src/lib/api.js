const API_URL = import.meta.env.VITE_API_URL;



export async function getNote(id) {
    const response = await fetch(`${API_URL}?id=${id}`);
    return response.json();
}

export async function createNote(content) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", content })
    });
    return response.json();
}

export async function updateNote(id, content) {
    const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", id, content })
    });
    return response.json();
}

export async function deleteNote(id) {
    const response = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id })
    });
    return response.json();
}
