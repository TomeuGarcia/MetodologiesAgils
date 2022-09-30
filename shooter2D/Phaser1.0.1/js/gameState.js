

var _backgroundBack, backgroundFrontal;


class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key:'gameState'});
    }

    preload()
    {
        this.load.setPath('assets/images/');
        this.load.image('backgroundBack', 'background_back.png');
        this.load.image('backgroundFrontal', 'background_frontal.png');
        this.load.spritesheet('spaceship', 'naveAnim.png', {frameWidth:16, frameHeight: 24});
    }

    create()
    {
        this.backgroundBack = this.add.tileSprite(0, 0, config.width, config.height, 'backgroundBack').setScale(1).setOrigin(0);
        this.backgroundFrontal = this.add.tileSprite(0, 0, config.width, config.height, 'backgroundFrontal').setScale(1).setOrigin(0);

        this.spaceship = this.physics.add.sprite(config.width/2, config.height-20, 'spaceship').setScale(1);
        this.spaceship.body.collideWorldBounds=true;

        this.loadAnimations();        

        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    loadAnimations()
    {
        this.anims.create(
            {
                key:'idle',
                frames:this.anims.generateFrameNumbers('spaceship',{start:0, end:1}),
                frameRate:10,
                repeat:-1
            }
        );
        this.anims.create(
            {
                key:'left',
                frames:this.anims.generateFrameNumbers('spaceship',{start:2, end:3}),
                frameRate:10,
                repeat:-1
            }
        );
        this.anims.create(
            {
                key:'right',
                frames:this.anims.generateFrameNumbers('spaceship',{start:4, end:5}),
                frameRate:10,
                repeat:-1
            }
        );
    }

    update()
    {
        this.backgroundBack.tilePositionY -= .25;
        this.backgroundFrontal.tilePositionY -= 1;

        if (this.cursorKeys.left.isDown)
        {
            this.spaceship.anims.play('left', true);
            this.spaceship.body.velocity.x -= gamePrefs.SPACESHIP_SPEED;
        }
        else if (this.cursorKeys.right.isDown)
        {
            this.spaceship.anims.play('right', true);
            this.spaceship.body.velocity.x += gamePrefs.SPACESHIP_SPEED;
        }
        else
        {
            this.spaceship.anims.play('idle', true);
        }

        if (this.cursorKeys.up.isDown)
        {
            this.spaceship.body.velocity.y -= gamePrefs.SPACESHIP_SPEED;
        }
        else if (this.cursorKeys.down.isDown)
        {
            this.spaceship.body.velocity.y += gamePrefs.SPACESHIP_SPEED;
        }

    }


}