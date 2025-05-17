class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2");
    }

    init() {
        this.score = 0;
        this.bombs = null;
        this.stars = null;
        this.scoreText = null;
        this.music = null;
                this.textStyle = { fontFamily: "Upheaval", fontSize: '32px', fill: '#fff' };
    }

    preload() {
        this.load.image('nightSky', 'assets/images/level2/night sky.png');
        this.load.image('mushroomGround', 'assets/images/level2/mushroom platform.png');
        this.load.image('star', 'assets/images/star.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.spritesheet('dude', 'assets/images/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('bgm2', 'assets/audio/DnB.wav');
    }

    create() {
        this.add.image(400, 300, 'nightSky');

        this.music = this.sound.add('bgm2');
        this.music.play();

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 580, 'mushroomGround').setScale(3).refreshBody();

        this.platforms.create(600, 250, 'mushroomGround');
        this.platforms.create(70, 350, 'mushroomGround');
        this.platforms.create(750, 400, 'mushroomGround');

        createInitialAssets(this);
        createInteractables(this);

        this.bombs = this.physics.add.group();
        this.time.addEvent({
            delay: 1000,
            callback: createBomb,
            callbackScope: this,
            repeat: 4
        });

        this.scoreText = this.add.text(16, 16, 'Score: 0', this.textStyle);

        createColliders(this);
    }

    update() {
        if (gameOver) {
            return;
        }

        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }

        switchLevel.call(this, 'Level3');
    }
}