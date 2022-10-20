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

        this.player = this.physics.add.sprite(gamePrefs.HALF_PLAYER_SIDE, gamePrefs.HALF_PLAYER_SIDE, 'player').setScale(1);
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


        this.moveX = 0;
        this.moveY = 0;
        this.lastMoveX = 0;
        this.lastMoveY = 0;

    }

    update()
    {
        this.getInputs();

        if (this.canMoveHorizontaly())
        {
            this.player.x += this.moveX;
            this.addSquareToMask();
        }
        if (this.canMoveVertically())
        {
            this.player.y += this.moveY;
            this.addSquareToMask();
        }
    }


    getInputs()
    {
        this.moveX = 0;
        this.moveY = 0;

        if (this.cursorKeys.right.isDown) this.moveX += gamePrefs.PLAYER_MOVE_SPEED;
        if (this.cursorKeys.left.isDown) this.moveX -= gamePrefs.PLAYER_MOVE_SPEED;

        if (this.cursorKeys.up.isDown) this.moveY -= gamePrefs.PLAYER_MOVE_SPEED;
        if (this.cursorKeys.down.isDown) this.moveY += gamePrefs.PLAYER_MOVE_SPEED;
    }

    addSquareToMask()
    {
        shapeMask.fillRect(this.player.x - gamePrefs.HALF_PLAYER_SIDE, this.player.y - gamePrefs.HALF_PLAYER_SIDE, gamePrefs.MASK_SIDE, gamePrefs.MASK_SIDE);
    }

    canMoveHorizontaly()
    {
        return this.canMove(this.player.y);
    }

    canMoveVertically()
    {
        return this.canMove(this.player.x);
    }

    canMove(pixel)
    {
        var p = pixel % gamePrefs.CELL_SIZE;
        return p > ((gamePrefs.CELL_SIZE / 2) -2) && p < ((gamePrefs.CELL_SIZE / 2) +2);
    }

    pixel2cell(pixelX, pixelY)
    {
        //(gamePrefs.NUM_CELL_LEFT_OFFSET * gamePrefs.CELL_SIZE) + 
        var x = (pixelX / gamePrefs.CELL_SIZE) % gamePrefs.CELL_SIZE;
        x > 2 || x < 6
    }

}