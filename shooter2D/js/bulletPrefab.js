

class bulletPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _tag = 'bullet') 
    {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);
    }

    preUpdate(time, delta)
    {
        if (this.y <= 0)
        {
            this.active = false;
        }

        super.preUpdate(time, delta);
    }
}