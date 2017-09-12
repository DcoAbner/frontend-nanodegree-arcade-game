/**
 * Created by thenry on 9/11/17.
 */

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