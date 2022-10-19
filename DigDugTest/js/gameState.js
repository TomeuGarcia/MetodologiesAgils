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

        this.foreground = this.add.tileSprite(gamePrefs.CELL_SIZE * gamePrefs.NUM_CELL_LEFT_OFFSET, gamePrefs.CELL_SIZE * gamePrefs.NUM_CELL_TOP_OFFSET, 
                                              gamePrefs.CELL_SIZE * gamePrefs.NUM_CELL_WIDTH, gamePrefs.CELL_SIZE * gamePrefs.NUM_CELL_HEIGHT, 
                                              'foreground').setOrigin(0);
        this.foreground.setMask(this.mask);

        this.player = this.physics.add.sprite(10, 10, 'player').setScale(1);
        this.player.body.collideWorldBounds = true;
        this.addSquareToMask();

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.grid = new Array(gamePrefs.NUM_CELL_HEIGHT);
        for (var row = 0; row < gamePrefs.NUM_CELL_HEIGHT; ++row)
        {
            this.grid[row] = new Array(gamePrefs.NUM_CELL_WIDTH);
            for (var col = 0; col < gamePrefs.NUM_CELL_WIDTH; ++col)
            {
                this.grid[row][col] = 0;
            }
        }
    }

    update()
    {
        if (this.cursorKeys.right.isDown && this.canMoveHorizontaly(this.player.y))
        {
            this.player.x += gamePrefs.PLAYER_MOVE_SPEED;
            this.addSquareToMask();
        }
        else if (this.cursorKeys.left.isDown && this.canMoveHorizontaly(this.player.y))
        {
            this.player.x -= gamePrefs.PLAYER_MOVE_SPEED;
            this.addSquareToMask();
        }
        else if (this.cursorKeys.up.isDown && this.canMoveVertically(this.player.x))
        {
            this.player.y -= gamePrefs.PLAYER_MOVE_SPEED;
            this.addSquareToMask();
        }
        else if (this.cursorKeys.down.isDown && this.canMoveVertically(this.player.x))
        {
            this.player.y += gamePrefs.PLAYER_MOVE_SPEED;
            this.addSquareToMask();
        }

        this.pixel2cell(0,0);
    }


    addSquareToMask()
    {
        shapeMask.fillRect(this.player.x - gamePrefs.HALF_PLAYER_SIDE, this.player.y - gamePrefs.HALF_PLAYER_SIDE, gamePrefs.MASK_SIDE, gamePrefs.MASK_SIDE);
    }

    canMoveHorizontaly(pixelY)
    {
        var y = pixelY % gamePrefs.CELL_SIZE;
        console.log(y);
        return y > 5 && y < 11;
    }

    canMoveVertically(pixelX)
    {
        var x = pixelX % gamePrefs.CELL_SIZE;
        return x > 5 && x < 11;
    }

    pixel2cell(pixelX, pixelY)
    {
        //(gamePrefs.NUM_CELL_LEFT_OFFSET * gamePrefs.CELL_SIZE) + 
        var x = (pixelX / gamePrefs.CELL_SIZE) % gamePrefs.CELL_SIZE;
        x > 2 || x < 6
    }

}