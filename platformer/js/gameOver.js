class gameOver extends Phaser.Scene
{
	constructor()
	{
		super({key: "gameOver"});
	}

	preload()
	{
		this.load.setPath('assets/tilesets/');
        this.load.image('walls','tileset_walls.png'); // MUST HAVE SAME 
        this.load.image('moss','tileset_moss.png');   // TAG AS IN TILED
		
		this.load.setPath('assets/sprites/');
		this.load.image('btn_play', 'btn.png');
    }

	create()
	{
        // Draw background
        this.bg = this.add.tileSprite(0, 0, gamePrefs.LEVEL1_WIDTH, gamePrefs.LEVEL1_HEIGHT, 'bg_green').setOrigin(0);

        // Draw Level
        // Load the JSON
        this.map = this.add.tilemap('level1');
        // Load tilesets
        this.map.addTilesetImage('walls');
        this.map.addTilesetImage('moss');
        // Draw the layers
        this.walls = this.map.createLayer('layer_walls', 'walls');
        this.map.createLayer('layer_moss_right', 'moss');
        this.map.createLayer('layer_moss_top', 'moss');
        this.map.createLayer('layer_moss_left', 'moss');
        this.map.createLayer('layer_moss_bottom', 'moss');



		var score = 0;
		const gemCount = localStorage.getItem('gems');
		var best = localStorage.getItem('best');
		if (gemCount != null)
		{
			score = best;
			if (gemCount > best)
			{
				best = gemCount;
				localStorage.setItem('best', best);
			}
		}

		this.titulo = this.add.text
		(
			gamePrefs.GAME_WIDTH/4, 
			gamePrefs.GAME_HEIGHT/4 -75,
			'FINAL SCORE: ' + score,
			{
				fontFamily: 'Arial Black',
				fill: '#43d637',
				stroke:'#FFFFFF',
				strokeThickness:4
			}
		).setOrigin(.5);

		this.bestScore = this.add.text
		(
			gamePrefs.GAME_WIDTH/4, 
			gamePrefs.GAME_HEIGHT/4 -115,
			'BEST SCORE: ' + best,
			{
				fontFamily: 'Arial Black',
				fill: '#43d637',
				stroke:'#FFFFFF',
				strokeThickness:4
			}
		).setOrigin(.5);




		this.boton = this.add.image
		(
			gamePrefs.GAME_WIDTH/4, 
			gamePrefs.GAME_HEIGHT/4 -10,
			'btn_play')
			.setScale(.25)
			.setInteractive({useHandCursor:true}
		).on
		(
			'pointerdown',
			this.iniciaJuego,
			this
		);
	}


	iniciaJuego()
	{
		console.log('gogogo');
		this.boton.destroy();
		this.add.tween
		({
			targets:this.titulo,
			duration:2000,
			alpha:0
		});
		this.add.tween
		({
			targets:this.nave,
			duration:3000,
			y:config.height-20,
			onComplete:this.cambiaEscena,
			onCompleteScope:this
		});
		
	}

	cambiaEscena()
	{
		this.scene.start('level1');
	}

	update()
	{
	}
}