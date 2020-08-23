/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/


// game loop
let didBoost = false;
let loopCount = 0;
let breakCount = 0;
let checkpoint = 0;
let lastCPdist = 0;
let lastChk = 0;

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

    // checkpoint counter
    if (!lastChk && lastCPdist !== 0 && nextCheckpointDist > lastCPdist) {
      checkpoint += 1;
      lastChk = 1;
    }

    if (!!lastChk && lastChk < 13) {
      lastChk += 1
    } else if (!!lastChk) {
      lastChk = 0;
    }

    lastCPdist = nextCheckpointDist;

    // You have to output the target position
    // followed by the power (0 <= thrust <= 100)
    // i.e.: "x y thrust"
    const MIN_SPEED = 7;
    let thrust = MIN_SPEED;
    const ANGLE = Math.abs(nextCheckpointAngle);
    const TOO_CLOSE = opponentX < 1000 || opponentY < 1000

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
        !didBoost
        && nextCheckpointDist > 8000
        && ANGLE <= 3
        && checkpoint >= 7
    ) {
        shouldBoost = 'BOOST';
        didBoost = true;
    }

    console.error({
      loopCount,
      nextCheckpointDist,
      nextCheckpointAngle,
      thrust: shouldBoost || thrust,
      didBoost,
      breakCount,
      checkpoint,
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
