import process from "node:pocess";

async function searchPrhBooks(title) {
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

export {searchPrhBooks};