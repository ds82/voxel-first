var voxel = require('voxel-engine');
var game  = voxel({
  texturePath: ''
});

var container = document.body;
game.appendTo( container );

var vxPlayer = require('voxel-player')( game );
var dude = vxPlayer('dude.png');

dude.possess();
dude.yaw.position.set( 0, 100, 0 );