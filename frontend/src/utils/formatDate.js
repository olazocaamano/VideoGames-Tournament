export default function formatDate(date) {
    if (!date) return "";
    return date.slice(0, 16).replace(" ", "T");
}