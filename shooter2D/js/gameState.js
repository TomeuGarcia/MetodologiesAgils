

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
        this.load.image('bullet', 'spr_bullet_0.png');
        this.load.spritesheet('enemySpaceship', 'enemy-medium.png', {frameWidth:32, frameHeight:16});
    }

    create()
    {
        this.backgroundBack = this.add.tileSprite(0, 0, config.width, config.height, 'backgroundBack').setScale(1).setOrigin(0);
        this.backgroundFrontal = this.add.tileSprite(0, 0, config.width, config.height, 'backgroundFrontal').setScale(1).setOrigin(0);

        this.spaceship = this.physics.add.sprite(config.width/2, config.height-20, 'spaceship').setScale(1);
        this.spaceship.body.collideWorldBounds=true;

        this.loadPools();
        this.loadAnimations();        

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.shootingTimer = this.time.addEvent(
            {
                delay: 200,
                callback: this.createBullet,
                callbackScope: this,
                repeat: -1
            }
        );

        this.enemySpawnTimer = this.time.addEvent(
            {
                delay: 2000,
                callback: this.createEnemy,
                callbackScope: this,
                repeat: -1
            }
        )

        this.physics.add.overlap(
            this.bulletPool,
            this.enemyPool,
            this.killEnemy,
            null,
            this
        )
    }

    createBullet()
    {
        var _bullet = this.bulletPool.getFirst(false);
        if (!_bullet){ // detects if the 1st bullet is out of screen
            console.log('create bullet');
            _bullet = new bulletPrefab(this, this.spaceship.x, this.spaceship.y - 12, 'bullet');
            this.bulletPool.add(_bullet);
        }
        else {
            console.log('reset bullet');
            _bullet.active = true;
            _bullet.body.reset(this.spaceship.x, this.spaceship.y - 12);
        }

        _bullet.body.setVelocityY(gamePrefs.SPEED_BULLET);
    }

    createEnemy()
    {
        var _enemy = this.enemyPool.getFirst(false);
        var posX = Phaser.Math.Between(16, config.width - 16);
        var posY = -16;

        if (!_enemy)
        {
            console.log('create enemy');
            _enemy = new enemyPrefab(this, posX, posY, 'enemySpaceship');
            this.enemyPool.add(_enemy)
        }
        else
        {
            console.log('reset enemy');
            _enemy.active = true;
            _enemy.body.reset(posX, posY, 'enemySpaceship');
        }

        _enemy.body.setVelocityY(gamePrefs.SPEED_ENEMY);
        //_enemy.anims.play('enemySpaceshipAnim');
    }


    killEnemy(_bullet, _enemy)
    {
        _bullet.setActive(false);
        _bullet.y = -100;

        _enemy.setActive(false);
        _enemy.y = -100;
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        this.enemyPool = this.physics.add.group();
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


        this.anims.create(
            {
                key:'enemySpaceshipAnim',
                frames:this.anims.generateFrameNumbers('enemySpaceship', {start:0, end:1}),
                frameRate:10,
                repeat:-1
            }
        )
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
            if (this.spaceship.body.velocity.x > gamePrefs.SPACESHIP_BRAKE){
                this.spaceship.body.velocity.x -= gamePrefs.SPACESHIP_BRAKE;
            }
            else if (this.spaceship.body.velocity.x < -gamePrefs.SPACESHIP_BRAKE) {
                this.spaceship.body.velocity.x += gamePrefs.SPACESHIP_BRAKE;
            }
            else {this.spaceship.body.velocity.x = 0;}
            
        }

        if (this.cursorKeys.up.isDown)
        {
            this.spaceship.body.velocity.y -= gamePrefs.SPACESHIP_SPEED;
        }
        else if (this.cursorKeys.down.isDown)
        {
            this.spaceship.body.velocity.y += gamePrefs.SPACESHIP_SPEED;
        }
        else
        {
            if (this.spaceship.body.velocity.y > gamePrefs.SPACESHIP_BRAKE){
                this.spaceship.body.velocity.y -= gamePrefs.SPACESHIP_BRAKE;
            }
            else if (this.spaceship.body.velocity.y < -gamePrefs.SPACESHIP_BRAKE) {
                this.spaceship.body.velocity.y += gamePrefs.SPACESHIP_BRAKE;
            }
            else {this.spaceship.body.velocity.y = 0;}
        }

    }


}