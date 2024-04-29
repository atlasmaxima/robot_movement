# Robot Movement

Move and track robots

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/atlasmaxima/robot_movement.git
    ```

2. Install dependencies:

    ```
    npm install
    ```

## Usage 

### Option 1

1. Build the project:

    ```
    npm run build
    ```

2. Start the application:

    ```
    npm start -- -h
    ```

    Example cli command: 
    ```
    npm start -- -t warehouse -o SW -s NESW
    ```

3. Run Test:

    ```
    npm run test
    ```

### Option 2

1. Login into [Container Registry](https://ghcr.io):

    ```
    docker login ghcr.io -u USERNAME
    ```

2. Pull Docker image:

    ```
    docker pull ghcr.io/atlasmaxima/robot_movement:main
    ```

3. Run Docker container:

    ```
    docker run --platform linux/amd64 -p 9000:8080 ghcr.io/atlasmaxima/robot_movement:main
    ```

4. Send a request:

    ```
    curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
    ```

    #### Request Body
    ```
        {
            "robotType": "warehouse",
            "moveSequence": "NESW",
            "gridOrigin": "SW",
            "gridSize": 10,
            "startX": 0,
            "startY": 0
        }
    ```

    #### An example request 
    ```
    curl http://your-api-endpoint -d {"robotType":"warehouse","moveSequence":"NESW","gridOrigin":"SW","gridSize":10,"startX":0,"startY":0}'
    ```