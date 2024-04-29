import { RobotType, type RobotPosition } from '../model/robot';
import { Robot } from '../abstract/robot';
import { Direction } from '../model/direction';
import { GridBoundary } from '../abstract/grid';
import { OutOfBoundErr, InvalidDirectionErr } from '../errors/robotError';
import { logger } from '../logger';

export class WarehouseRobot extends Robot {
    private readonly grid: GridBoundary;

    constructor(startX: number, startY: number, grid: GridBoundary) {
        super();

        this.robotType = RobotType.WAREHOUSE;
        this.x = startX;
        this.y = startY;
        this.robotCurX = startX;
        this.robotCurY = startY;
        this.grid = grid;
    }

    isWithinBoundary(): boolean {
        return this.grid.isWithinBounds(this.x, this.y);
    }

    moveDirection(direction: Direction): boolean {
        switch (direction) {
            case Direction.North:
                this.y++;
                break;
            case Direction.South:
                this.y--;
                break;
            case Direction.East:
                this.x++;
                break;
            case Direction.West:
                this.x--;
                break;
            default:
                throw new InvalidDirectionErr(direction, this.robotUUID, this.robotType);
        }
        logger.info(`Robot ${this.robotUUID} moved to x: ${this.x}, y: ${this.y}`);
        this.robotCurX = this.x;
        this.robotCurY = this.y;

        return this.isWithinBoundary();
    }

    moveSequence(sequence: Direction[]): void {
        for (const direction of sequence) {
            if (!this.moveDirection(direction)) {
                throw new OutOfBoundErr(direction, this.robotUUID);
            }
        }
    }

    retrieveRobotCurPosition(): RobotPosition {
        return { robotCurX: this.robotCurX, robotCurY: this.robotCurY };
    }
}