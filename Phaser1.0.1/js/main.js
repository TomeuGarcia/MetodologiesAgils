

var _bg, _bird, _birdAnim;
var _cursors;
var _grassbg, _link;


class Ingame extends Phaser.Scene
{
    constructor()
    {
        // Create scene
        super({key: "Ingame"});

    }
    preload()
    {
        // Create assets
        this.cameras.main.setBackgroundColor("#00F");

        this.load.image('backg', 'assets/images/bg.jpg');
        this.load.image('bird', 'assets/images/bird.png');
        this.load.spritesheet('birdAnim', 'assets/images/birdAnim.png', { frameWidth:17, frameHeight: 12});
    }
    create()
    {
        // Print assets
        //this.add.image(config.width/2, config.height/2, 'backg'); // print static image

        _bg = this.add.tileSprite(0, 0, config.width, config.height, 'backg').setOrigin(0); // print tiling sprite

        _bird = this.add.sprite(config.width/2, config.height/2, 'bird').setScale(1).setOrigin(0.5); // print sprite
        //_bird.flipX = true;

        _birdAnim = this.add.sprite(config.width/2, config.height/2, 'birdAnim').setScale(3).setOrigin(0.5); // print sprite
        this.anims.create(
        {
            key: 'fly',
            frames: this.anims.generateFrameNumbers('birdAnim', {start:0, end:2}),
            frameRate: 7,
            yoyo: true,
            repeat: -1
        });
        _birdAnim.anims.play('fly');

        _cursors = this.input.keyboard.createCursorKeys();
    }
    update()
    {
        // Update assets
        _bg.tilePositionX += 1;
        //_bird.angle += 1;

        var moveSpeed = 1;
        if (_cursors.right.isDown) {
            _birdAnim.x += moveSpeed;
        }
        if (_cursors.left.isDown) {
            _birdAnim.x -= moveSpeed;
        }
        if (_cursors.up.isDown) {
            _birdAnim.y -= moveSpeed;
        }
        if (_cursors.down.isDown) {
            _birdAnim.y += moveSpeed;
        }
        
    }
}


class Ingame2 extends Phaser.Scene
{
    constructor()
    {
        // Create scene
        super({key: "Ingame2"});

    }
    preload()
    {
        // Create assets
        this.cameras.main.setBackgroundColor("#00F");

        this.load.image('grassbackg', 'assets/images/grass.png');
        this.load.spritesheet('link', 'assets/images/link.png', { frameWidth:120, frameHeight: 130});
    }
    create()
    {
        // Print assets
        _grassbg = this.add.tileSprite(0, 0, config.width, config.height, 'grassbackg').setOrigin(0); // print tiling sprite

        _link = this.add.sprite(config.width/2, config.height/2, 'link').setScale(.5).setOrigin(0.5); // print sprite
        this.anims.create(
        {
            key: 'down',
            frames: this.anims.generateFrameNumbers('link', {start:0, end:9}),
            frameRate: 10,
            yoyo: true,
            repeat: -1
        });
        this.anims.create(
        {
            key: 'left',
            frames: this.anims.generateFrameNumbers('link', {start:10, end:19}),
            frameRate: 10,
            yoyo: true,
            repeat: -1
        });
        this.anims.create(
        {
            key: 'up',
            frames: this.anims.generateFrameNumbers('link', {start:20, end:29}),
            frameRate: 10,
            yoyo: true,
            repeat: -1
        });
        this.anims.create(
        {
            key: 'right',
            frames: this.anims.generateFrameNumbers('link', {start:30, end:39}),
            frameRate: 10,
            yoyo: true,
            repeat: -1
        });

        _cursors = this.input.keyboard.createCursorKeys();
    }
    update()
    {
        // Update assets

        var moveSpeed = 1;
        var bgMoveSpeed = 1;
        if (_cursors.right.isDown) {
            _link.anims.play('right', true);
            if (_link.x < config.width){
                _link.x += moveSpeed;
                _grassbg.tilePositionX += bgMoveSpeed;
            }
        }
        else if (_cursors.left.isDown) {
            _link.anims.play('left', true);
            if (_link.x > 0){
                _link.x -= moveSpeed;
                _grassbg.tilePositionX -= bgMoveSpeed;
            }
        }
        else if (_cursors.up.isDown) {
            _link.anims.play('up', true);
            if (_link.y > 0){
                _link.y -= moveSpeed;
                _grassbg.tilePositionY -= bgMoveSpeed;
            }
        }
        else if (_cursors.down.isDown) {
            _link.anims.play('down', true);
            if (_link.y < config.height){
                _link.y += moveSpeed;
                _grassbg.tilePositionY += bgMoveSpeed;
            }
        }
        else {
            _link.anims.pause();
        }
        
    }
}


var config = 
{
    type: Phaser.AUTO,
    width: 370,
    height: 550,
    scene:[Ingame2], // levels/screens/scenes array
    render:
    {
        pixelArt: true
    }
}


var game = new Phaser.Game(config);