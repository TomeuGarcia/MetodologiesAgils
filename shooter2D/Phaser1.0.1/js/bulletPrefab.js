

class bulletPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _tag = 'bullet') 
    {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);
    }
/*
    constructor(_scene, _posX, _posY) 
    {
        
    }*/

    preUpdate()
    {
        if (this.y <= 0)
        {
            this.active = false;
        }
    }
}

//this.add.sprite(posX, posY, tag);