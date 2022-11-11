

class jumperPrefab extends enemyInterface
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'jumper')
    {
        super(_scene, _positionX, _positionY, _spriteTag, 2);
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);

        this.anims.play('jumperWalk', true); 

        if (this.isBlockedByWalls())
        {
            this.flipMoveDirectionX();
        }

    }




}