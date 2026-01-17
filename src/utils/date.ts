export const formatDateDMY = (isoDate: string | null) => {
    if (!isoDate) return "--";

    const [y, m, d] = isoDate.split("-");
    return `${d}-${m}-${y}`;
}