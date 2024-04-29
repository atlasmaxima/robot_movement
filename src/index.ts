import { Context } from 'aws-lambda';
import { logger } from "./logger";
import { handleRobotMovement } from './commands/handleRobotMovement';
import { InvalidDirectionErr, OutOfBoundErr } from './errors/robotError';

export const handler = async (event: any, context: Context): Promise<any> => {
    try {
        logger.info(`Event: ${JSON.stringify(event, null, 2)}`);
        logger.info(`Context: ${JSON.stringify(context, null, 2)}`);

        const {
            robotType = "basic",
            moveSequence = "NESW",
            gridOrigin = "SW",
            gridSize = 10,
            startX = 0,
            startY = 0,
        } = event;

        handleRobotMovement(robotType, moveSequence, startX, startY, gridOrigin, gridSize);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: event.body,
            }),
        };
    } catch (error) {
        if (error instanceof InvalidDirectionErr || error instanceof OutOfBoundErr) {
            logger.error(`Client error occurred: ${error}`);
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: error.message,
                }),
            };
        } else {
            logger.error(`Error occurred: ${error}`);
            return {
                body: JSON.stringify({
                    error: error.message,
                }),
            };
        }
    };
};