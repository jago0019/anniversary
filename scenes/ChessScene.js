export default class ChessScene extends Phaser.Scene {
    constructor() {
        super('ChessScene');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.add.image(0, 0, 'insideStockvik').setOrigin(0).setScrollFactor(1);

        this.player = this.add.sprite(100, 420, 'playerRight',3)
        .setOrigin(0)
        .setScrollFactor(1)
        .play('playerWalkRight');

        this.player.setScale(8);

        this.interactText = this.add.text(this.player.x, this.player.y - 40, 'Tryck SPACE', {
            fontSize: '18px',
            fill: '#fff',
        }).setVisible(false);

    }

    update() {
        const speed = 350;
        let moving = false;
        let movingRight = false;
        let movingLeft = false;
        let isNear = false;

        if (this.player.x > 500 && this.player.x < 1200) {
            isNear = true;
        }
      
        if (this.cursors.left.isDown) {
          this.player.x -= speed * this.game.loop.delta / 1000;
          moving = true;
          movingLeft = true;
        } else if (this.cursors.right.isDown) {
          this.player.x += speed * this.game.loop.delta / 1000;
          moving = true;
          movingRight = true;
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

        if (this.player.x < 0) {
            this.scene.start('SnowScene');
        }

        this.interactText.setPosition(this.player.x, this.player.y - 40);
        this.interactText.setVisible(isNear);

        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && isNear) {
            this.scene.start('ChessGameScene');
        }
    }
}