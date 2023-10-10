export default function formatDate(oldDate) {
    const data = new Date(oldDate)
    const dataFormated =
        data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear()
    return dataFormated
}
