const TILE_WIDTH = 101;
const TILE_HEIGHT = 83;
const TILE_TOP_GAP = -20;

const PLAYER_STARTING_COL = 2;
const PLAYER_STARTING_ROW = 5;
const TOTAL_COLS = 5;
const TOTAL_ROWS = 6;
const GEM_TYPES = ["Heart.png", "Key.png", "Star.png", "Gem Blue.png", "Gem Orange.png", "Gem Green.png"];
const MAX_GEMS = 5; //max number on screen at one time

let playerRow = PLAYER_STARTING_ROW;
let playerCol = PLAYER_STARTING_COL;
let playerScore = 0;

const POINTS_FOR_WINNING = 1000;

const PLAYER_STARTING_X = PLAYER_STARTING_COL * TILE_WIDTH;
const PLAYER_STARTING_Y = (PLAYER_STARTING_ROW * TILE_HEIGHT) + TILE_TOP_GAP;

// Enemies our player must avoid
let Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -TILE_WIDTH;
    this.row = y;
    this.y = this.row * TILE_HEIGHT + TILE_TOP_GAP;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, index) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x  =  this.x + this.speed*dt;
    if (this.x > TILE_WIDTH * TOTAL_COLS) {
        allEnemies.splice(index,1);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = PLAYER_STARTING_X;
    this.y = PLAYER_STARTING_Y;

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(dt) {

}

//player hops from one square to another with each keypress; movement is restricted by the size of the grid
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        if (playerCol > 0) {
            playerCol -= 1;
            this.x -= TILE_WIDTH;
        }
    }
    if (key === 'right') {
        if (playerCol < (TOTAL_COLS - 1)) {
            playerCol += 1;
            this.x += TILE_WIDTH;
        }
    }
    if (key === 'down') {
        if (playerRow < TOTAL_ROWS - 1) {
            playerRow += 1;
            this.y += TILE_HEIGHT;
        }
    }
    if (key === 'up') {
        if (playerRow > 1) {  //top row is water
            playerRow -= 1;
            this.y -= TILE_HEIGHT;
        } else if (playerRow === 1) {
            playerScore += POINTS_FOR_WINNING;
            this.resetPosition();
        }
    }
}

Player.prototype.resetPosition = function() {
    this.x = PLAYER_STARTING_X;
    this.y = PLAYER_STARTING_Y;
    playerRow = PLAYER_STARTING_ROW;
    playerCol = PLAYER_STARTING_COL;

}

var Gem = function(col, row, type) {
    // this.sprite = "images/Heart.png"; //this line works
    if (!type) {
        this.sprite = "images/Heart.png"
    } else {
        this.sprite = 'images/'+GEM_TYPES[type];
    }
    this.type = type;
    this.col = col;
    this.row = row;
    this.x = this.col * TILE_WIDTH;
    this.y = this.row * TILE_HEIGHT + TILE_TOP_GAP;
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var allEnemies = [new Enemy()];
var gems = [new Gem()];

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


//prevent devault movement of window for arrow keys
document.addEventListener('keydown', function(e) {

    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        e.preventDefault();
    }
})

function generateEnemies() {

    //generates the enemies at random intervals; to stop, just add if statement around the setTimeout function
    (function loop() {
        var rand = Math.round(Math.random() * (1500 - 50)) + 50;
        setTimeout(function() {
            //alert('A');
            generateNewEnemy();
            loop();
        }, rand);
    }());

}

function generateNewEnemy() {
    //enemy speed range = 100-400;
    //enemy row range = 1-3;
    let y = getRandomInt(1,3);
    let speed = getRandomInt(100,400);
    allEnemies.push(new Enemy(y, speed));
}

function generateGems() {
    (function loop() {
        var rand = Math.round(Math.random() * (10000 - 5000)) + 5000;
        setTimeout(function() {
            let randomX = Math.round(Math.random() * (4-0)) + 0;
            let randomY = Math.round(Math.random() * (4 - 1)) + 1;
            let gemType = Math.round(Math.random() * (5-0)) + 0;
            if (gems.length <= MAX_GEMS) {
                gems.push(new Gem(randomX, randomY, gemType));
            }
            loop();
        }, rand);
    }());
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function checkCollisions() {
    let playerPosLeft = playerCol * TILE_WIDTH + 15;
    let playerPosRight = playerPosLeft + 71;
    for (let enemy of allEnemies) {
        if (playerRow == enemy.row) {

           enemyPosLeft = enemy.x+20; //add a 20px buffer
           enemyPosRight = enemyPosLeft + 71;  //add a 20 px buffer

           if (detectCollision(playerPosLeft, playerPosRight, enemyPosLeft, enemyPosRight)) {

               setTimeout(player.resetPosition(), 400); //delay before resetting position

           }

        }
    }

    gems.forEach(function(gem, index) {

        if (playerRow === gem.row && playerCol === gem.col) {
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
    ctx.textAlign = "right";
    ctx.fillText(`HIGH SCORE: ${localStorage.FROGGER_HIGH_SCORE}`, 495, 10);


}

function gemCollected(gem, index) {

    playerScore += (gem.type+1)*500;
    gems.splice(index, 1);
}


