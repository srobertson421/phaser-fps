Boot = function(game) {
  this.game = game;
}

Boot.prototype = {
  create: function() {
    
    //Scaling
    this.game.input.maxPointers = 1;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Phaser current version test environment
    // TweenManager#removeFrom implementation

    /**
    * Remove all tweens from a specific object, array of objects or group.
    *
    * @method Phaser.TweenManager#removeFrom
    * @param {object|object[]|Phaser.Group} obj - The object you want to remove the tweens from.
    * @param {boolean} children - If passing a group, setting this to true will remove the tweens from all of its children instead of the group itself.
    */
    Phaser.TweenManager.prototype.removeFrom = function(obj, children) {

            var o, c, t, len;

            if (Array.isArray(obj) )
            {
                for (o = 0, len = obj.length; o < len; o++)
                {
                    this.removeFrom(obj[o]);   
                }
            }
            else if (obj.type === Phaser.GROUP && children)
            {
                for (c = 0, len = obj.children.length; c < len; c++)
                {
                    this.removeFrom(obj.children[c]);   
                }
            }
            else
            {
                for (t = 0, len = this._tweens.length; t < len; t++)
                {
                    if (obj === this._tweens[t]._object)
                    {
                        this.remove(this._tweens[t]);
                    }
                }
                for (t = 0, len = this._add.length; t < len; t++)
                {
                    if (obj === this._add[t]._object)
                    {
                        this.remove(this._add[t]);
                    }
                }
            }
    };

    this.game.state.start('load');
  }
}