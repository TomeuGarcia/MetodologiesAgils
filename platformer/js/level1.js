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
        this.load.image('door', 'spr_door_open_0.png');
        this.load.spritesheet('hero', 'hero.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('jumper', 'jumper.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('slime', 'slime.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('gem', 'gem.png', {frameWidth: 32, frameHeight: 32});

        this.load.spritesheet('healthUI', 'health.png', {frameWidth:128, frameHeight:28});
        this.load.image('gemUI', 'spr_gem_3.png');


        // ---- JSON ----
        this.load.setPath('assets/maps/');
        this.load.tilemapTiledJSON('level1', 'level1.json');
        this.load.json('level1JSON', 'level1.json');


        // ---- AUDIO ----
        this.load.setPath('assets/sounds/');
        this.load.audio('hitEnemy', 'smb_kick.wav');
        this.load.audio('jump', 'smb_jump-super.wav');
        this.load.audio('coin', 'smb_coin.wav');

        // ---- FONTS ----
        this.load.setPath('assets/fonts/');
        this.load.bitmapFont('gameFont', 'GameFont.png', 'GameFont.xml');
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
        this.hero = new heroPrefab(this, 65, 100, 'hero', this.cursors, 6);


        this.physics.add.collider
        (
            this.hero,
            this.walls
        );

        // Draw enemies
        this.loadEnemies();
        /*
        this.jumper = new jumperPrefab(this, 240, 304, 'jumper');
        this.physics.add.collider
        (
            this.jumper,
            this.walls
        );

        this.slime = new slimePrefab(this, 672, 268, 'slime', 400, 992);
        this.physics.add.collider
        (
            this.slime,
            this.walls
        );
        */

        this.loadAnimations();
        this.loadSounds();
        new gemPrefab(this, 100, 200, 'gem');


        this.healthUI = this.add.sprite(5, 5, 'healthUI', this.hero.health).setOrigin(0);
        this.healthUI.setScrollFactor(0, 0);

        this.gemUI = this.add.sprite(gamePrefs.GAME_WIDTH/2 - 40, -5, 'gemUI', 0).setOrigin(1,0).setScale(1.5);
        this.gemUI.setScrollFactor(0, 0);
        this.gemUIText = this.add.bitmapText(gamePrefs.GAME_WIDTH/2-50, 15, 'gameFont', 'x0', 15);
        this.gemUIText.setScrollFactor(0, 0);
        this.collectedGems = 0;

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
        
        this.anims.create
        ({
            key: 'gemRotate',
            frames: this.anims.generateFrameNumbers('gem', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        })
   
    }

    loadEnemies()
    {
        const enemiesLayer = this.cache.json.get('level1JSON').layers[6];
        const pix = 32;

        this.enemies = this.add.group();

        /*
        for (var i = 0; i < enemiesLayer.height; ++i)
        {
            for (var j = 0; j < enemiesLayer.width; ++j)
            {   
                const it = (i*enemiesLayer.width)+j;
                const enemyId = enemiesLayer.data[it];

                const pixX = j*pix;
                const pixY = i*pix;

                if (enemyId == 45)
                {
                    this.enemies.add(new jumperPrefab(this, pixX, pixY, 'jumper'));
                    //console.log("Created JUMPER at: ", pixX, pixY);
                }
                else if (enemyId == 46)
                {
                    this.enemies.add(new slimePrefab(this, pixX, pixY, 'slime', 400, 992));
                    //console.log("Created SLIME at: ", pixX, pixY);
                }
            }
        }
        */
    
        const objectsLayer = this.cache.json.get('level1JSON').layers[1].objects;
        for (var i = 0; i < objectsLayer.length; ++i)
        {
            const pixX = objectsLayer[i].x;
            const pixY = objectsLayer[i].y;

            switch(objectsLayer[i].type)
            {
                case "jumper":
                    this.enemies.add(new jumperPrefab(this, pixX, pixY, 'jumper'));
                    break;
                case "slime":
                    this.enemies.add(new slimePrefab(this, pixX, pixY, 'slime', 0, objectsLayer[i].properties[0].value));
                    break;
            }
        }
        

        this.physics.add.collider
        (
            this.enemies,
            this.walls
        );
    }

    loadSounds()
    {
        this.getGem = this.sound.add('coin');
        this.hitEnemy = this.sound.add('hitEnemy');
        this.jump = this.sound.add('jump');
        //this.jump.on('complete', () => {this.getCoin.play(); console.log("YEP");});
    }

	update()
    {
        this.hero.update();
    }


    addGems(_amount)
    {
        this.collectedGems += _amount;
        this.updateGemUICounter();
    }

    updateGemUICounter()
    {
        this.gemUIText.text = 'x' + this.collectedGems;
    }

}
