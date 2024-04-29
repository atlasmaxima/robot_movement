import { RobotType } from '../model/robot';
import { Direction, GridOrigin } from '../model/direction';

export abstract class Robot {
    protected robotUUID: number;
    protected robotType: RobotType;
    protected x: number;
    protected y: number;
    protected robotCurX: number;
    protected robotCurY: number;
    protected origin: string;

    constructor() {
        this.robotUUID = 0;
        this.robotType = RobotType.BASIC;
        this.x = 0;
        this.y = 0;
        this.robotCurX = 0;
        this.robotCurY = 0;
        this.origin = GridOrigin.NW;
    }

    abstract isWithinBoundary(): void;

    abstract moveDirection(direction: Direction): void;
    
    abstract moveSequence(sequence: Direction[]): void;

    abstract retrieveRobotCurPosition(): void;
}

