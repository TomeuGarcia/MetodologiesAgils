

class enemyPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _tag = 'enemy')
    {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);
        this.setOrigin(.5, 0);
        this.anims.play('enemySpaceshipAnim');
    }

    preUpdate(time, delta)
    {
        if (this.y > this.body.height + config.height){
            this.active = false;
        }

        super.preUpdate(time, delta)
    }

}