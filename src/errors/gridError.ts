import { GridOrigin } from '../model/direction';

export class InvalidGridOriginErr extends Error {
    constructor(gridOrigin: GridOrigin) {
        super(`Invalid grid origin ${gridOrigin}`);
        this.name = 'InvalidGridOriginErr';
    }
}