export default class ChessGameScene extends Phaser.Scene {
    constructor() {
        super('ChessGameScene');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.image(0, 0, 'chessBoard').setOrigin(0).setScrollFactor(1);
        this.add.image(685, 525, 'shotglass').setOrigin(0).setScrollFactor(1).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.showPopup("Vårt tredje (!!!) nyår tillsammans. Vi båda dog av schacken men återhämtade oss för att hälsa på dina farföräldrar och stannade där tills typ 23:45... Sen tog vi oss i kragen och lyckades få ett privat firande innan vi myste hos Alex<3"));

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
        const popupImage = this.add.image(centerX - 200, centerY - 100, 'newyear')
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
        .on('pointerdown', () => this.scene.start('ChessScene'));


        // Add all to group
        this.popupGroup.addMultiple([
            popupBg, topEdge, bottomEdge, leftEdge, rightEdge,
            popupImage, popupText, closeButton
        ]);

        // Initially hidden
        this.popupGroup.setVisible(false);

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
    }
}