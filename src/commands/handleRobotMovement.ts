import { RobotType } from '../model/robot';
import { GridBoundary } from '../abstract/grid';
import { WarehouseRobot } from '../robots/warehouseRobot';
import { GridOrigin } from '../model/direction';
import { parseDirections } from '../utils/directionCommands';
import { logger } from '../logger';

export function handleRobotMovement(robotType: RobotType, moveSequence: string, startX: number, startY: number, gridOrigin: GridOrigin, gridSize: number) {
    const gridBoundary = new GridBoundary(gridOrigin, gridSize);
    const gridCenter = gridBoundary.retrieveGridCenter();
    const warehouseRobot = new WarehouseRobot(startX, startY, gridBoundary);

    switch (robotType) {
        case RobotType.WAREHOUSE:
            logger.info(
                `Grid size: ${gridSize} with grid center: ${gridCenter.gridCenterX}, ${gridCenter.gridCenterY}`
            );
            warehouseRobot.moveSequence(parseDirections(moveSequence));
            break;
        case RobotType.BASIC:
            break;
        default:
            throw new TypeError(`Invalid robot type ${robotType}`);
    }
}