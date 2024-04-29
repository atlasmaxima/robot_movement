import { Command } from 'commander';
import { logger } from "./logger";
import { handleRobotMovement } from './commands/handleRobotMovement';

export const moveCommand = new Command()
    .description('Move the robot')
    .option('-t, --robotType <type>', 'Specify the type of robot (basic | warehouse)', 'basic')
    .option('-s, --sequence <sequence>', 'Specify the sequence of directions to move the robot', 'NESW')
    .option('-x --startX <startX>', 'Specify the starting x coordinate', parseInt, 0)
    .option('-y --startY <startY>', 'Specify the starting y coordinate', parseInt, 0)
    .option('-o --gridOrigin <gridOrigin>', 'Specify the reference of grid origin', 'NW')
    .option('-g --gridSize <gridSize>', 'Specify the size of the grid', parseInt, 10)
    .helpOption('-h, --help', 'Display help for command')

moveCommand.parse();

const options = moveCommand.opts();

function runRobot(): void {
    logger.info(`Robot selected type: ${options.robotType}`);
    try {
        handleRobotMovement(
            options.robotType,
            options.sequence,
            options.startX,
            options.startY,
            options.gridOrigin,
            options.gridSize
        );
    } catch (error) {
        logger.error(error.message);
    }
}

runRobot();

