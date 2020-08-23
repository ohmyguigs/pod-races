// magic consts
const MIN_BOOST_DIST = 2000;
const MIN_BOOST_ANGLE = 1;
const MIN_BOOST_CHECKPOINTS = 3;

const BREAK_DIST_1 = 1300;
const BREAK_DIST_2 = 1100;
const BREAK_DIST_3 = 800;

// AUX vars
let boostAvailable = true;
let loopCount = 0;
let checkpoint = 0;
let lastCPdist = 0;
let lastChk = 0;

// AUX funcs
const getRealDist = (px, py, gx, gy) => Math.sqrt((gx - px) * (gx - px) + (gy - py) * (gy - py));
const getThrust = (dist, angle) => {
  if (angle > 90) {
    return 0;
  } else if (
    dist > MIN_BOOST_DIST &&
    boostAvailable &&
    angle <= MIN_BOOST_ANGLE &&
    checkpoint >= MIN_BOOST_CHECKPOINTS
  ) {
    boostAvailable = false;
    return 'BOOST';
  } else if (dist <= BREAK_DIST_3) {
    return 25;
  } else if (dist <= BREAK_DIST_2) {
    return 50;
  } else if (dist <= BREAK_DIST_1) {
    return 75;
  }

  return 100;
}


// game loop
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

    const realDistance = getRealDist(x,y,nextCheckpointX,nextCheckpointY);

    // checkpoint counter
    if (!lastChk && lastCPdist !== 0 && realDistance > lastCPdist) {
      checkpoint += 1;
      lastChk = 1;
    }

    if (!!lastChk && lastChk < 13) {
      lastChk += 1
    } else if (!!lastChk) {
      lastChk = 0;
    }

    lastCPdist = realDistance;

    // You have to output the target position
    // followed by the power (0 <= thrust <= 100)
    // i.e.: "x y thrust"
    const thrust = getThrust(realDistance, Math.abs(nextCheckpointAngle));

    // dis just a log
    console.error({
      loopCount,
      nextCheckpointDist,
      realDistance,
      nextCheckpointAngle,
      thrust,
      boostAvailable,
      checkpoint,
    })

    const command = `${
        nextCheckpointX
    } ${
        nextCheckpointY
    } ${
        thrust
    }`;

    // this console.log actually sends the commands
    console.log(command);
}
