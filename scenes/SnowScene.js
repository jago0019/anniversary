export default class SnowScene extends Phaser.Scene {
    constructor() {
        super('SnowScene');
    }
  
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        const snow = this.add.image(0, 0, 'snow').setOrigin(0).setScrollFactor(1);

        this.snowHouse = this.add.image(900, 350, 'stockvik').setOrigin(0).setScrollFactor(1);
        this.snowHouse.setScale(0.4);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.anims.create({
            key: 'snowman',
            frames: this.anims.generateFrameNumbers('snowman', { start: 0, end: 2 }),
            frameRate: 2,
            repeat: -1
        });

        const snowman = this.add.sprite(340, 480, 'snowman')
        .setOrigin(0)
        .setScrollFactor(1)
        .play('snowman');

        snowman.setScale(1);

        this.player = this.add.sprite(100, 400, 'playerRight',3)
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

        const fgCenterX = this.snowHouse.x + (this.snowHouse.displayWidth / 2);
        const fgCenterY = this.snowHouse.y + (this.snowHouse.displayHeight / 2);

        const distance = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            fgCenterX, fgCenterY
        );

        const isNear = distance < 300;

        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && isNear) {
            this.scene.start('ChessScene');
        }
        this.interactText.setPosition(this.player.x, this.player.y - 40);
        this.interactText.setVisible(isNear);

        if (this.player.y < 0) {
            console.log('Player x: ' + this.player.x);
            this.scene.start('MainScene');
        }

        if (this.player.y > 790) {
            this.scene.start('BarbieScene');
        }
    }
}