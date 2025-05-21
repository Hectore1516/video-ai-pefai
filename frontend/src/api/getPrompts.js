// Ejemplo: frontend/src/api/getPrompts.js
export async function getPrompts() {
    const res = await fetch("http://localhost:3001/api/prompts");
    const data = await res.json();
    return data;
}

useEffect(() => {
    getPrompts().then(data => {
        console.log("Prompts:", data);
    });
}, []);