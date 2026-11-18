function getReleaseTiming(releaseDate, today) {
    if (releaseDate === null) {
        return "unknown";
    } else if (releaseDate > today) {
        return "upcoming";
    } else {
        return "date-reached";
    }
}

export { getReleaseTiming };