export const formatDate = (date: string): string => {
    const currentDate = date ? new Date(date) : new Date(' ');

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return formattedDate;
};
