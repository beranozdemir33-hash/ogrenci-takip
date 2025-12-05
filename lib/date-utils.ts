export function formatDate(dateStr: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    // Use Turkish locale or explicitly construct DD/MM/YYYY
    // Explicit construction avoids locale inconsistencies on different servers
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
