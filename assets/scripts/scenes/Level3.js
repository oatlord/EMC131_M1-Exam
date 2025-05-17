class Level3 extends Phaser.Scene {
    constructor() {
        super("Level3");
    }

    init() {
        this.score = 0;
        this.bombs = null;
        this.stars = null;
        this.scoreText = null;
        this.music = null;
        this.textStyle = { fontFamily: "Upheaval", fontSize: '32px', fill: '#000' };
    }

    preload() {
        this.load.image('waterfall', 'assets/images/level3/waterfall.png');
        this.load.image('waterfallGround', 'assets/images/level3/waterfallGround.png');
        this.load.image('star', 'assets/images/star.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.spritesheet('dude', 'assets/images/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('bgm3', 'assets/audio/Sweet 70s.wav');
    }

    create() {
        this.add.image(400, 300, 'waterfall');

        this.music = this.sound.add('bgm3');
        this.music.play();

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 580, 'waterfallGround').setScale(3).refreshBody();

        this.platforms.create(300, 100, 'waterfallGround');
        this.platforms.create(80, 300, 'waterfallGround');
        this.platforms.create(500, 400, 'waterfallGround');

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

        switchLevel.call(this, 'CongratsScene');
    }
}