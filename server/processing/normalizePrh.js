function normalizePrhTitles(books, seriesCode) {
    const prhTitles = books.map(book => ({
        source: "PRH",
        sourceSeriesCode: String(seriesCode),
        isbn: String(book.isbn),
        title: book.title,
        volumeNumber: book.seriesNumber ?? null,
        format: book.formatFamily,
        releaseDate: book.onsale
    }));

    return prhTitles;
}

export { normalizePrhTitles };