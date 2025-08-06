import { formatDistanceToNow } from 'date-fns';

export const timeAgo = (timestamp) => {
    const full = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    if (full.includes('less')) return 'now';
    if (full.includes('minute')) return full.split(' ')[0] + 'm';
    if (full.includes('hour')) return full.split(' ')[0] + 'h';
    if (full.includes('day')) return full.split(' ')[0] + 'd';
};