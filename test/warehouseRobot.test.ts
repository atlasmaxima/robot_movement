import { WarehouseRobot } from '../src/robots/warehouseRobot';
import { Direction, GridOrigin } from '../src/model/direction';
import { GridBoundary } from '../src/abstract/grid';
import { GridCenter } from '../src/model/grid';
import { logger } from '../src/logger';
import { RobotPosition } from '../src/model/robot';
import { InvalidGridOriginErr } from '../src/errors/gridError';
import { InvalidDirectionErr, OutOfBoundErr } from '../src/errors/robotError';

describe('WarehouseRobot', () => {
  let mockError: jest.SpyInstance;
  let mockInfo: jest.SpyInstance;
  const GRID_SIZE = 10;
  const INITIAL_START_X = 0;
  const INITIAL_START_Y = 0;

  beforeEach(() => {
    mockInfo = jest.spyOn(logger, 'info').mockImplementation();
    mockError = jest.spyOn(logger, 'error').mockImplementation();
  });

  afterEach(() => {
    mockInfo.mockRestore();
    mockError.mockRestore();
  });

  describe('isWithinBoundary', () => {

    describe('returns false when robot is out of boundary', () => {
      test('when reference origin of grid is NE', () => {
        // Arrange
        const gridBoundaryMock = new GridBoundary(GridOrigin.NE, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(2, 0, gridBoundaryMock);

        // Act
        const actualResult = warehouseRobot.isWithinBoundary();

        // Assert
        expect(actualResult).toBeFalsy();
      });

      test('when reference origin of grid is NW', () => {
        const gridBoundaryMock = new GridBoundary(GridOrigin.NW, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(0, 3, gridBoundaryMock);
        const actualResult = warehouseRobot.isWithinBoundary();
        expect(actualResult).toBeFalsy();
      });

      test('when reference origin of grid is SW', () => {
        const gridBoundaryMock = new GridBoundary(GridOrigin.SW, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(-1, -1, gridBoundaryMock);
        const actualResult = warehouseRobot.isWithinBoundary();
        expect(actualResult).toBeFalsy();
      });

      test('when reference origin of grid is SE', () => {
        const gridBoundaryMock = new GridBoundary(GridOrigin.SE, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(3, 0, gridBoundaryMock);
        const actualResult = warehouseRobot.isWithinBoundary();
        expect(actualResult).toBeFalsy();
      });
    });

    describe('returns true when robot is within boundary', () => {
      test('when reference origin of grid is default at start origin', () => {
        // Arrange
        const gridBoundaryMock = new GridBoundary(GridOrigin.NW, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock);

        // Act
        const actualResult = warehouseRobot.isWithinBoundary();

        // Assert
        expect(actualResult).toBeTruthy();
      });

      test('when reference origin of grid is NE', () => {
        const gridBoundaryMock = new GridBoundary(GridOrigin.NE, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(-1, -1, gridBoundaryMock);
        const actualResult = warehouseRobot.isWithinBoundary();
        expect(actualResult).toBeTruthy();
      });

      test('when reference origin of grid is NW', () => {
        const gridBoundaryMock = new GridBoundary(GridOrigin.NW, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(0, -5, gridBoundaryMock);
        const actualResult = warehouseRobot.isWithinBoundary();
        expect(actualResult).toBeTruthy();
      });

      test('when reference origin of grid is SW', () => {
        const gridBoundaryMock = new GridBoundary(GridOrigin.SW, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(5, 5, gridBoundaryMock);
        const actualResult = warehouseRobot.isWithinBoundary();
        expect(actualResult).toBeTruthy();
      });

      test('when reference origin of grid is SE', () => {
        const gridBoundaryMock = new GridBoundary(GridOrigin.SE, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(-3, 0, gridBoundaryMock);
        const actualResult = warehouseRobot.isWithinBoundary();
        expect(actualResult).toBeTruthy();
      });

      test('throw invalid grid origin err with invalid reference grid origin', () => {
        expect(() => {
          new GridBoundary('AB' as GridOrigin, GRID_SIZE);
        }).toThrow(InvalidGridOriginErr);
      });
    });
  });

  describe('moveDirection', () => {
    test('should move the robot north', () => {
      // Arrange
      const gridBoundaryMock = new GridBoundary(GridOrigin.SE, GRID_SIZE);
      const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock,);

      // Act
      warehouseRobot.moveDirection(Direction.North);

      // Assert
      expect(warehouseRobot['y']).toEqual(1);
      expect(warehouseRobot.isWithinBoundary).toBeTruthy();
    });


    test('should move the robot south', () => {
      const gridBoundaryMock = new GridBoundary(GridOrigin.NW, GRID_SIZE);
      const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock);
      warehouseRobot.moveDirection(Direction.South);
      expect(warehouseRobot['y']).toEqual(-1);
      expect(warehouseRobot.isWithinBoundary).toBeTruthy();
    });

    test('should move the robot east', () => {
      const gridBoundaryMock = new GridBoundary(GridOrigin.SW, GRID_SIZE);
      const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock);
      warehouseRobot.moveDirection(Direction.East);
      expect(warehouseRobot['x']).toEqual(1);
      expect(warehouseRobot.isWithinBoundary).toBeTruthy();
    });

    test('should move the robot west', () => {
      const gridBoundaryMock = new GridBoundary(GridOrigin.NE, GRID_SIZE);
      const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock);
      warehouseRobot.moveDirection(Direction.West);
      expect(warehouseRobot['x']).toEqual(-1);
      expect(warehouseRobot.isWithinBoundary).toBeTruthy();
    });

    test('throw invalid direction error with bad direction sequence', () => {
      const gridBoundaryMock = new GridBoundary(GridOrigin.NE, GRID_SIZE);
      const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock);

      expect(() => {
        warehouseRobot.moveDirection("bad direction" as Direction);
      }).toThrow(InvalidDirectionErr);

      expect(warehouseRobot['x']).toEqual(0);
      expect(warehouseRobot['y']).toEqual(0);
    });
  });

  describe('moveSequence', () => {
    test('should move the robot in a sequence of valid directions', () => {
      // Arrange
      const gridBoundaryMock = new GridBoundary(GridOrigin.NW, GRID_SIZE);
      const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock);

      // Act
      warehouseRobot.moveSequence([Direction.South, Direction.East, Direction.South, Direction.West]);

      // Assert
      expect(warehouseRobot.moveDirection).toBeDefined();
      expect(mockError).not.toHaveBeenCalled();
    });

    test('throw out of grid bound error', () => {
      const gridBoundaryMock = new GridBoundary(GridOrigin.NW, GRID_SIZE);
      const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock);

      expect(warehouseRobot.moveDirection).toBeDefined();
      expect(() => {
        warehouseRobot.moveSequence([Direction.South, Direction.East, Direction.West, Direction.West]);
      }).toThrow(OutOfBoundErr);
    });

    describe('should move the robot to center of grid with valid directions', () => {
      const expectedGridCenter: GridCenter = { gridCenterX: 5, gridCenterY: 5 }

      test('when reference grid origin is SW', () => {
        const gridBoundaryMock = new GridBoundary(GridOrigin.SW, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock);
        warehouseRobot.moveSequence([Direction.North, Direction.East, Direction.North, Direction.East, Direction.North, Direction.East, Direction.North, Direction.East]);

        const actualResult = gridBoundaryMock.retrieveGridCenter();

        expect(warehouseRobot.moveDirection).toBeDefined();
        expect(mockError).not.toHaveBeenCalled();
        expect(actualResult).toEqual(expectedGridCenter);
      });

      test('when referene grid origin is NE', () => {
        const gridBoundaryMock = new GridBoundary(GridOrigin.NE, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock);
        warehouseRobot.moveSequence([Direction.South, Direction.West, Direction.South, Direction.West, Direction.South, Direction.West, Direction.South, Direction.West]);

        const actualResult = gridBoundaryMock.retrieveGridCenter();

        expect(warehouseRobot.moveDirection).toBeDefined();
        expect(mockError).not.toHaveBeenCalled();
        expect(actualResult).toEqual(expectedGridCenter);
      });

      test('when reference grid origin is SE', () => {
        const gridBoundaryMock = new GridBoundary(GridOrigin.SE, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock);
        warehouseRobot.moveSequence([Direction.North, Direction.West, Direction.North, Direction.West, Direction.North, Direction.West, Direction.North, Direction.West]);

        const actualResult = gridBoundaryMock.retrieveGridCenter();

        expect(warehouseRobot.moveDirection).toBeDefined();
        expect(mockError).not.toHaveBeenCalled();
        expect(actualResult).toEqual(expectedGridCenter);
      });

      test('when reference grid origin is NW', () => {
        const gridBoundaryMock = new GridBoundary(GridOrigin.NW, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock);
        warehouseRobot.moveSequence([Direction.South, Direction.East, Direction.South, Direction.East, Direction.South, Direction.East, Direction.South, Direction.East]);

        const actualResult = gridBoundaryMock.retrieveGridCenter();

        expect(warehouseRobot.moveDirection).toBeDefined();
        expect(mockError).not.toHaveBeenCalled();
        expect(actualResult).toEqual(expectedGridCenter);
      });
    });
  });

  describe('retrieveRobotCurPosition', () => {
    describe('should return the current position of the robot', () => {
      test('when reference grid origin is SW', () => {
        const gridBoundaryMock = new GridBoundary(GridOrigin.SW, GRID_SIZE);
        const warehouseRobot = new WarehouseRobot(INITIAL_START_X, INITIAL_START_Y, gridBoundaryMock);
        const expectedResult: RobotPosition = { robotCurX: 0, robotCurY: 0 };
        warehouseRobot.moveSequence([Direction.North, Direction.East, Direction.South, Direction.West]);

        const actualResult = warehouseRobot.retrieveRobotCurPosition();

        expect(actualResult).toEqual(expectedResult);
      });
    });
  });
});
