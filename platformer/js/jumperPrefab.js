

class jumperPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'enemyJumper')
    {
        super(_scene, _positionX, _positionY, _spriteTag);
        this.scene = _scene;
        _scene.add.existing(this);
        _scene.physics.world.enable(this); //Or alternatively: _scene.physics.add.existing(this);


        //this.anims.play('jumperIdle', true); TODO FIX!!
        this.moveDirection = 1;
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.moveDirection);


        _scene.physics.add.overlap(
            this, 
            _scene.hero, 
            this.hitHero,
            null,
            this    
        );
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);

        if (this.body.blocked.right || this.body.blocked.left)
        {
            this.moveDirection *= -1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.moveDirection);
            this.flipX = !this.flipX;
        }

    }

    hitHero(_jumper, _hero)
    {
        if (_jumper.body.touching.up && _hero.body.touching.down)
        {
            this.destroy();
            _hero.body.setVelocityY(-gamePrefs.HERO_JUMP);
        }
        else
        {
            _hero.body.reset(65, 100);
            this.scene.cameras.main.shake(100, 0.05).flash(1.25, 200, 0, 0);
            
        }
    }


}