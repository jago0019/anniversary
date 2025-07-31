export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }
  
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        const beach = this.add.image(0, 0, 'beachElement').setOrigin(0).setScrollFactor(1);

        this.greekHouse = this.add.image(1000, 200, 'greekHouse').setOrigin(0).setScrollFactor(1);
        this.greekHouse.setScale(0.4);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.anims.create({
            key: 'loop',
            frames: this.anims.generateFrameNumbers('fgAnim', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: -1
        });

        const fg = this.add.sprite(0, 650, 'fgAnim')
        .setOrigin(0)
        .setScrollFactor(1)
        .play('loop');

        fg.setScale(12);

        this.player = this.add.sprite(400, 400, 'playerRight',3)
        .setOrigin(0)
        .setScrollFactor(1)
        .play('playerWalkRight');

        this.player.setScale(4);

        this.interactText = this.add.text(this.player.x, this.player.y - 40, 'Tryck SPACE', {
            fontSize: '18px',
            fill: '#000',
        }).setVisible(false);
    }

    update() {
        const speed = 350;
        let moving = false;
        let movingRight = false;
        let movingLeft = false;
        
      
        if (this.cursors.left.isDown) {
          this.player.x -= speed * this.game.loop.delta / 1000;
          moving = true;
          movingLeft = true;
        } else if (this.cursors.right.isDown) {
          this.player.x += speed * this.game.loop.delta / 1000;
          moving = true;
          movingRight = true;
        }
      
        if (this.cursors.up.isDown) {
          this.player.y -= speed * this.game.loop.delta / 1000;
          moving = true;
        } else if (this.cursors.down.isDown) {
          this.player.y += speed * this.game.loop.delta / 1000;
          moving = true;
        }
      
        if (moving) {
          if (!this.player.anims.isPlaying) {
            if (movingRight) {
                this.player.play('playerWalkRight');
            } else if (movingLeft) {
                this.player.play('playerWalkLeft');
            }
          }
        } else {
          this.player.anims.stop();
          this.player.setFrame(1); // Show idle frame (usually frame 0)
        }

        const fgCenterX = this.greekHouse.x + (this.greekHouse.displayWidth / 2);
        const fgCenterY = this.greekHouse.y + (this.greekHouse.displayHeight / 2);

        const distance = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            fgCenterX, fgCenterY
        );

        const isNear = distance < 300;

        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && isNear) {
            this.scene.start('PhotoScene');
        }
        this.interactText.setPosition(this.player.x, this.player.y - 40);
        this.interactText.setVisible(isNear);

        if (this.player.x < 0) {
            this.scene.start('SnowScene');
        }

        if (this.player.y < 0) {
            this.scene.start('LondonScene');
        }
    }
}