import { formatDistanceToNow } from 'date-fns';


export const timeAgo = (timestamp) => {
    const full = formatDistanceToNow(new Date(timestamp), { addSuffix: true }).replace("about ", "");
    if (full.includes("less") || full.includes("second")) return "now";

    const num = parseInt(full); 

    if (full.includes("minute")) return num + "m";
    if (full.includes("hour")) return num + "h";
    if (full.includes("day")) return num + "d";
    if (full.includes("week")) return num + "w";
    if (full.includes("month")) return num + "mo";
    if (full.includes("year")) return num + "y";

    return full;
};
