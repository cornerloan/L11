class Shooter extends Phaser.Scene {
    constructor() {
        super("shooter");
        this.my = { sprite: {} };

        this.bodyX = 300;
        this.bodyY = 350;

        this.shotX = this.bodyX + 10;
        this.shotY = 350;

        this.shotDir = 1;

        this.aKey = null;
        this.dKey = null;
        this.spaceKey = null;
    }

    preload() {
        //image path
        this.load.setPath("./assets/");
        this.load.atlasXML("spritePack", "spritesheet_default.png", "spritesheet_default.xml");

        /*
        //player body
        this.preload.image("player", "character_roundGreen.png");
        //shooting particle
        this.preload.image("shot", "effect_shot.png");
        */

        document.getElementById('description').innerHTML = '<h2>shooter.js<br>A - move left // D - move right // SPACE - shoot<\h2>'

    }

    create() {
        let my = this.my;

        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "spritePack", "character_roundGreen.png");
        //my.sprite.shot = this.add.sprite(this.shotX, this.shotY, "spritePack", "effect_shot.png");
        //my.sprite.shot.visible = false;

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.shots = [];
        this.shotsDir = [];

    }

    update() {
        let my = this.my;

        //movement left and right
        if (this.aKey.isDown) {
            if (my.sprite.body.x > 0) {
                my.sprite.body.x -= 5;
                my.sprite.bodyX = my.sprite.body.x;
                this.shotX = my.sprite.body.x + 10;
            }
        }
        if (this.dKey.isDown) {
            if (my.sprite.body.x < game.config.width) {
                my.sprite.body.x += 5;
                my.sprite.bodyX = my.sprite.body.x;
                this.shotX = my.sprite.body.x + 10;
            }
        }

        //changes shot direction
        if (Phaser.Input.Keyboard.JustDown(this.aKey)) {
            my.shotDir = -1;
            my.sprite.body.flipX = true;
        }
        if (Phaser.Input.Keyboard.JustDown(this.dKey)) {
            my.sprite.body.flipX = false;
            my.shotDir = 1;
        }

        //checks if player shoots
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            //my.sprite.shot.visible = true;
            this.shoot(my.shotDir);
        }


        this.shots.forEach((shot) => {
            if (shot.flipX == true) {
                shot.x -= 10;
            }
            else {
                shot.x += 10;
            }
        });
    }

    shoot(dir) {
        let my = this.my;
        my.sprite.shot = this.add.sprite(this.shotX, this.shotY, "spritePack", "effect_shot.png");
        if (dir == -1) {
            my.sprite.shot.flipX = true;
        }
        this.shots.push(my.sprite.shot);
        //while(my.sprite.shot.x < game.config.width && my.sprite.shot.x > 0) {
        //    my.sprite.shot.x += 0.00001 * this.my.shotDir;
        //    
        //}
    }
}