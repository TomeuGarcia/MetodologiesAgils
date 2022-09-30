

var gamePrefs =
{
    SPACESHIP_SPEED: 2
}


var config = 
{
    type: Phaser.AUTO,
    width: 128, // window.innerWidth
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
            debug:true
        }
    }

}


var game = new Phaser.Game(config);