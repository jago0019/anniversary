export default class SubwayScene extends Phaser.Scene {
    constructor() {
        super('SubwayScene');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        // Add background/platform
        this.add.image(0, 0, 'platform').setOrigin(0).setScrollFactor(1);

        // Subway doors at far right

        this.add.image(-105, 91, 'light').setOrigin(0).setScale(1).setScrollFactor(1);
        this.add.image(248, 91, 'light').setOrigin(0).setScale(1).setScrollFactor(1);
        this.add.image(601, 91, 'light').setOrigin(0).setScale(1).setScrollFactor(1);
        this.add.image(0, 688, 'platformplatform').setOrigin(0).setScale(1).setScrollFactor(1);

        

        this.subwayDoors = this.add.image(1291, 773, 'subwayDoors')
            .setOrigin(0.5, 1)
            .setScale(0); // start at 0

        this.tweens.add({
            targets: this.subwayDoors,
            scaleX: 1,
            scaleY: 1,
            duration: 2000,
            ease: 'Sine.easeInOut'
        });

        this.add.image(1290, 800, 'tracks').setOrigin(0.5, 1).setScrollFactor(1);
        

        // Add player sprite
        this.player = this.add.sprite(100, 588, 'playerRight', 3)
            .setOrigin(0.5)
            .setScale(6)
            .play('playerWalkRight');

        this.tryAgain = this.add.image(750, 500, 'tryagainButton').setOrigin(0.5).setScrollFactor(1).setInteractive({ useHandCursor: true }).setVisible(false).on('pointerdown', () => this.scene.restart());

        // Countdown text
        this.countdown = 3;

        this.instructionText = this.add.text(750, 200, 'Hinn med tunnelbanan!', {
            fontSize: '40px',
            fill: 'red'
        }).setOrigin(0.5);
        this.countdownText = this.add.text(750, 300, `Dörrarna stängs om: ${this.countdown}`, {
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Start countdown
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.tick,
            callbackScope: this,
            repeat: 2 // because we start at 3 → 2 → 1
        });

        this.gameOver = false;
        this.success = false;

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
         const popupImage = this.add.image(centerX - 200, centerY - 100, 'londonImg')
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
         .on('pointerdown', () => this.scene.start('LondonScene'));
 
 
         // Add all to group
         this.popupGroup.addMultiple([
             popupBg, topEdge, bottomEdge, leftEdge, rightEdge,
             popupImage, popupText, closeButton
         ]);
 
         // Initially hidden
         this.popupGroup.setVisible(false).setDepth(5);
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

    tick() {
        this.countdown--;
        this.countdownText.setText(`Dörrarna stängs om: ${this.countdown}`);
        
        if (this.countdown === 0) {
            this.checkWinCondition();
        }
    }

    checkWinCondition() {
        if (this.player.x >= 1000) {
            this.success = true;
            this.showResult("Du hann med!");
        } else {
            this.success = false;
            this.showFail("Ajdå... Dörrarna stängdes.");
        }
        this.gameOver = true;
    }

    showResult(message) {
        this.resultText = this.add.text(750, 400, message, {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 10, y: 10 }
        }).setOrigin(0.5);

        // Add memory text after a short delay
        this.time.delayedCall(2000, () => {
            this.showPopup('Även fast jag dog både höger och vänster den här resan så var den supermysig<3 Vi åt supergod mat, gjorde en massa sightseeing, och du fick mig att iallafall stå på benen. Om jag fick ändra något hade det varit att göra tunnelbanan lättare att hinna med!! Puss');
        });
    }

    showFail(message) {
        this.resultText = this.add.text(750, 400, message, {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 10, y: 10 }
        }).setOrigin(0.5);

        // Add memory text after a short delay
        this.time.delayedCall(2000, () => {
            this.tryAgain.setVisible(true);
        });
    }
        

    update() {
        const speed = 450;
        let moving = false;
        let movingRight = false;
        let movingLeft = false;
        if (this.gameOver) return;

        if (this.cursors.right.isDown) {
            if (this.player.x < 1063) {
                this.player.x += speed * this.game.loop.delta / 1000;
                moving = true;
                movingRight = true;
            }
        } else if (this.cursors.left.isDown) {
            if (this.player.x > 0) {
                this.player.x -= speed * this.game.loop.delta / 1000;
                moving = true;
                movingLeft = true;
            }
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
    }
}
