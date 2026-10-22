import "dotenv/config";
import express from "express";

const app = express(); // Creates backend application
const PORT = 3000;

app.get("/api/manga", (req, res) => { // req represents incoming requests, res represents the response that's sent back
    res.json({
        message: "Manga Tracker API is working!"
    }); // sends JS data as JSON
}); // defines an endpoint that responds to GET requests

app.get("/api/books", async (req, res) => {
    const title = req.query.title;

    try {
        const response = await fetch(
            `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=100`
        );

        if (!response.ok) {
            return res.status(502).json({
                error: "Failed to retrieve book data"
            });
        }

        const data = await response.json();

        const filteredBooks = data.docs.filter(book => /^Blue Lock\s+\d+$/i.test(book.title)); // Filters list of books to find the manga with the title accomopanied with it's number eg Vagabond 2 

        console.log("Original results:", data.docs.length);
        console.log("Filtered results:", filteredBooks.length);

        const volumeNumbers = filteredBooks.map(book =>
            Number(book.title.match(/\d+$/)[0])
        );

        const uniqueVolumes = [...new Set(volumeNumbers)];

        console.log("Unique volume numbers:", uniqueVolumes.sort((a, b) => a - b));
        console.log("Unique volume count:", uniqueVolumes.length);



        console.table(
            filteredBooks.map(book => ({
                title: book.title,
                volumeNumber: Number(book.title.match(/\d+$/)[0]), // Number() converts the string to a number after extracting the volume number from the title using match()
                language: book.language?.join(", ")
            }))
        );

        res.json(filteredBooks);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

/*app.get("/api/publisher-test", async (req, res) => {
    const url = "https://kodansha.us/book/blue-lock/blue-lock-volume-35/";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return res.status(502).json({
                error: "Publisher request failed",
                status: response.status
            });
        }

        const html = await response.text();

        res.json({
            status: response.status,
            contentType: response.headers.get("content-type"),
            htmlLength: html.length,
            hasPrintRelease: html.includes("Print release")
        });
    } catch (error) {
        console.error("Publisher error:", error.message);
        console.error("Underlying error", error.cause);

        res.status(500).json({
            error: error.message
        });
    }
}); */

app.get("/api/prh-test", async (req, res) => {
    const title = req.query.title || "Blue Lock";
    const apiKey = process.env.PRH_API_KEY;

    if (!apiKey) {
        return res.status(500).json({
            error: "PRH API key is missing"
        });
    }

    const url = new URL(
        "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search"
    );

    url.searchParams.set("q", title);
    url.searchParams.set("docType", "work");
    url.searchParams.set("rows", "10");
    url.searchParams.set("api_key", apiKey);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error("PRH status:", response.status);

            const errorBody = await response.text();

            console.error("PRH error:",
                errorBody.replaceAll(apiKey, "[REDACTED]").slice(0, 500)
            )

            return res.status(502).json({
                error: "PRH API request failed",
                status: response.status
            });
        }

        const data = await response.json();

        console.table(
            (data.results ?? []).map(book => ({
                name: book.name,
                type: book.docType,
                id: book.key
            }))
        );

        res.json({
            count: data.results?.length ?? 0,
            results: data.results ?? []
        });

    } catch (error) {
        console.error("PRH connection error:", error.message);

        res.status(500).json({
            error: "Could not connect to PRH"
        });
    }
});

/*app.get("/api/ann-test", async (req, res) => {
    const title = req.query.title;

    if (!title) {
        return res.status(400).json({
            error: "Manga title is required"
        });
    }

    const url = new URL(
        "https://cdn.animenewsnetwork.com/encyclopedia/api.xml"
    );

    url.searchParams.set("title", `~${title}`);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return res.status(502).json({
                error: "ANN request failed",
                status: response.status
            });
        }

        const xml = await response.text();

        res.type("application/xml").send(xml);

    } catch (error) {
        console.error("ANN error:", error);
        console.error("Underlying cause:", error.cause);

        res.status(500).json({
            error: "Could not connect to ANN"
        });
    }
}); */

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); //starts the server on port 3000