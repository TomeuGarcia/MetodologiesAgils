

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
        this.load.image('enemyBullet', 'spr_enemy_bullet_0.png');
        this.load.spritesheet('powerUp', 'spr_power_up.png', {frameWidth:16, frameHeight:16});
    }

    create()
    {
        this.backgroundBack = this.add.tileSprite(0, 0, config.width, config.height, 'backgroundBack').setScale(1).setOrigin(0);
        this.backgroundFrontal = this.add.tileSprite(0, 0, config.width, config.height, 'backgroundFrontal').setScale(1).setOrigin(0);

        this.spaceship = this.physics.add.sprite(config.width/2, config.height-20, 'spaceship').setScale(1);
        this.spaceship.body.collideWorldBounds=true;

        this.loadPools();
        this.loadAnimations();        

        this.canShoot = true;

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.cursorKeys.space.on('up', function(event)
            {
                if (this.canShoot)
                    this.createBullet();
            }, this
        )

        this.enemySpawnTimer = this.time.addEvent(
            {
                delay: 2000,
                callback: this.createEnemy,
                callbackScope: this,
                repeat: -1
            }
        )
        this.autoShootBulletsTimer = this.time.addEvent(
            {
                delay: 200,
                callback: this.createBullet,
                callbackScope: this,
                repeat: -1
            }
        );
        this.autoShootBulletsTimer.paused = true;
        this.powerUpDurationTimer = this.time.addEvent(
            {
                delay: 10000,
                callback: this.stopAutoShoot,
                callbackScope: this,
                repeat: -1
            }
        );
        this.powerUpDurationTimer.paused = true;


        this.physics.add.overlap(
            this.bulletPool,
            this.enemyPool,
            this.hitEnemy,
            null,
            this
        )
        this.physics.add.overlap(
            this.enemyBulletPool,
            this.spaceship,
            this.hitPlayer,
            null,
            this
        )
        this.physics.add.overlap(
            this.powerUpPool,
            this.spaceship,
            this.startAutoShoot,
            null,
            this
        )

    }

    createBullet()
    {
        var _bullet = this.bulletPool.getFirst(false);
        var _posX = this.spaceship.x;
        var _posY = this.spaceship.y - 12;

        if (!_bullet){ // detects if the 1st bullet is out of screen
            _bullet = new bulletPrefab(this, _posX, _posY, 'bullet');
            this.bulletPool.add(_bullet);
        }
        else {
            _bullet.active = true;
            _bullet.body.reset(_posX, _posY);
        }

        _bullet.body.setVelocityY(gamePrefs.SPEED_BULLET);
    }

    createEnemy()
    {
        var _enemy = this.enemyPool.getFirst(false);
        var _posX = Phaser.Math.Between(16, config.width - 16);
        var _posY = -16;

        if (!_enemy)
        {
            _enemy = new enemyPrefab(this, _posX, _posY, 'enemySpaceship', 2);
            this.enemyPool.add(_enemy);
        }
        else
        {
            _enemy.active = true;
            _enemy.resetLives();
            _enemy.resumeShooting();
            _enemy.body.reset(_posX, _posY, 'enemySpaceship');
        }

        _enemy.body.setVelocityY(gamePrefs.SPEED_ENEMY);
    }

    createEnemyBullet(_enemySpaceship)
    {
        var _enemyBullet = this.enemyBulletPool.getFirst(false);
        var _posX = _enemySpaceship.x;
        var _posY = _enemySpaceship.y;

        if (!_enemyBullet) {
            _enemyBullet = new enemyBulletPrefab(this, _posX, _posY, 'enemyBullet');
            this.enemyBulletPool.add(_enemyBullet);
        }
        else {
            _enemyBullet.active = true;
            _enemyBullet.body.reset(_posX, _posY);
        }

        _enemyBullet.body.setVelocityY(-gamePrefs.SPEED_BULLET);
    }

    createPowerUp(_posX, _posY)
    {
        var _powerUp = this.powerUpPool.getFirst(false);

        if (!_powerUp) {
            _powerUp = new powerUpPrefab(this, _posX, _posY, 'powerUp');
            this.powerUpPool.add(_powerUp);
        }
        else {
            _powerUp.active = true;
            _powerUp.body.reset(_posX, _posY);
        }

        _powerUp.body.setVelocityY(gamePrefs.SPEED_POWERUP);
    }

    hitEnemy(_bullet, _enemy)
    {
        _bullet.setActive(false);
        _bullet.y = -100;

        var _wasAlive = !_enemy.isDead();
        _enemy.takeDamage(1);
        if (_enemy.isDead() && _wasAlive)
        {
            if (!Phaser.Math.Between(0, 2))
            {
                this.createPowerUp(_enemy.x, _enemy.y);
            }     

            _enemy.stopShooting();
            _enemy.setActive(false);
            _enemy.y = -100;
        }        
    }

    hitPlayer(_spaceship, _enemyBullet)
    {
        console.log('player hit');

        _enemyBullet.setActive(false);
        _enemyBullet.y = config.height + 100;
    }

    startAutoShoot(_spaceship, _powerUp)
    {
        this.autoShootBulletsTimer.paused = false;
        this.powerUpDurationTimer.paused = false;

        this.canShoot = false;
    }

    stopAutoShoot()
    {
        this.autoShootBulletsTimer.paused = true;
        this.powerUpDurationTimer.paused = true;

        this.canShoot = true;
    }


    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        this.enemyPool = this.physics.add.group();
        this.enemyBulletPool = this.physics.add.group();
        this.powerUpPool = this.physics.add.group();
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
        );

        this.anims.create(
            {
                key: 'powerUpAnim',
                frames: this.anims.generateFrameNumbers('powerUp', {start:0, end:1}),
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