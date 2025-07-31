export default class PhotoScene extends Phaser.Scene {
    constructor() {
        super('PhotoScene');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.add.image(0, 0, 'insideGreekHouse').setOrigin(0).setScrollFactor(1);
        this.wall = this.add.image(1000, 0, 'wall').setOrigin(0).setScrollFactor(1);
        this.add.image(800, 100, 'box1').setOrigin(0).setScrollFactor(1);
        this.add.image(800, 350, 'box2').setOrigin(0).setScrollFactor(1);
        this.add.image(800, 600, 'box3').setOrigin(0).setScrollFactor(1);
        const picture1 = this.add.image(500, 50, 'greece1').setOrigin(0).setScrollFactor(1).setVisible(false);

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
        const popupImage = this.add.image(centerX - 200, centerY - 100, 'greece1')
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

        this.boxText = this.add.text(this.player.x, this.player.y - 40, 'Välj med SPACE', {
            fontSize: '18px',
            fill: '#fff',
        }).setVisible(false);

        this.correctText = this.add.text(this.player.x, this.player.y - 40, 'Rätt!', {
            fontSize: '18px',
            fill: '#fff',
        }).setVisible(false);

        this.falseText = this.add.text(this.player.x, this.player.y - 40, 'Fel! Välj en annan', {
            fontSize: '18px',
            fill: '#fff',
        }).setVisible(false);

        this.foundBox = false;
        this.foundWrongBox = false;

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
        let isNear1 = false;
        let isNear2 = false;
        let isNear3 = false;
        let isMovable = true;
        

        if (this.player.x > 1000) {
            isNear = true;
        }

        if (this.player.x > 700) {
            if (this.player.y < 170) {
                isNear1 = true;
            }

            if (this.player.y > 250 && this.player.y < 400) {
                isNear2 = true;
            }

            if (this.player.y > 550) {
                isNear3 = true;
            }
        } 

        if (this.player.x > 930 && !this.foundBox){
            isMovable = false;
        }
      
        if (this.cursors.left.isDown) {
            this.player.x -= speed * this.game.loop.delta / 1000;
            moving = true;
            movingLeft = true;
        } else if (this.cursors.right.isDown) {
            if (isMovable) {
                this.player.x += speed * this.game.loop.delta / 1000;
                moving = true;
                movingRight = true;
            }
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
            this.scene.start('MainScene');
        }

        this.interactText.setPosition(this.player.x, this.player.y - 40);
        this.interactText.setVisible(isNear);

        this.boxText.setPosition(this.player.x, this.player.y - 40);
        this.boxText.setVisible((isNear1 || isNear2 || isNear3) && !this.foundBox);

        this.correctText.setPosition(this.player.x, this.player.y - 40);
        this.falseText.setPosition(this.player.x, this.player.y);


        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if (!this.popupVisible && isNear) {
                this.showPopup("Detta var vår första utomlandsresa ihop. Jag minns så väl de goda drinkarna, när jag utklassade dig på oddset, och hur du övervann snöblindhet<3");
        
            } else if (isNear3 && !this.foundBox) {
                this.foundBox = true;
                this.boxText.setVisible(false);
                this.correctText.setText('Rätt!');
                this.correctText.setVisible(true);
                this.wall.setVisible(false);
        
                this.time.delayedCall(1200, () => {
                    this.correctText.setVisible(false);
                });
        
            } else if ((isNear2 || isNear1) && !this.foundBox && !this.foundWrongBox) {
                this.foundWrongBox = true;
                this.falseText.setVisible(true);
        
                this.time.delayedCall(1200, () => {
                    this.falseText.setVisible(false);
                    this.foundWrongBox = false;
                });
            }
        }
        
          
    }
}