

var gamePrefs =
{
    SPACESHIP_SPEED: 4,
    SPACESHIP_BRAKE: 5,
    SPEED_BULLET: -100,
    SPEED_ENEMY: 50,
    SPEED_POWERUP: 30
}


var config = 
{
    type: Phaser.AUTO,
    width: 128, // window.innerWidth
    height: 256,  // window.innerHeight
    scene:[menu, gameState], // levels/screens/scenes array
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