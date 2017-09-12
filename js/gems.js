/**
 * Created by thenry on 9/11/17.
 */

//array holds the file names for different types of objects, generated at random
const GEM_TYPES = ["Heart.png", "Key.png", "Star.png", "Gem Blue.png", "Gem Orange.png", "Gem Green.png"];
const MAX_GEMS = 5; //max number of gems on screen at one time

//create Gem as subclass of GamePiece
let Gem = function(x, y, type) {
    let string = "images/";
    if (!type) {
        string += "Heart.png";
    } else {
        string += GEM_TYPES[type];
    }
    GamePiece.call(this, x*TILE_WIDTH, convertRowToY(y), string);
    this.col = x;
    this.row = y;
    this.type = type;
}

Gem.prototype = Object.create(GamePiece.prototype);
Gem.prototype.constructor = GamePiece;

//generates a new gem every 5-10 seconds; random grid coordinates and random type;\
//if there are too many gems, won't push it onto the array
function generateGems() {
    (function loop() {

        var rand = getRandomInt(5000, 10000);
        setTimeout(function() {
            let randomX = getRandomInt(0, 4);
            let randomY = getRandomInt(1, 4);
            let gemType = getRandomInt(0, 5);
            if (gems.length <= MAX_GEMS) {
                gems.push(new Gem(randomX, randomY, gemType));
            }
            loop();
        }, rand);
    }());
}

let gems = [new Gem()];