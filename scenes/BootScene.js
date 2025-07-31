export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
    // Load loading bar assets if needed
    }

    create() {
        this.scene.start('PreloadScene');
    }
}