export const formatDate = (date) => {
    const currentDate = date ? new Date(date) : new Date(' ');

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return formattedDate;
};


export const formatDateTime = (date) => {
    if (!date) return "";

    const currentDate = new Date(date);

    return currentDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        day: "numeric",
        month: "short",
    });
};