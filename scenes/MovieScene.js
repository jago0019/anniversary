export default class MovieScene extends Phaser.Scene {
    constructor() {
        super('MovieScene');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.add.image(0, 0, 'insideCinema').setOrigin(0).setScrollFactor(1);
        const picture1 = this.add.image(500, 50, 'barbieImg').setOrigin(0).setScrollFactor(1).setVisible(false);

        this.player = this.add.sprite(100, 400, 'playerRight',3)
        .setOrigin(0)
        .setScrollFactor(1)
        .play('playerWalkRight');

        this.player.setScale(4);
        picture1.setScale(0.1);

        // Chest popup container group
        this.popupGroup = this.add.group();
        this.popupVisible = false;

        const centerX = 750;
        const centerY = 400;

        // Background of the chest
        const popupBg = this.add.rectangle(centerX, centerY, 500, 300, 0x1a1a1a, 0.95)
        .setOrigin(0.5)
        .setScrollFactor(0);

        // Wooden edges
        const borderThickness = 20;
        const borderColor = 0x5e3b1b;

        // Top edge
        const topEdge = this.add.rectangle(centerX, centerY - 150, 500, borderThickness, borderColor).setScrollFactor(0);
        // Bottom edge
        const bottomEdge = this.add.rectangle(centerX, centerY + 150, 500, borderThickness, borderColor).setScrollFactor(0);
        // Left edge
        const leftEdge = this.add.rectangle(centerX - 250, centerY, borderThickness, 300, borderColor).setScrollFactor(0);
        // Right edge
        const rightEdge = this.add.rectangle(centerX + 250, centerY, borderThickness, 300, borderColor).setScrollFactor(0);

        // Memory image inside the chest popup
        const popupImage = this.add.image(centerX - 200, centerY - 100, 'barbieImg')
        .setOrigin(0)
        .setScrollFactor(0)
        .setScale(0.05); // match or tweak scale as needed

        // Adjusted memory text aligned to top-left of popup
        const popupText = this.add.text(centerX - 30, centerY - 100, "...", {
        fontSize: '15px',
        color: '#fff',
        wordWrap: { width: 260 },
        align: 'left'
        }).setOrigin(0).setScrollFactor(0);


        // Close button (top-right corner of popup)
        const closeButton = this.add.text(centerX + 225, centerY - 120, "✖", {
        fontSize: '40px',
        color: '#fff',
        padding: { x: 0, y: 0 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .setScrollFactor(0)
        .on('pointerdown', () => this.hidePopup());


        // Add all to group
        this.popupGroup.addMultiple([
            popupBg, topEdge, bottomEdge, leftEdge, rightEdge,
            popupImage, popupText, closeButton
        ]);

        // Initially hidden
        this.popupGroup.setVisible(false);

        this.interactText = this.add.text(this.player.x, this.player.y - 40, 'Tryck SPACE', {
            fontSize: '18px',
            fill: '#fff',
        }).setVisible(false);

    }
    showPopup(message) {
        this.popupGroup.setVisible(true);
        this.popupVisible = true;
      
        // Update the popup text dynamically
        const text = this.popupGroup.getChildren().find(c => c.text);
        if (text) text.setText(message);
    }
      
    hidePopup() {
        this.popupGroup.setVisible(false);
        this.popupVisible = false;
        this.hideThatShit = true;
    }
      

    update() {
        const speed = 350;
        let moving = false;
        let movingRight = false;
        let movingLeft = false;
        let isNear = false;

        if (this.player.x > 1000) {
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

        if (this.player.x < 0) {
            this.scene.start('BarbieScene');
        }

        this.interactText.setPosition(this.player.x, this.player.y - 40);
        this.interactText.setVisible(isNear);

        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && !this.popupVisible && isNear) {
            this.showPopup("2 augusti 2023. Detta var tydligen vår allra första dag som ett par. Vi såg Barbiefilmen och kom klädda i tema<3");
        }
    }
}