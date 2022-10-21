
class powerUpPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _type)
    {
        super(_scene, _posX, _posY, 'powerUp'+_type);
        _scene.add.existing(this);

        this.setOrigin(.5, 0).setScale(1);
        this.anims.play('powerUpAnim');
        this.type = _type;
    }

    preUpdate(time, delta)
    {
        if (this.y > config.height) {
            this.active = false;
        }

        super.preUpdate(time, delta);
    }

}