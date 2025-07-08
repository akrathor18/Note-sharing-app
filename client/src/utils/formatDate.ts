export const formatDate = (date) => {
    const currentDate = date ? new Date(date) : new Date(' ');

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return formattedDate;
};
