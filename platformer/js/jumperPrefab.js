

class jumperPrefab extends enemyInterface
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'jumper')
    {
        super(_scene, _positionX, _positionY, _spriteTag);
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);

        this.anims.play('jumperWalk', true); 

        if (this.body.blocked.right || this.body.blocked.left)
        {
            this.moveDirection *= -1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.moveDirection);
            this.flipX = !this.flipX;
        }

    }


}