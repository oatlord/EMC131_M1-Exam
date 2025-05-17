let menuReturnButton;

class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    init() {
        this.retryButton = null;
    }

    preload() { }

    create() {
        this.music = this.sound.add('menuBgm');
        this.music.play();

        this.add.image(400, 300, 'mainSky');
        this.add.image(960, 540, 'cloud1');
        this.add.image(960, 540, 'cloud2');

        this.add.text(250, 200, "Game Over!\nStart again?", {
            fontFamily: 'Upheaval',
            fontSize: 50
        });

        menuReturnButton = this.add.image(350, 350, 'buttons').setFrame(4).setScale(3).setInteractive(
            { useHandCursor: true }
        );
        menuReturnButton.on('pointerdown', () => returnToMenu(this));

        this.retryButton = this.add.image(450, 350, 'buttons').setFrame(3).setScale(3).setInteractive(
            { useHandCursor: true }
        );
        this.retryButton.on('pointerdown', () => this.replay());
    }

    replay() {
        if (this.music) this.music.stop();
        this.scene.stop();
        this.scene.start("Level1");
    }
}

function returnToMenu(currentScene) {
    currentScene.music.stop();
    currentScene.scene.start("MainMenu");
}