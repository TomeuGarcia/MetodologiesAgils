

class enemyInterface extends Phaser.GameObjects.Sprite
{

    constructor(_scene, _positionX, _positionY, _spriteTag, _damage)
    {
        super(_scene, _positionX, _positionY, _spriteTag);
        this.scene = _scene;
        _scene.add.existing(this);
        _scene.physics.world.enable(this); //Or alternatively: _scene.physics.add.existing(this);


        this.moveDirection = 1;
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.moveDirection);


        _scene.physics.add.overlap(
            this, 
            _scene.hero, 
            this.hitHero,
            null,
            this    
        );

        this.damage = _damage;
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }

    hitHero(_enemy, _hero)
    {
        if (_enemy.body.touching.up && _hero.body.touching.down)
        {
            this.destroy();
            _hero.body.setVelocityY(-gamePrefs.HERO_JUMP);
        }
        else
        {            
            _hero.takeDamage(this.damage);
        }
    }

    flipMoveDirectionX()
    {
        this.moveDirection *= -1;
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.moveDirection);
        this.flipX = !this.flipX;
    }

    isBlockedByWalls()
    {
        return this.body.blocked.right || this.body.blocked.left;
    }

}