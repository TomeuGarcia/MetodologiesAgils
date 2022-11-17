


class gemPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag='gem')
    {
        super(_scene, _positionX, _positionY, _spriteTag);
        this.scene = _scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.anims.play('gemRotate', true);
        this.body.setAllowGravity(false);


        this.scene.physics.add.overlap
        (
            this,
            _scene.hero,
            this.getGem,
            null,
            this
        )
    }


    getGem(_gem, _hero)
    {
        this.scene.getGem.play();
        this.scene.addGems(1);
        _gem.destroy();
    }


}