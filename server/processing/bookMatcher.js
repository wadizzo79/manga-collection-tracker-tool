function getVolumeCandidates(books, title) {
    const matchingBooks = books.filter(book => 
        book.name.toLowerCase().startsWith(title.toLowerCase()) 
    ); // Keeps records whose name begins with the requested manga title
    const processedBooks = matchingBooks.map(book => ({
        ...book,
        remainder: book.name.slice(title.length).trim()
    })
    ); // Creates a new array that preserves a book's original information and adding it's remainder

    return processedBooks; 
} // Processes book records to identify relevant manga volumes

export { getVolumeCandidates };