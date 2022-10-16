


var gamePrefs =
{
    PLAYER_MOVE_SPEED: 2,
    HALF_PLAYER_SIDE: 7,
    MASK_SIDE: 14
}

var config = 
{
    type: Phaser.AUTO,
    width: 192, // window.innerWidth
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