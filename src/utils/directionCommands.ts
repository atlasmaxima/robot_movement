import { Direction } from '../model/direction';

export function parseDirections(input: string) {
    const directions: Direction[] = [];
    const characters = [...input];
    for (const char of characters) {
        const direction = Object.values(Direction).find(value => value === char);
        if (direction) {
            directions.push(direction)
        } else {
            throw new TypeError(`Invalid direction ${char} in sequence ${input}`);
        }
    }
    return directions;
}

