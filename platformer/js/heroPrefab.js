

class heroPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'hero', _cursors, _maxHealth)
    {
        super(_scene, _positionX, _positionY, _spriteTag);
        this.cursors = _cursors;
        _scene.add.existing(this);
        _scene.physics.world.enable(this); //Or alternatively: _scene.physics.add.existing(this);

        this.maxHealth = _maxHealth;
        this.health = _maxHealth;
    }


    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
        
        if (this.cursors.left.isDown)
        {
            this.body.setVelocityX(-gamePrefs.HERO_SPEED);
            this.setFlipX(true);
            this.anims.play('run', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.body.setVelocityX(gamePrefs.HERO_SPEED);
            this.setFlipX(false);
            this.anims.play('run', true);
        }
        else
        {    
            this.body.setVelocityX(0);
            this.anims.stop().setFrame(0);
        }

        if (this.cursors.up.isDown && 
            this.body.blocked.down &&
            Phaser.Input.Keyboard.DownDuration(this.cursors.up, 250))
        {
            this.body.setVelocityY(-gamePrefs.HERO_JUMP);
        }

        //if (this.body.blocked.down)
        if (!this.body.onFloor())
        {
            this.anims.stop().setFrame(6);
        }
        

    }


    takeDamage(_damageAmount)
    {
        this.health -= _damageAmount;
        if (this.health < 0) this.health = 0;

        this.scene.healthUI.setFrame(this.health);

        this.body.reset(65, 100);
        this.scene.cameras.main.shake(100, 0.05).flash(500, 100, 0, 0);
    }

}