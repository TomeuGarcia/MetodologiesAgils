

class slimePrefab extends enemyInterface
{

    constructor(_scene, _positionX, _positionY, _spriteTag = 'slime')
    {
        super(_scene, _positionX, _positionY, _spriteTag);
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);

        this.anims.play('slimeWalk', true); 
        
        if ((this.body.blocked.right || this.body.blocked.left) || !this.body.blocked.down)
        {
            this.moveDirection *= -1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.moveDirection);
            this.flipX = !this.flipX;
        }

    }

}