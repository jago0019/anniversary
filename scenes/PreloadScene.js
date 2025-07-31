export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
  
    preload() {
        this.load.image('startSceneBG', 'assets/backgrounds/startScreen.png');
        this.load.image('title', 'assets/foregrounds/titleText.png');
        this.load.image('playNow', 'assets/foregrounds/playNow.png');

        this.load.image('endScreen', 'assets/backgrounds/endScreen.png');
        this.load.image('playAgainEnd', 'assets/foregrounds/endPlayAgain.png');

        this.load.image('beachElement', 'assets/backgrounds/beach.png');

        this.load.image('greekHouse', 'assets/foregrounds/greekHouse.png');
        this.load.image('cinema', 'assets/foregrounds/cinema.png');
        this.load.image('insideGreekHouse', 'assets/backgrounds/insideHouse.png');
        this.load.image('wall', 'assets/foregrounds/wall.png');
        this.load.image('street', 'assets/backgrounds/street.png');
        this.load.image('insideCinema', 'assets/backgrounds/insideCinema.png');
        this.load.image('snow', 'assets/backgrounds/stockvik.png');
        this.load.image('stockvik', 'assets/foregrounds/stockvikHouse.png');
        this.load.image('insideStockvik', 'assets/backgrounds/insideStockvik.png');
        this.load.image('shotglass', 'assets/foregrounds/shotglass.png');
        this.load.image('chessBoard', 'assets/backgrounds/chessBoard.png');
        this.load.image('london', 'assets/backgrounds/london.png');
        this.load.image('box1', 'assets/foregrounds/box1.png');
        this.load.image('box2', 'assets/foregrounds/box2.png');
        this.load.image('box3', 'assets/foregrounds/box3.png');
        this.load.image('ferrisWheel', 'assets/foregrounds/ferrisWheel.png');

        this.load.image('platform', 'assets/backgrounds/station.png');
        this.load.image('subwayDoors', 'assets/foregrounds/train.png');
        this.load.image('light', 'assets/foregrounds/light.png');
        this.load.image('platformplatform', 'assets/foregrounds/platformplatform.png');
        this.load.image('tracks', 'assets/foregrounds/tracks.png');
        this.load.image('tryagainButton', 'assets/foregrounds/tryagain.png');


        this.load.image('greece1', 'assets/images/greece1.HEIC');
        this.load.image('barbieImg', 'assets/images/barbie.HEIC');
        this.load.image('newyear', 'assets/images/newyear.HEIC');
        this.load.image('londonImg', 'assets/images/london.HEIC');

        this.load.spritesheet('fgAnim', 'assets/foregrounds/wavesSprite.png', {
            frameWidth: 126,
            frameHeight: 13,
        });

        this.load.spritesheet('flag', 'assets/foregrounds/flag.png', {
            frameWidth: 42,
            frameHeight: 33,
        });

        this.load.spritesheet('snowman', 'assets/foregrounds/snowmanSprite.png', {
            frameWidth: 144,
            frameHeight: 128,
        });
        this.load.spritesheet('bushAnim', 'assets/foregrounds/bushSprite.png', {
            frameWidth: 422,
            frameHeight: 340,
        });

        this.load.spritesheet('playerRight', 'assets/sprites/playerSprite.png', {
            frameWidth: 18,
            frameHeight: 34,
        });

        this.load.spritesheet('playerLeft', 'assets/sprites/playerSprite2.png', {
            frameWidth: 18,
            frameHeight: 34,
        });
        // Example: this.load.tilemapTiledJSON('map', 'assets/maps/scene1.json');
        // Example: this.load.spritesheet('player', 'assets/sprites/player.png', { frameWidth: 32, frameHeight: 32 });
    }
  
    create() {
        this.scene.start('StartScene');
    }
}