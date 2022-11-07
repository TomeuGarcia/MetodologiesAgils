class level1 extends Phaser.Scene{
	constructor()
    {
        super({key:'level1'});
    }
	preload()
    {
        this.load.setPath('assets/tilesets/');
        this.load.image('walls','tileset_walls.png');
        this.load.image('moss','tileset_moss.png');
        
        this.load.setPath('assets/sprites/');
        this.load.image('bg_green','bg_green_tile.png');
        this.load.image('door','spr_door_open_0.png');
        
        this.load.spritesheet('hero', 'hero.png', {frameWidth: 32, frameHeight: 32});

        this.load.spritesheet('enemyJumper', 'jumper.png', {frameWidth:32, frameHeight:32});


        this.load.setPath('assets/maps/');
        this.load.tilemapTiledJSON('level1','level1.json');
    }

	create()
    {
        //Render background
        this.bg = this.add.tileSprite(0,0,gamePrefs.LEVEL1_WIDTH, gamePrefs.LEVEL1_HEIGHT,'bg_green').setOrigin(0);

        // Render level steps:
        // Load JSON
        this.map = this.add.tilemap('level1');
        // Load TILESETS
        this.map.addTilesetImage('walls');
        this.map.addTilesetImage('moss');
        // render Layers
        this.walls = this.map.createLayer('layer_walls','walls');
        this.map.createLayer('layer_moss_top','moss');
        this.map.createLayer('layer_moss_left','moss');
        this.map.createLayer('layer_moss_right','moss');
        this.map.createLayer('layer_moss_bottom','moss');

        //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        this.map.setCollisionByExclusion(-1,true,true,'layer_walls');


        // Render door
        this.door = this.physics.add.sprite(65,268,'door');
        this.door.body.allowGravity = false;
        this.door.body.setImmovable(true);


        this.cursors = this.input.keyboard.createCursorKeys();

        // Render hero
        this.hero = new heroPrefab(this, 65, 100, 'hero', this.cursors);
        

        /*
        this.physics.add.collider
        (
            this.door,
            this.hero
        );
        */

        this.physics.add.collider
        (
            this.walls,
            this.hero
        );

        this.loadAnimations();
       
        this.jumper = new jumperPrefab(this, 240, 304, 'enemyJumper');
        this.physics.add.collider
        (
            this.walls,
            this.jumper
        );


        this.cameras.main.startFollow(this.hero);
        this.cameras.main.setBounds(0, 0, gamePrefs.LEVEL1_WIDTH, gamePrefs.LEVEL1_HEIGHT);

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
        this.physics.add.overlap
        (
            this.bulletPool,
            this.enemyPool,
            this.killEnemy,
            null,
            this
        );
        */
        
        
    }


    loadAnimations()
    {
        this.anims.create(
            {
                key: 'heroRun',
                frmaes: this.anims.generateFrameNumbers('hero', {start:2, end:5}),
                frameRate: 10,
                repeat: -1
            }
        );

        this.anims.create(
            {
                key: 'jumperIdle',
                frmaes: this.anims.generateFrameNumbers('jumperEnemy', {start:0, end:3}),
                frameRate: 10,
                repeat: -1
            }
        );

    }

	update()
    {

        /*
        if(this.cursores.left.isDown){            			
            this.nave.anims.play('left',true);
            this.hero.body.velocity
			this.nave.body.velocity.x -=gamePrefs.SPEED_NAVE;
		} else if(this.cursores.right.isDown){            
			this.nave.anims.play('right',true);           
            //this.nave.x +=gamePrefs.SPEED_NAVE;
            this.nave.body.velocity.x += gamePrefs.SPEED_NAVE;        
		} else{
			this.nave.anims.play('idle',true);
			//this.nave.body.velocity.x=0;
		}
        */
    }

}
