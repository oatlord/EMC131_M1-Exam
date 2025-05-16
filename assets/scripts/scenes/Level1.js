let player, platforms, cursors;
let gameOver = false;

class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
    }

    init() {
        this.score = 0;
        this.bombs = null;
        this.stars = null;
        this.scoreText = null;
    }

    preload() {
        this.load.image('sky', 'assets/images/level1/sky.png');
        this.load.image('ground', 'assets/images/level1/platform.png');
        this.load.image('star', 'assets/images/star.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.spritesheet('dude', 'assets/images/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(300, 400, 'ground');
        this.platforms.create(60, 200, 'ground');
        this.platforms.create(750, 300, 'ground');

        createInitialAssets(this);
        createInteractables(this);

        this.bombs = this.physics.add.group();
        this.time.addEvent({
            delay: 1000,
            callback: createBomb,
            callbackScope: this,
            repeat: 4
        });

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

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

        switchLevel.call(this, 'Level2');
    }
}

function createPlayer(scene) {
    player = scene.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
}

function createPlayerAnimations(scene) {
    scene.anims.create({
        key: 'left',
        frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    scene.anims.create({
        key: 'right',
        frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
}

function createInitialAssets(scene) {
    createPlayer(scene);
    createPlayerAnimations(scene);

    cursors = scene.input.keyboard.createCursorKeys();
}

function createInteractables(scene) {
    scene.stars = scene.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    scene.stars.children.iterate((child) => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
}

function createColliders(scene) {
    scene.physics.add.collider(player, scene.platforms);
    scene.physics.add.collider(scene.stars, scene.platforms);
    scene.physics.add.collider(scene.bombs, scene.platforms);

    scene.physics.add.overlap(player, scene.stars, collectStar, null, scene);
    scene.physics.add.collider(player, scene.bombs, hitBomb, null, scene);
}

function createBomb() {
    const x = (player.x < 400)
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    const bomb = this.bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
}

function collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
        this.stars.children.iterate((child) => {
            child.enableBody(true, child.x, 0, true, true);
        });
    }
}

function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}

function switchLevel(scene) {
    if (this.score === 50) {
        this.scene.start(scene);
        console.log(scene + " loaded");
    }
}