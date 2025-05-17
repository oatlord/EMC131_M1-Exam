class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }

    init() {
        this.playButton = null;
        this.music = null;
    }

    preload() {
        this.load.spritesheet('buttons', 'assets/images/ui/buttons/button UI.png',
            {frameWidth: 16, frameHeight: 16}
        );
        this.load.image('mainSky', 'assets/images/ui/background/sky.png');
        this.load.image('cloud1', 'assets/images/ui/background/layers/clouds_1.png');
        this.load.image('cloud2', 'assets/images/ui/background/layers/clouds_2.png');
        
        this.load.audio('menuBgm', 'assets/audio/Cheerful Title Screen.wav');
        
        this.load.html('fontPreload', 'assets/fonts/Upheaval/upheavtt.ttf');
    }

    create() {
        this.music = this.sound.add('menuBgm');
        this.music.play();

        this.add.image(400,300,'mainSky');
        this.add.image(960,540,'cloud1');
        this.add.image(960,540,'cloud2');

        this.add.text(250,200,"Star Jumper",{
            fontFamily: 'Upheaval',
            fontSize: 50
        });

        this.playButton = this.add.image(400,300,'buttons').setFrame(1).setScale(3).setInteractive(
            {useHandCursor: true}
        )
        this.playButton.on('pointerdown', () => {this.loadGame()});
    }

    update() {}

    loadGame() {
        this.music.stop();
        this.scene.start("Level1");
    }
}