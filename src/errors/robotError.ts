import { Direction } from '../model/direction';
import { RobotType } from '../model/robot';

export class OutOfBoundErr extends Error {
    constructor(direction: Direction, robotUUID: number) {
        super(`Robot ${robotUUID} has moved out of bounds at ${direction}`);
        this.name = 'OutOfBoundErr';
    }
}

export class InvalidDirectionErr extends Error {
    constructor(direction: Direction, robotUUID: number, robotType: RobotType) {
        super(`Invalid direction ${direction} for robot ${robotUUID} of type ${robotType}`);
        this.name = 'InvalidDirectionErr';
    }
}