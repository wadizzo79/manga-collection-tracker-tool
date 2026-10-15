async function searchBooks(title) {
    const query = encodeURIComponent(title); // Converts the title into a suitable form for URL

    const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(`title:"${title}" AND author:"Muneyuki Kaneshiro"`)}&limit=100`
    );

    const data = await response.json();

    if (!response.ok) {
        console.error("Open Library API error:", data);
        return [];
    }

    console.table(
        data.docs.map(book => ({
            title: book.title,
            year: book.first_publish_year,
            editions: book.edition_count,
            language: book.language?.join(", ") // Optional chaining(?) prevents an error if a book doesn't have a language property
        })));

    return data.docs ?? []; // returns an empty array if the API response doesn't contain item, preventing errors when there are no results
}

async function testKodansha() {
    try {
        const response = await fetch(
            "https://kodansha.us/series/blue-lock/"
        );

        console.log("Status:", response.status);

        const html = await response.text();

        console.log("HTML length:", html.length);
        console.log("HTML preview:", html.slice(0, 500));
    } catch (error) {
        console.error("Kodansha request failed:", error);
    }
}
export { searchBooks };
export { testKodansha };