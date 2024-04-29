# Robot Movement
[![Dev](https://github.com/atlasmaxima/robot_movement/actions/workflows/dev.yaml/badge.svg?branch=main)](https://github.com/atlasmaxima/robot_movement/actions/workflows/dev.yaml)

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

### Option 1 [Building and Running the Application]

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

### Option 2 [Lambda Function with Docker image]

1. Pull Docker image:

    ```
    docker pull ghcr.io/atlasmaxima/robot_movement:main
    ```

2. Run Docker container:

    ```
    docker run --platform linux/amd64 -p 9000:8080 ghcr.io/atlasmaxima/robot_movement:main
    ```

3. Send a request:

    #### Linux/Ubuntu Command:
    ```
    curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
    ```

    #### Request Body:
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

    #### An Full Example Request:
    ```
    curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"robotType":"warehouse","moveSequence":"NESW","gridOrigin":"SW","gridSize":10,"startX":0,"startY":0}'
    ```

    #### Powershell Command:

    ```
    Invoke-RestMethod -Uri "http://localhost:9000/2015-03-31/functions/function/invocations" -Method Post -Body '{}'
    ```