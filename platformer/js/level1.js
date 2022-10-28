class level1 extends Phaser.Scene
{

	constructor()
    {
        super({key:'level1'});
    }

	preload()
    {
        this.load.setPath('assets/tilesets/');
        this.load.image('walls', 'tileset_walls.png');
        this.load.image('moss', 'tileset_moss.png');
        //this.load.spritesheet('enemy','enemy-medium.png', {frameWidth:32,frameHeight:16});

        this.load.setPath('assets/sprites/');
        this.load.image('bg_green', 'bg_green_tile.png');
        this.load.image('door', 'spr_door_open_0.png');
        this.load.image('hero', 'spr_yellow_idle_0.png');

        this.load.setPath('assets/maps/');
        this.load.tilemapTiledJSON('level1', 'level1.json');
    }

	create()
    {
        // Render background
        this.bg = this.add.tileSprite(0,0,gamePrefs.LEVEL1_WIDTH, gamePrefs.LEVEL1_HEIGHT, 'bg_green').setOrigin(0);

        // Render level
        // Load JSON
        this.map = this.add.tilemap('level1');
        // Load tilesets
        this.map.addTilesetImage('walls');
        this.map.addTilesetImage('moss');
        // Render layers
        this.walls = this.map.createLayer('layer_walls', 'walls');
        this.map.createLayer('layer_moss_top', 'moss');
        this.map.createLayer('layer_moss_bottom', 'moss');
        this.map.createLayer('layer_moss_right', 'moss');
        this.map.createLayer('layer_moss_left', 'moss');

        // Render door
        this.door = this.physics.add.sprite(65,268, 'door');
        this.door.body.allowGravity = false;
        this.door.body.setImmovable(true);

        // Render hero
        this.hero = this.physics.add.sprite(65, 100, 'hero');

        this.physics.add.collider(
            this.door,
            this.hero,
        )

        this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        //this.map.setCollisionExcluding(-1,true,true,'layer_walls');
        this.physics.add.collider(
            this.walls,
            this.hero,
        )



       this.loadAnimations();

       this.cursores = this.input.keyboard.createCursorKeys();
        
       /*
       this.cursores.space.on
       (
        'up',
        function()
        {
            this.createBullet();            
        },
        this
       );
       */
       /*
       this.shootingTimer = this.time.addEvent(
        {
            delay: 1000,
            callback: this.createBullet,
            callbackScope: this,
            repeat: -1
        });
        */
        this.enemyTimer = this.time.addEvent
        (
            {
                delay:2000, //ms
                callback:this.createEnemy,
                callbackScope:this,
                repeat: -1
            }
        );

        this.physics.add.overlap
        (
            this.bulletPool,
            this.enemyPool,
            this.killEnemy,
            null,
            this
        );

        this.physics.add.overlap
        (
            this.nave,
            this.powerUps,
            this.pickPowerUp,
            null,
            this
        );
        
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        this.enemyBulletPool = this.physics.add.group();
        this.enemyPool = this.physics.add.group();
        this.powerUps = this.physics.add.group();
    }

    loadAnimations()
    {
        this.anims.create({
            key: 'standPowerUp1',
            frames: this.anims.generateFrameNumbers('powerUp1', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
        /*
        this.anims.create
        ({
            key:'idle',
            frames:this.anims.generateFrameNumbers('nave',{start:0,end:1}),
            frameRate:10,
            repeat:-1
        });
        */
        this.anims.create
        ({
            key:'left',
            frames:this.anims.generateFrameNumbers('nave',{start:2,end:3}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create
        ({
            key:'right',
            frames:this.anims.generateFrameNumbers('nave',{start:4,end:5}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create({
            key: 'idleEnemy',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
    }

	update()
    {

    }
}
