var shapeMask;

class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key:'gameState'});
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("#000");

        this.load.setPath('assets/images/');
        this.load.image('foreground', 'foreground.png');
        this.load.image('player', 'digDugGuy.png');
    }

    create()
    {
        shapeMask = this.make.graphics();
        shapeMask.fillStyle(0xffffff);
        shapeMask.beginPath();

        this.mask = shapeMask.createGeometryMask().setInvertAlpha(true);

        this.foreground = this.add.tileSprite(0, 0, config.width, config.height, 'foreground').setOrigin(0);
        this.foreground.setMask(this.mask);

        this.player = this.physics.add.sprite(10, 10, 'player').setScale(1);
        this.player.body.collideWorldBounds = true;
        this.addSquareToMask();

        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        if (this.cursorKeys.right.isDown)
        {
            this.player.x += gamePrefs.PLAYER_MOVE_SPEED;
            this.addSquareToMask();
        }
        else if (this.cursorKeys.left.isDown)
        {
            this.player.x -= gamePrefs.PLAYER_MOVE_SPEED;
            this.addSquareToMask();
        }
        else if (this.cursorKeys.up.isDown)
        {
            this.player.y -= gamePrefs.PLAYER_MOVE_SPEED;
            this.addSquareToMask();
        }
        else if (this.cursorKeys.down.isDown)
        {
            this.player.y += gamePrefs.PLAYER_MOVE_SPEED;
            this.addSquareToMask();
        }
    }


    addSquareToMask()
    {
        shapeMask.fillRect(this.player.x - gamePrefs.HALF_PLAYER_SIDE, this.player.y - gamePrefs.HALF_PLAYER_SIDE, gamePrefs.MASK_SIDE, gamePrefs.MASK_SIDE);
    }

}