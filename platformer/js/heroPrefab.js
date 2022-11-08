

class heroPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = 'hero', _cursors)
    {
        super(_scene, _positionX, _positionY, _spriteTag);
        this.cursors = _cursors;
        _scene.add.existing(this);
        _scene.physics.world.enable(this); //Or alternatively: _scene.physics.add.existing(this);
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

}