export default async function handler(req, res) {
    try {
        const response = await fetch('https://api.30osob.com/owner');
        const data = await response.json();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

