/**
 * Created by thenry on 9/11/17.
 */

//create Enemy as subclass of GamePiece
//x will always be 1 tile width to left of screen; Y is row (converted in call to the pixel)
let Enemy = function(y, speed) {
    GamePiece.call(this, -TILE_WIDTH, convertRowToY(y), 'images/enemy-bug.png');
    this.speed = speed;
    this.row = y;
}

Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.constructor = GamePiece;

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

//generates the enemies at random intervals; to stop, just add if statement around the setTimeout function
function generateEnemies() {

    (function loop() {
        var rand = getRandomInt(50, 1500);
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

let allEnemies = [new Enemy()];