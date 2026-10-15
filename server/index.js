import express from "express";

const app = express(); // Creates backend application
const PORT = 3000;

app.get("/api/manga", (req, res) => { // req represents incoming requests, res represents the response that's sent back
    res.json({
        message: "Manga Tracker API is working!"
    }); // sends JS data as JSON
}); // defines an endpoint that responds to GET requests

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); //starts the server on port 3000

app.get("/api/books", async (req, res) => {
    const title = req.query.title;

    try {
        const response = await fetch(
            `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=10`
        );

        if (!response.ok) {
            return res.status(502).json({
                error: "Failed to retrieve book data"
            });
        }

        const data = await response.json();

        res.json(data.docs);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});