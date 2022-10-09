
class enemyBulletPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _tag = 'enemyBullet')
    {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);
        
        this.setOrigin(.5, 0);
    }

    preUpdate(time, delta)
    {
        if (this.y > config.height) {
            this.active = false;
        }

        super.preUpdate(time, delta);
    }

}