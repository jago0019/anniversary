export default class BarbieScene extends Phaser.Scene {
    constructor() {
        super('BarbieScene');
    }
  
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.bg = this.add.image(0, 0, 'street').setOrigin(0).setScrollFactor(1);
        this.cinema = this.add.image(950, -150, 'cinema').setOrigin(0).setScrollFactor(1);

        this.anims.create({
            key: 'playerWalkRight',
            frames: this.anims.generateFrameNumbers('playerRight', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });
        
        this.anims.create({
            key: 'playerWalkLeft',
            frames: this.anims.generateFrameNumbers('playerLeft', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });  

        this.player = this.add.sprite(100, 400, 'playerRight',3)
        .setOrigin(0)
        .setScrollFactor(1)
        .play('playerWalkRight');

        this.anims.create({
            key: 'bush',
            frames: this.anims.generateFrameNumbers('bushAnim', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        this.player.setScale(4);

        this.interactText = this.add.text(this.player.x, this.player.y - 40, 'Tryck SPACE', {
            fontSize: '18px',
            fill: '#fff',
        }).setVisible(false);

        const fgBush1 = this.add.sprite(-40, 650, 'bushAnim').setOrigin(0).setScrollFactor(1).play('bush');
        fgBush1.setScale(0.5);
        const fgBush2 = this.add.sprite(200, 650, 'bushAnim').setOrigin(0).setScrollFactor(1).play('bush');
        fgBush2.setScale(0.5);
        const fgBush3 = this.add.sprite(440, 650, 'bushAnim').setOrigin(0).setScrollFactor(1).play('bush');
        fgBush3.setScale(0.5);
        const fgBush4 = this.add.sprite(680, 650, 'bushAnim').setOrigin(0).setScrollFactor(1).play('bush');
        fgBush4.setScale(0.5);
        const fgBush5 = this.add.sprite(920, 650, 'bushAnim').setOrigin(0).setScrollFactor(1).play('bush');
        fgBush5.setScale(0.5);
        const fgBush6 = this.add.sprite(1160, 650, 'bushAnim').setOrigin(0).setScrollFactor(1).play('bush');
        fgBush6.setScale(0.5);
        const fgBush7 = this.add.sprite(1400, 650, 'bushAnim').setOrigin(0).setScrollFactor(1).play('bush');
        fgBush7.setScale(0.5);

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

        const cinemaCenterX = this.cinema.x + (this.cinema.displayWidth / 2);
        const cinemaCenterY = this.cinema.y + (this.cinema.displayHeight / 2);

        const distance = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            cinemaCenterX, cinemaCenterY
        );

        const isNear = distance < 400;

        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && isNear) {
            this.scene.start('MovieScene');
        }

        this.interactText.setPosition(this.player.x, this.player.y - 40);
        this.interactText.setVisible(isNear);

        if (this.player.y < 0) {
            this.scene.start('SnowScene');
        }
    }
}