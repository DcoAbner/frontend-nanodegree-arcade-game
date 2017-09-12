/**
 * Created by thenry on 9/11/17.
 */

//array holds the file names for different types of objects, generated at random
const GEM_TYPES = ["Heart.png", "Key.png", "Star.png", "Gem Blue.png", "Gem Orange.png", "Gem Green.png"];
const MAX_GEMS = 5; //max number of gems on screen at one time

var Gem = function(col, row, type) {
    //default if type not yet provided
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