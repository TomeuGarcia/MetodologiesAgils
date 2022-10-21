

class menu extends Phaser.Scene
{
    constructor()
    {
        super({key: "menu"});
    }

    preload()
    {
        this.load.setPath('assets/images/');
        this.load.image('backgroundBack', 'background_back.png');
        this.load.image('backgroundFrontal', 'background_frontal.png');
        this.load.spritesheet('spaceship', 'naveAnim.png', {frameWidth:16, frameHeight: 24});
        this.load.image('playButton', 'btn.png');
    }

    create()
    {
        this.backgroundBack = this.add.tileSprite(0, 0, config.width, config.height, 'backgroundBack').setScale(1).setOrigin(0);
        this.backgroundFrontal = this.add.tileSprite(0, 0, config.width, config.height, 'backgroundFrontal').setScale(1).setOrigin(0);

        this.spaceship = this.physics.add.sprite(config.width/2, config.height/2, 'spaceship').setScale(1);
        this.spaceship.body.collideWorldBounds=true;

        this.anims.create(
            {
                key:'idle',
                frames:this.anims.generateFrameNumbers('spaceship',{start:0, end:1}),
                frameRate:10,
                repeat:-1
            }
        );
        this.spaceship.anims.play('idle');

        this.title = this.add.text(
            config.width/2, 
            config.height/4,
            'Shooter 2D',
            {
                fontFamily: 'Arial',
                fill: '#43d637',
                stroke: '#ffffff',
                strokeThickness: 4
            }
        ).setOrigin(.5);

        this.playButton = this.add.image(config.width/2, config.height*3/4,'playButton').setScale(.25).
        setInteractive({useHandCursor:true})
        .on(
            'pointerdown',
            this.startGame,
            this
        );
    }

    update()
    {
        this.backgroundBack.tilePositionY -= .25;
        this.backgroundFrontal.tilePositionY -= 1;
    }


    startGame()
    {
        this.playButton.destroy();
        this.add.tween(
            {
                targets: [this.title],
                duration: 2000,
                alpha: 0
            }
        );
        this.add.tween(
            {
                targets: [this.spaceship],
                duration: 3000,
                y: config.height-20,
                onComplete: this.changeScene,
                onCompleteScope: this
            }
        )
    }

    changeScene()
    {
        this.scene.start('gameState');
    }

}