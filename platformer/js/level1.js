class level1 extends Phaser.Scene
{
	constructor()
    {
        super({key:'level1'});
    }

	preload()
    {
        this.load.setPath('assets/tilesets/');
        this.load.image('walls','tileset_walls.png'); // MUST HAVE SAME 
        this.load.image('moss','tileset_moss.png');   // TAG AS IN TILED
        
        this.load.setPath('assets/sprites/');
        this.load.image('bg_green', 'bg_green_tile.png');
        this.load.image('door', 'spr_door_closed_0.png');
        this.load.spritesheet('hero', 'hero.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('jumper', 'jumper.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('slime', 'slime.png', {frameWidth: 32, frameHeight: 32});

        this.load.setPath('assets/maps/');
        this.load.tilemapTiledJSON('level1', 'level1.json');
    }

	create()
    {
        // Draw background
        this.bg = this.add.tileSprite(0, 0, gamePrefs.LEVEL1_WIDTH, gamePrefs.LEVEL1_HEIGHT, 'bg_green').setOrigin(0);

        // Draw Level
        // Load the JSON
        this.map = this.add.tilemap('level1');
        // Load tilesets
        this.map.addTilesetImage('walls');
        this.map.addTilesetImage('moss');
        // Draw the layers
        this.walls = this.map.createLayer('layer_walls', 'walls');
        this.map.createLayer('layer_moss_right', 'moss');
        this.map.createLayer('layer_moss_top', 'moss');
        this.map.createLayer('layer_moss_left', 'moss');
        this.map.createLayer('layer_moss_bottom', 'moss');

        //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        this.map.setCollisionBetween(1, 11, true, true, 'layer_walls');

        // Draw door
        this.door = this.physics.add.sprite(65, 268, 'door');
        this.door.body.allowGravity = false;
        this.door.body.setImmovable(true);


        this.cursors = this.input.keyboard.createCursorKeys();
        // Draw hero
        this.hero = new heroPrefab(this, 65, 100, 'hero', this.cursors);

        this.physics.add.collider
        (
            this.hero,
            this.walls
        );

        // Draw enemies
        this.jumper = new jumperPrefab(this, 240, 304, 'jumper');
        this.physics.add.collider
        (
            this.jumper,
            this.walls
        );

        this.slime = new slimePrefab(this, 440, 200, 'slime');
        this.physics.add.collider
        (
            this.slime,
            this.walls
        );

        this.loadAnimations();
        
        this.cameras.main.startFollow(this.hero);
        this.cameras.main.setBounds(0, 0, gamePrefs.LEVEL1_WIDTH, gamePrefs.LEVEL1_HEIGHT);
    }


    loadAnimations()
    {
        this.anims.create
        ({
            key:'run',
            frames: this.anims.generateFrameNumbers('hero', {start: 2, end: 5}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create
        ({
            key: 'jumperWalk',
            frames: this.anims.generateFrameNumbers('jumper', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create
        ({
            key: 'slimeWalk',
            frames: this.anims.generateFrameNumbers('slime', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })
    }

	update()
    {
        this.hero.update();
    }

}
