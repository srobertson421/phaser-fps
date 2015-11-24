var game = new Phaser.Game(1280, 720, Phaser.CANVAS);

game.global = {
  sound: true,
  playerHealth: 5,
  score: 0,
  deadEnemies: 0
}

game.state.add('boot', new Boot(game));
game.state.add('load', new Load(game));
game.state.add('menu', new Menu(game));
game.state.add('play', new Play(game));
game.state.add('win', new Win(game));
game.state.add('lose', new Lose(game));
game.state.start('boot');