

class enemyPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _tag = 'enemy', _lives = 1)
    {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);
        
        this.setOrigin(.5, 0);
        this.anims.play('enemySpaceshipAnim');

        this.maxLives = _lives;
        this.lives = _lives;

        this.bulletTimer = _scene.time.addEvent(
            {
                delay: 1500,
                callback: _scene.createEnemyBullet,
                args: [this],
                callbackScope: _scene,
                repeat: -1
            }          
        )
    }

    preUpdate(time, delta)
    {
        if (this.y > this.body.height + config.height){
            this.active = false;
        }

        super.preUpdate(time, delta)
    }

    resetLives()
    {
        this.lives = this.maxLives;
    }
    takeDamage(damageAmount)
    {
        this.lives -= damageAmount;
    }
    isDead()
    {
        return this.lives <= 0
    }
    stopShooting() 
    {
        this.bulletTimer.paused = true;
    }
    resumeShooting()
    {
        this.bulletTimer.paused = false;
    }

}