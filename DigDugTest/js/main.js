


var gamePrefs =
{
    PLAYER_MOVE_SPEED: 0.8,
    HALF_PLAYER_SIDE: 7,
    MASK_SIDE: 14,
    CELL_SIZE: 16,
    NUM_CELL_WIDTH: 12,
    NUM_CELL_HEIGHT: 12,
    NUM_CELL_LEFT_OFFSET: 1,
    NUM_CELL_TOP_OFFSET: 3
}

var config = 
{
    type: Phaser.AUTO,
    width: 256, // window.innerWidth
    height: 256,  // window.innerHeight
    scene:[gameState], // levels/screens/scenes array
    render:
    {
        pixelArt: true
    },
    scale: 
    {
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            gravity:{y:0},
            //debug:true 
        }
    }

}


var game = new Phaser.Game(config);