export default class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    create() {
        this.add.image(0, 0, 'startSceneBG').setOrigin(0).setScrollFactor(1);

        this.title = this.add.image(750, 200, 'title').setOrigin(0.5).setScrollFactor(1);
        this.timer = 0;
        this.timer2 = 0;

        this.add.image(650, 550, 'playNow').setOrigin(0).setScrollFactor(1).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('BarbieScene'));
    }
        

    update(time, delta) {
        this.timer += delta;
    
        const amplitude = 10; // vertical bounce height
        const speed = 0.002;  // controls how fast it bounces
    
        this.title.y = 200 + Math.sin(this.timer * speed) * amplitude;
    }
}
