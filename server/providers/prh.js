import process from "node:process";

async function searchPrhBooks(title, start = 0) {
    const apiKey = process.env.PRH_API_KEY;

    if (!apiKey) {
        throw new Error("PRH API key is missing");
    }

    const url = new URL(
        "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search"
    );

    url.searchParams.set("q", title);
    url.searchParams.set("docType", "isbn");
    url.searchParams.set("rows", "20");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("start", String(start))

    const response = await fetch(url); // retrieves the response

    if (!response.ok) {
            console.error("PRH status:", response.status);

            const errorBody = await response.text();

            console.error("PRH error:",
                errorBody.replaceAll(apiKey, "[REDACTED]").slice(0, 500)
            )

            throw new Error(`PRH API request failed: ${response.status}`); // throw stops the function and reports an error to the calling code
    }  
    
    const data = await response.json(); // parses the response

    return data.data?.results ?? []; // gives the book array back to the caller
}

async function getAllPrhBooks(title) {
    const allBooks = []; // Contain the results accumulated from multiple requests
    let start = 0; // tracks which position the next request should begin at
    const pageSize = 20;
    const maxPages = 5;

    for (let page = 0; page < maxPages; page++) {
        const results = await searchPrhBooks(title, start);
        allBooks.push(...results); // Adds the books found into the array
        
        if (results.length < pageSize) {
            break;
        } else {
            start += pageSize;
        } // If entries found is less than entries allowed on one page then break otherwise increment start to determine the next start point
    }

    return allBooks;
}

async function getPrhBookByIsbn(isbn) {
    const apiKey = process.env.PRH_API_KEY;

    if (!apiKey) {
        throw new Error("PRH API key is missing");
    }

    const url = new URL(
        `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles/${isbn}`
    );

    url.searchParams.set("api_key", apiKey);

    const response = await fetch(url);

    if (!response.ok) {
        console.error("PRH status:", response.status);

        const errorBody = await response.text();

        console.error("PRH error:",
            errorBody.replaceAll(apiKey, "[REDACTED]").slice(0, 500)
        )

        throw new Error(`PRH API request failed: ${response.status}`);
    }

    const data = await response.json();

    console.log("Response fields:", Object.keys(data));
    console.log("Data fields:", Object.keys(data.data ?? {}));

    return data.data?.titles ?? [];
}

export {searchPrhBooks, getPrhBookByIsbn, getAllPrhBooks};