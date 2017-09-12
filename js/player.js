/**
 * Created by thenry on 9/11/17.
 */

const PLAYER_STARTING_COL = 2;
const PLAYER_STARTING_ROW = 5;

let playerRow = PLAYER_STARTING_ROW;
let playerCol = PLAYER_STARTING_COL;

if (!localStorage.FROGGER_HIGH_SCORE) {
    localStorage.setItem('FROGGER_HIGH_SCORE', 0);
}

let playerScore = 0;

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

//puts player back at starting location
Player.prototype.resetPosition = function() {
    this.x = PLAYER_STARTING_X;
    this.y = PLAYER_STARTING_Y;
    playerRow = PLAYER_STARTING_ROW;
    playerCol = PLAYER_STARTING_COL;
}