var Play = function(game) {
  this.game = game;
  this.guy = new Player(game);
  this.enemies = new Enemies(game);
  this.crosshair = null;
  this.timer1 = null;
  this.scoreDigits = null;
  this.healthText = null;
}

Play.prototype = {
  
  create: function() {
    
    this.game.input.addMoveCallback(this.movePointer, this);
    
    this.bg = this.game.add.tileSprite(0, 0, 1280, 720, 'background');
    
    this.enemies.create();
    this.guy.create();
    
    this.crosshair = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'hud');
    this.crosshair.frameName = 'crosshair_white_large.png';
    this.crosshair.anchor.setTo(0.5, 0.5);
    
    //this.crosshair = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'crosshair');
    //this.crosshair.anchor.setTo(0.5, 0.5);
    
    this.timer1 = this.game.time.create(false);
    this.timer1.loop(2000, this.spawnEnemy, this);
    this.timer1.start();
    
    /*this.scoreText = this.game.add.text(100, 100, '0', { font: '56px Arial', fill: '#ff0000', align: 'center' });
    this.scoreText.anchor.setTo(0.5, 0.5);
    this.scoreLabel = this.game.add.text(100, 50, 'Score', { font: '56px Arial', fill: '#ff0000', align: 'center' });
    this.scoreLabel.anchor.setTo(0.5, 0.5);*/
    
    this.scoreDigits = this.game.add.group();
    this.createScore();
    
    this.scoreLabel = this.game.add.sprite(75, 50, 'hud');
    this.scoreLabel.frameName = 'text_score_small.png';
    this.scoreLabel.anchor.setTo(0.5, 0.5);
    
    this.healthText = this.game.add.text(this.game.world.width - 100, 100, this.game.global.playerHealth * 20 + '%', { font: '56px Arial', fill: '#ff0000', align: 'center' });
    this.healthText.anchor.setTo(0.5, 0.5);
    this.healthLabel = this.game.add.text(this.game.world.width - 100, 50, 'Health', { font: '56px Arial', fill: '#ff0000', align: 'center' });
    this.healthLabel.anchor.setTo(0.5, 0.5);
  },
  
  update: function() {
    
    this.guy.update();
    this.enemies.update();
    
    if (this.checkOverlap(this.crosshair, this.enemies.enemies)) {
      this.crosshair.tint = 0xff0000;
    }
    else {
      this.crosshair.tint = 0xffffff;
    }
    
    if (this.game.global.playerHealth === 0) {
      this.game.state.start('lose');
    }
  },
  
  movePointer: function(pointer, x, y) {
    if (this.game.input.mouse.locked) {
      this.crosshair.x += this.game.input.mouse.event.webkitMovementX;
      this.crosshair.y += this.game.input.mouse.event.webkitMovementY;
    }
    else {
      this.crosshair.x = x;
      this.crosshair.y = y;
      this.guy.player.x = x + 100;
      this.guy.reticalPosition = y;
      //this.guy.shotFlash.x = x;
      //this.guy.shotFlash.y = y;
    }
  },
 
  checkOverlap: function(sprite1, sprite2) {
    var bounds1 = sprite1.getBounds();
    var bounds2 = sprite2.getBounds();
    
    return Phaser.Rectangle.intersects(bounds1, bounds2);
  },
  
  spawnEnemy: function() {
    this.enemies.spawnEnemy();
    if (this.enemies.deadEnemies === 5) {
      this.timer2 = this.game.time.create(false);
      this.timer2.loop(1500, this.spawnEnemy, this);
      this.timer2.start();
    }
    else if (this.enemies.deadEnemies === 20) {
      this.timer3 = this.game.time.create(false);
      this.timer3.loop(1000, this.spawnEnemy, this);
      this.timer3.start();
    }
  },
  
  createScore: function() {
    var pos = 175;
    var scoreArray = this.game.global.score.toString().split('');
    
    for (var i = 0; i < 5; i++) {
      pos = pos + 35;
      var digit = this.scoreDigits.create(pos, 50, 'hud', 'text_0_small.png');
      digit.anchor.setTo(0.5, 0.5);
    }
  }
}