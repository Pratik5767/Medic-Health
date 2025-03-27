export function formatNumber(amount: number): string {
    return amount?.toLocaleString("en-US", {
        maximumFractionDigits: 0,
    });
}

export function getInitials(name: string): string {
    const words = name.trim().split(" ");

    const firstTwoWords = words.slice(0, 2);

    const initials = firstTwoWords.map((word) => word.charAt(0).toUpperCase());

    return initials.join("");
}