import { type GridCenter } from "../model/grid";
import { GridOrigin } from "../model/direction";
import { InvalidGridOriginErr } from "../errors/gridError";
import { logger } from "../logger";

interface IGridBoundary {
    isWithinBounds(startX: number, startY: number): boolean;
    setGridBounds(): void;
}

export class GridBoundary implements IGridBoundary {
    private gridMinX: number;
    private gridMaxX: number;
    private gridMinY: number;
    private gridMaxY: number;
    private gridSize: number;
    private gridOrigin: GridOrigin;

    constructor(gridOrigin: GridOrigin, gridSize: number) {
        this.gridSize = gridSize;
        this.gridOrigin = gridOrigin;

        const { gridMinX, gridMaxX, gridMinY, gridMaxY } = this.setGridBounds();
        this.gridMinX = gridMinX;
        this.gridMaxX = gridMaxX;
        this.gridMinY = gridMinY;
        this.gridMaxY = gridMaxY;
    }

    setGridBounds() {
        logger.info(`Setting reference grid boundary of origin: ${this.gridOrigin}`);
        switch (this.gridOrigin) {
            case GridOrigin.NE:
                this.gridMinX = -this.gridSize;
                this.gridMaxX = 0;
                this.gridMinY = -this.gridSize;
                this.gridMaxY = 0;
                break;
            case GridOrigin.NW:
                this.gridMinX = 0;
                this.gridMaxX = this.gridSize;
                this.gridMinY = -this.gridSize;
                this.gridMaxY = 0;
                break;
            case GridOrigin.SE:
                this.gridMinX = -this.gridSize;
                this.gridMaxX = 0;
                this.gridMinY = 0;
                this.gridMaxY = this.gridSize;
                break;
            case GridOrigin.SW:
                this.gridMinX = 0;
                this.gridMaxX = this.gridSize;
                this.gridMinY = 0;
                this.gridMaxY = this.gridSize;
                break;
            default:
                throw new InvalidGridOriginErr(this.gridOrigin);
        }
        return { gridMinX: this.gridMinX, gridMaxX: this.gridMaxX, gridMinY: this.gridMinY, gridMaxY: this.gridMaxY };
    }

    isWithinBounds(startX: number, startY: number): boolean {
        return (
            startX >= this.gridMinX &&
            startX <= this.gridMaxX &&
            startY >= this.gridMinY &&
            startY <= this.gridMaxY
        );
    }

    retrieveGridCenter(): GridCenter {
        const gridCenterX = Math.floor(this.gridSize / 2);
        const gridCenterY = Math.floor(this.gridSize / 2);
        return { gridCenterX, gridCenterY };
    }
}