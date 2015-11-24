Load = function(game) {
  this.game = game;
}

Load.prototype = {
  preload: function() {
    this.game.load.image('background', 'assets/forest-background.png');
    //this.game.load.spritesheet('gun', 'assets/gun-sprite.png', 88, 152);
    //this.game.load.image('crosshair', 'assets/c_cross.png');
    this.game.load.atlasXML('hud', 'assets/spritesheet_hud.png', 'assets/spritesheet_hud.xml');
    this.game.load.atlasXML('objects', 'assets/spritesheet_objects.png', 'assets/spritesheet_objects.xml');
    //this.game.load.image('treeGuy', 'assets/treeman-small.png');
    //this.game.load.image('muzzleFlash', 'assets/laser.png');
    this.game.load.atlasJSONHash('explosion', 'assets/explosion.png', 'assets/explosion.json');
    this.game.load.audio('shot', ['assets/shot.mp3', 'assets/shot.ogg']);
  },
  
  create: function() {
    this.game.stage.backgroundColor = '000000';
    
    this.game.state.start('menu');
  }
}
