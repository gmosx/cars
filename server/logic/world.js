var b2d = require('box2d'),
    mapDef = require('b2MapDef');

var World = function World(options) {
    var worldAABB = new b2d.b2AABB();
    worldAABB.minVertex.Set(0, 0);
    worldAABB.maxVertex.Set(900, 675);
    var gravity = new b2d.b2Vec2(0, 0);
    this.b2world = new b2d.b2World(worldAABB, gravity, true);
};

World.prototype.loadMap = function() {
    var mapBody = b2d.b2BodyDef();
    mapBody.AddShape(mapDef.b2MapDefOuter);
    mapBody.AddShape(mapDef.b2MapDefInner);
    mapBody.position.Set(0, 0);
    this.b2world.createBody(mapBody);
};

exports.World = World;