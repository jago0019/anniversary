export default class EndScene extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    create() {
        this.add.image(0, 0, 'endScreen').setOrigin(0).setScrollFactor(1);

        this.add.image(750, 650, 'playAgainEnd').setOrigin(0.5).setScrollFactor(1).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('StartScene'));
    }
        

    update() {
    }
}
