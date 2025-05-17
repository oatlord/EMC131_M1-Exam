class CongratsScene extends Phaser.Scene {
    constructor() {
        super("CongratsScene");
    }

    preload() {}

    create() {
        this.music = this.sound.add('menuBgm');
        this.music.play();

        this.add.image(400, 300, 'mainSky');
        this.add.image(960, 540, 'cloud1');
        this.add.image(960, 540, 'cloud2');

        this.add.text(250, 200, "Congratulations!\nYou won!", {
            fontFamily: 'Upheaval',
            fontSize: 50
        });

        menuReturnButton = this.add.image(400, 350, 'buttons').setFrame(4).setScale(3).setInteractive(
            { useHandCursor: true }
        );
        menuReturnButton.on('pointerdown', () => returnToMenu(this));
    }
}