Enemies = function(game) {
  this.game = game;
  this.enemies = null;
  this.flash = null;
  this.explosions = null;
}

Enemies.prototype = {
  
  create: function() {
    
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemies.createMultiple(20, 'objects');
    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('anchor.y', 0.5);
    this.enemies.setAll('inputEnabled', true);
    this.enemies.callAll('events.onInputDown.add', 'events.onInputDown', this.killEnemy, this);
    
    for(var i = 0; i < this.enemies.children.length; i++) {
      
      var enemy = this.enemies.children[i];
      
      if (i % 2 === 0) {
        enemy.frameName = 'duck_outline_brown.png';
        enemy.name = 'brown';
      } else {
        enemy.frameName = 'duck_outline_yellow.png';
        enemy.name = 'yellow';
      }
    }
    
    this.explosions = this.game.add.group();
    for(var i = 0; i < 20; i++) {
      var explosion = this.explosions.create(0, 0, 'explosion', 'sonicExplosion00', false);
      explosion.anchor.setTo(0.5, 0.5);
      explosion.animations.add('explode', ['sonicExplosion00', 'sonicExplosion01', 'sonicExplosion02', 'sonicExplosion03', 'sonicExplosion04', 'sonicExplosion05', 'sonicExplosion06', 'sonicExplosion07', 'sonicExplosion08'], 8);
    }
    
    // Plugins
    this.game.plugins.juicy = this.game.plugins.add(Phaser.Plugin.Juicy);
    this.flash = this.game.plugins.juicy.createScreenFlash('red');
    this.game.add.existing(this.flash);
  },
  
  spawnEnemy: function() {
    var enemy = this.enemies.getFirstExists(false);
    
    if (enemy.name == 'brown') {
      enemy.reset(this.game.rnd.integerInRange(200, this.game.world.width - 200), this.game.world.height + 150);
      enemy.health = 2;
    } else if (enemy.name = 'yellow') {
      enemy.reset(this.game.rnd.integerInRange(200, this.game.world.width - 200), this.game.world.height + 150);
      enemy.health = 3;
    }
    enemy.moveTween = this.game.add.tween(enemy).to({y: this.game.world.height / 2}, 1000, Phaser.Easing.Linear.None)
    enemy.moveTween.onComplete.add(function() {
      //this.hitPlayer(enemy);
    }, this);
    enemy.moveTween.start();
  },
  
  killEnemy: function(enemy) {
    console.log(enemy.health);
    enemy.health--;
    
    if (enemy.health === 0) {
      var explosion = this.explosions.getFirstExists(false);
      explosion.reset(enemy.x, enemy.y);
      explosion.play('explode', 8, false, true);
      
      enemy.moveTween.stop();
      enemy.kill();
      this.game.global.deadEnemies++
      
      this.game.global.score += 10;
      var newScoreString = this.game.global.score.toString();
      var stepAmount = 5 - newScoreString.length;
      for (var i = 0; i < stepAmount; i++) {
        newScoreString = '0' + newScoreString;
      }
      var scoreArray = newScoreString.split('');
      var digits = this.game.state.states.play.scoreDigits.children;

      // Iterate through score sprites group going from the back
      for (i = digits.length - 1; i >= 0; i--) {
        var scoreSprite = digits[i];
        scoreSprite.frameName = 'text_' + scoreArray[i] + '_small.png';
      }
    }
    else {
      this.game.add.tween(enemy).to({x: '-10'}, 250, Phaser.Easing.Linear.None).onComplete.add(function() {
        this.game.add.tween(enemy).to({x: '+10'}, 250, Phaser.Easing.Linear.None)
      }, this);
    }
  },
  
  update: function() {
  },
  
  checkOverlap: function(sprite1, sprite2) {
    var bounds1 = sprite1.getBounds();
    var bounds2 = sprite2.getBounds();
    
    return Phaser.Rectangle.intersects(bounds1, bounds2);
  },
  
  hitPlayer: function(enemy) {
    enemy.moveTween.stop();
    if (enemy.scale.x == 3 && enemy.scale.y == 3) {
      this.game.plugins.juicy.shake(10, 10);
      this.flash.flash();
      enemy.kill();
      this.game.global.playerHealth--;
      this.game.state.states.play.healthText.setText(this.game.global.playerHealth * 20 + '%');
    }
  }
}