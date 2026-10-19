async function searchBooks(title) {
    const query = encodeURIComponent(title); // Converts the title into a suitable form for URL

    const response = await fetch(`/api/books?title=${query}`);
    
    if (!response.ok) {
        console.error("Backend request failed:", response.status);
        return [];
    }

    const data = await response.json();

    console.table(
        data.map(book => ({
            title: book.title,
            year: book.first_publish_year,
            editions: book.edition_count,
            language: book.language?.join(", ") // Optional chaining(?) prevents an error if a book doesn't have a language property
        })));

    return data.docs ?? []; // returns an empty array if the API response doesn't contain item, preventing errors when there are no results
}


export { searchBooks };
