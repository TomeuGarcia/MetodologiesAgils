var gamePrefs=
{
    HERO_JUMP: 450,
    HERO_SPEED: 200,
    ENEMY_SPEED: 100,
    GRAVITY: 1000,
    GAME_WIDTH:960,
    GAME_HEIGHT:540,
    LEVEL1_WIDTH:1280,
    LEVEL1_HEIGHT:800
}

var config =
{
    type: Phaser.AUTO,
    width: gamePrefs.GAME_WIDTH,
    height: gamePrefs.GAME_HEIGHT,
    scene:[level1],
    render:
    {
        pixelArt:true
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
            gravity:{y:gamePrefs.GRAVITY},
            debug:false
        }
    }
}

var juego = new Phaser.Game(config);