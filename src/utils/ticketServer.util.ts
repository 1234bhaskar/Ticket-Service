export const getRandomShard = <T>(items: T[]): T => {
    const index = Math.floor(Math.random() * items.length);
    return items[index]!;
};

export function getRandomRow(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}