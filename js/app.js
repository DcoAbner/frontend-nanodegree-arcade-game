const TILE_WIDTH = 101;
const TILE_HEIGHT = 83;
const TILE_TOP_GAP = -20;

const TOTAL_COLS = 5;
const TOTAL_ROWS = 6;

const POINTS_FOR_WINNING = 1000;

const PLAYER_STARTING_X = PLAYER_STARTING_COL * TILE_WIDTH;
const PLAYER_STARTING_Y = (PLAYER_STARTING_ROW * TILE_HEIGHT) + TILE_TOP_GAP;


let player = new Player();
let allEnemies = [new Enemy()];
let gems = [new Gem()];


generateEnemies();
generateGems();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//prevent default movement of window for arrow keys when they are pressed
document.addEventListener('keydown', function(e) {

    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        e.preventDefault();
    }
})

//helper function to generate a random integer when given min/max value
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//checks for all collisions (between players, enemies/gems
function checkCollisions() {
    let playerPosLeft = playerCol * TILE_WIDTH + 15; //reduces detection width of player sprite on the left
    let playerPosRight = playerPosLeft + 71; //reduces detection width on the right

    //loops through all enemies, if in same row as player will then check for collision
    for (let enemy of allEnemies) {
        if (playerRow == enemy.row) {

           enemyPosLeft = enemy.x+20; //add a 20px buffer to reduce enemy size
           enemyPosRight = enemyPosLeft + 71;  //add a 20 px buffer

           if (detectCollision(playerPosLeft, playerPosRight, enemyPosLeft, enemyPosRight)) {
               setTimeout(player.resetPosition(), 400); //delay before resetting position
           }
        }
    }

    //checks to see if row/column match and collects gem
    gems.forEach(function(gem, index) {
        if (playerRow === gem.row && playerCol === gem.col && gem.type != 6) {
            gemCollected(gem, index);
        }
    })
}

//give the left and right coordinates of player and an object (enemy or other) and will detect collision
function detectCollision(playerPosLeft, playerPosRight, objectPostLeft, objectPosRight) {
    if ((objectPostLeft > playerPosLeft && objectPostLeft <playerPosRight) ||
        (objectPosRight > playerPosLeft && objectPostLeft <playerPosRight) ||
        (objectPostLeft < playerPosLeft && objectPosRight > playerPosRight)) {
        if (playerScore > localStorage.FROGGER_HIGH_SCORE) {
            localStorage.FROGGER_HIGH_SCORE = playerScore;
        }
        playerScore = 0;
        return true;
    } else {
        return false;
    }
}

//draws score on top of canvas (active score on left; high score on the right) high score stored in localStorage
function updateScore(score) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 505, 60);

    //current score
    ctx.fillStyle = "red";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = "24px Arial";
    ctx.fillText(`Score: ${score}`, 10, 10);

    //high score
    if (playerScore > localStorage.FROGGER_HIGH_SCORE) {
        localStorage.FROGGER_HIGH_SCORE = playerScore;
    }
    ctx.textAlign = "right";
    ctx.fillText(`HIGH SCORE: ${localStorage.FROGGER_HIGH_SCORE}`, 495, 10);
}

//adds score for gem and splices gem from array
function gemCollected(gem, index) {
    playerScore += (gem.type+1)*500;
    gems.splice(index, 1);
}