Player = function(game) {
  this.game = game;
  this.player = null;
  this.shotFlash = null;
  this.reticalPosition = 0;
  this.canFire = true;
  this.shots = null;
}

Player.prototype = {
  create: function() {
    
    this.player = this.game.add.sprite(this.game.world.width / 2 + 150, this.game.world.height - 60, 'objects');
    this.player.frameName = 'rifle.png';
    this.player.anchor.setTo(0.5, 0.5);
    //this.player.animations.add('fire', [0,1,0]);
    
    this.shots = this.game.add.group();
    this.shots.createMultiple(30, 'objects');
    this.shots.setAll('frameName', 'shot_grey_small.png');
    this.shots.setAll('anchor.x', 0.5);
    this.shots.setAll('anchor.y', 0.5);
    
    this.game.input.onDown.add(this.shoot, this);
  },
  
  update: function() {
  },
  
  shoot: function() {
    
    var shot = this.shots.getFirstExists(false);
    shot.reset(this.game.input.x, this.game.input.y);
    game.time.events.add(750, function() {
       shot.kill();
    }, this);

    if (this.canFire) {
      this.canFire = false;

      this.game.add.tween(this.player).to({y: this.player.y + 20}, 150, Phaser.Easing.Linear.None, true).onComplete.add(function() {
        this.game.add.tween(this.player).to({y: this.player.y - 20}, 150, Phaser.Easing.Linear.None, true).onComplete.add(function() {
          this.canFire = true;
        }, this);
      }, this);
    }
    
    this.game.sound.play('shot');
    //this.player.animations.play('fire', 30, false)
    
    /*this.game.add.tween(this.shotFlash).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true).onComplete.add(function() {
      this.game.add.tween(this.shotFlash).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
    }, this);*/
    
    //this.shotFlash.alpha = 0;
  },
  
  checkOverlap: function(sprite1, sprite2) {
    var bounds1 = sprite1.getBounds();
    var bounds2 = sprite2.getBounds();
    
    return Phaser.Rectangle.intersects(bounds1, bounds2);
  }
  
  /*render: function() {
    this.lasers.forEach(function(laser) {
      this.game.debug.body(laser);
    });
  }*/
}