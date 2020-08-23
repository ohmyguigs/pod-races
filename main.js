/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/


// game loop
let didBoost = false;
let loopCount = 0;
let breakCount = 0;

while (true) {
    loopCount += 1;
    var inputs = readline().split(' ');
    const x = parseInt(inputs[0]);
    const y = parseInt(inputs[1]);
    const nextCheckpointX = parseInt(inputs[2]); // x position of the next check point
    const nextCheckpointY = parseInt(inputs[3]); // y position of the next check point
    const nextCheckpointDist = parseInt(inputs[4]); // distance to the next checkpoint
    const nextCheckpointAngle = parseInt(inputs[5]); // angle between your pod orientation and the direction of the next checkpoint
    var inputs = readline().split(' ');
    const opponentX = parseInt(inputs[0]);
    const opponentY = parseInt(inputs[1]);

    // You have to output the target position
    // followed by the power (0 <= thrust <= 100)
    // i.e.: "x y thrust"
    const MIN_SPEED = 5;
    let thrust = MIN_SPEED;
    const ANGLE = Math.abs(nextCheckpointAngle);

    if (ANGLE < 82) {
        if (nextCheckpointDist <= 1600) {
            breakCount += 1;
            thurst = MIN_SPEED;
        } else {
            thrust = 100;
            breakCount = 0;
        }
    } else {
        breakCount += 1;
        thurst = MIN_SPEED;
    }

    // break for too long
    if (breakCount >= 3) {
        breakCount = 0;
        thrust = 100;
    }

    let shouldBoost = false;
    if (
        !didBoost &&
        nextCheckpointDist > 8000 &&
        ANGLE <= 3
        && loopCount > 150
    ) {
        shouldBoost = 'BOOST';
        didBoost = true;
    }

    console.error({
        nextCheckpointDist,
        nextCheckpointAngle,
        thrust: shouldBoost || thrust,
        didBoost,
        loopCount,
        breakCount,
    })

    const command = `${
        nextCheckpointX
    } ${
        nextCheckpointY
    } ${
        shouldBoost || thrust
    }`;
    console.log(command);
}
