export function sortByTitle(a, b) {
    if (a.title > b.title) return 1
    if (a.title < b.title) return -1
    return 0
}

export function sortByDateAsc(a, b) {
    const dateA = new Date(a.create_at)
    const dateB = new Date(b.create_at)
    if (dateA > dateB) return 1
    if (dateA < dateB) return -1
    return 0
}

export function sortByDateDesc(a, b) {
    const dateA = new Date(a.create_at)
    const dateB = new Date(b.create_at)
    if (dateA < dateB) return 1
    if (dateA > dateB) return -1
    return 0
}
