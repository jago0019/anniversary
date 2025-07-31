export default class LondonScene extends Phaser.Scene {
    constructor() {
        super('LondonScene');
    }
  
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        const snow = this.add.image(0, 0, 'london').setOrigin(0).setScrollFactor(1);

        this.ferrisWheel = this.add.image(700, 80, 'ferrisWheel').setOrigin(0).setScrollFactor(1);
        this.ferrisWheel.setScale(1);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.anims.create({
            key: 'flag',
            frames: this.anims.generateFrameNumbers('flag', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });

        const flag1 = this.add.sprite(245, 160, 'flag')
        .setOrigin(0)
        .setScrollFactor(1)
        .play('flag');

        const flag2 = this.add.sprite(520, 160, 'flag')
        .setOrigin(0)
        .setScrollFactor(1)
        .play('flag');

        this.player = this.add.sprite(1000, 600, 'playerRight',3)
        .setOrigin(0)
        .setScrollFactor(1)
        .play('playerWalkRight');

        this.player.setScale(3);

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

        const fgCenterX = this.ferrisWheel.x + (this.ferrisWheel.displayWidth / 2);
        const fgCenterY = this.ferrisWheel.y + (this.ferrisWheel.displayHeight / 2);

        const distance = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            fgCenterX, fgCenterY
        );

        const isNear = distance < 300;

        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && isNear) {
            this.scene.start('SubwayScene');
        }
        this.interactText.setPosition(this.player.x, this.player.y - 40);
        this.interactText.setVisible(isNear);


        if (this.player.y > 790) {
            this.scene.start('MainScene');
        }

        if (this.player.x > 1490) {
          this.scene.start('EndScene');
        }
    }
}