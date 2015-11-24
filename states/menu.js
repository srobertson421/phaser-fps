Menu = function(game) {
  this.game = game;
  this.menuBg = null;
  this.crosshair = null;
}

Menu.prototype = {
  create: function() {
    
    this.game.global.playerHealth = 5;
    this.game.global.score = 0;
    this.game.global.deadEnemies = 0;
    
    if (this.game.device.desktop) {
      this.game.input.onDown.add(this.shootTitle, this);
    }
    
    this.menuBg = this.game.add.tileSprite(0, 0, 1280, 720, 'background');
    
    this.title = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2 - 40, "Shoot Title to Continue", { font: '72px Arial', fill: '#ffffff', align: 'center' });
    this.title.anchor.setTo(0.5, 0.5);
    
    this.crosshair = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'hud');
    this.crosshair.frameName = 'crosshair_white_large.png';
    this.crosshair.anchor.setTo(0.5, 0.5);
    
    this.game.input.addMoveCallback(this.movePointer, this);
  },
  
  update: function() {
    if (!this.game.device.desktop) {
      if (this.checkOverlap(this.crosshair, this.title)) {
        this.game.state.start('play');
      }
    }
    
    if (this.checkOverlap(this.crosshair, this.title)) {
      this.crosshair.tint = 0xff0000;
      this.title.tint = 0xff0000;
    }
    else {
      this.crosshair.tint = 0xffffff;
      this.title.tint = 0xffffff;
    }
  },
  
  start: function() {
    this.game.state.start('play');
  },
  
  movePointer: function(pointer, x, y) {
    if (this.game.input.mouse.locked) {
      this.crosshair.x += this.game.input.mouse.event.webkitMovementX;
      this.crosshair.y += this.game.input.mouse.event.webkitMovementY;
    }
    else {
      this.crosshair.x = x;
      this.crosshair.y = y;
    }
  },
 
  checkOverlap: function(sprite1, sprite2) {
    var bounds1 = sprite1.getBounds();
    var bounds2 = sprite2.getBounds();
    
    return Phaser.Rectangle.intersects(bounds1, bounds2);
  },
  
  shootTitle: function() {
    if (this.checkOverlap(this.crosshair, this.title)) {
      this.game.sound.play('shot');
      this.game.state.start('play');
    }
  }
}