

class slimePrefab extends enemyInterface
{

    constructor(_scene, _positionX, _positionY, _spriteTag = 'slime', _minPatrolX, _maxPatrolX)
    {
        super(_scene, _positionX, _positionY, _spriteTag, 1);

        this.minPatrolX = _minPatrolX;
        this.maxPatrolX = _maxPatrolX;
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);

        this.anims.play('slimeWalk', true); 
        
        if (this.isBlockedByWalls() || this.isOutOfPatrolPosition())
        {
            this.flipMoveDirectionX();
        }

    }

    isOutOfPatrolPosition()
    {
        return this.body.position.x < this.minPatrolX || this.body.position.x > this.maxPatrolX;
    }

}