var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    cluster = require('cluster'),
    b2d = require('./logic/box2d');

var WAITING = 0,
    STARTED = 1;

var Game = function (params) {
    this.state = WAITING;
    this.round = 0;
    this.players = [];


    var worldAABB = new b2d.b2AABB();
    worldAABB.minVertex.Set(0, 0);
    worldAABB.maxVertex.Set(900, 675);
    var gravity = new b2d.b2Vec2(0, 0);
    this.world = new b2d.b2World(worldAABB, gravity, true);

    createTrack(this.world);

    setTimeout(this._onTick.bind(this), 170);
};

util.inherits(Game, EventEmitter);

Game.prototype.addPlayer = function (player) {
    this.players.push(player);
    player.
        on('accelerate', this._onAccelerate.bind(this, player)).
        on('rotate', this._onRotate.bind(this, player)).
        on('brake', this._onBrake.bind(this, player));
    player.body = createCar(this.world, 450, 50 + (this.players.length * 15) % 150);
};

Game.prototype.killPlayer = function (player) {
    this.players.splice(this.players.indexOf(player), 1);
    player.body.Destroy()
};

Game.prototype._onTick = function () {

    this.players.forEach(function (p) {
//        p.body
    })

    this.world.Step(1.0 / 60, 1);
    setTimeout(this._onTick.bind(this), 17);

    this.emit('update', {
        players: this.players.map(function (p) {
            return p.toJSON();
        })
    });
};

Game.prototype._onAccelerate = function (player, delta) {
//    console.log('accelerate ', player.id, delta)

    player.a = delta / 100;


//    var radians = (player.angle / 180.0) * Math.PI;
//    player.y += delta * Math.sin(radians);
//    player.x += delta * Math.cos(radians);

//    this.emit('update', player.toJSON());
};

Game.prototype._onRotate = function (player, delta) {
    player.angle += delta;

//    this.emit('update', player.toJSON());
};

Game.prototype._onBrake = function (player, data) {
    player.v = 0;
    player.a = 0;
};
function parseVertixes(path) {
    var toPair = function (v) {
        var p = v.split(' ');
        return {
            x: parseFloat(p[0]),
            y: parseFloat(p[1])
        };
    };
    return path.split(', ').map(toPair).map(function (p) {
        p.x += .1;
        return p;
    });
}

var innerVertexes = parseVertixes('639.500 606.830, 203.500 605.830, 193.500 617.830, 171.500 851.830, ' +
        '180.500 877.830, 191.500 876.830, 202.500 866.830, 218.500 675.830, 264.500 634.830, 296.500 623.830, ' +
        '405.500 626.830, 430.500 641.830, 668.500 877.830, 675.500 868.830, 649.500 615.830'),
    outerVertexes = parseVertixes('744.149 415.926, 152.660 415.926, 93.085 434.011, 55.851 462.735, 38.830 519.117, ' +
        '0.532 932.947, 15.426 973.373, 47.340 997.841, 73.936 1009.543, 317.553 1013.798, ' +
        '372.872 984.011, 400.532 929.756, 386.702 755.288, 400.532 752.096, 647.340 999.969, ' +
        '676.064 1012.735, 815.425 1008.479, 854.787 998.905, 882.447 968.054, 899.468 906.352, ' +
        '851.596 495.713, 831.383 452.096, 797.340 430.820, 764.362 420.181');

function line(x1, y1, x2, y2) {
    var w = 5,
        pd = new b2d.b2PolyDef();
    if (x1 > x2) {
        x1 += x2;
        x2 = x1 - x2;
        x1 = x1 - x2;

        y1 += y2;
        y2 = y1 - y2;
        y1 = y1 - y2;
    }

    pd.vertices = [
        [x1, y1],
        [x2, y2],
        [x2, y2 + w],
        [x1, y1 + w]
    ]

    pd.vertices = pd.vertices.map(function (p) {
        return new b2d.b2Vec2(p[0], p[1]);
    });
    pd.vertexCount = pd.vertices.length;
    pd.restitution = .1;
    pd.friction = .7;
    return pd;
}

function buildOuterShape(points) {
    var shp = new b2d.b2BodyDef(),
        p = points.slice(0),
        first = p.shift(),
        prev = first,
        cur;
    if (!points.length) return shp;
    while (cur = p.shift()) {
        shp.AddShape(line(prev.x, prev.y, cur.x, cur.y));
        prev = cur;
    }
    shp.AddShape(line(first.x, first.y, prev.x, prev.y));
    return shp;
}

function createTrack(world) {
    var outer = buildOuterShape(outerVertexes),
        inner = buildOuterShape(innerVertexes);
    outer.position.Set(0, -370);
    inner.position.Set(0, -370);
    world.CreateBody(outer);
    world.CreateBody(inner);
}

function createCar(world, x, y) {
    var cd = new b2d.b2BoxDef(),
        bd = new b2d.b2BodyDef();
    cd.extents.Set(20, 10);
    cd.density = 1.0;
    bd.AddShape(cd);
    bd.position.Set(x, y);
    var body = world.CreateBody(bd);
    body.SetAngularVelocity(.5);
    body.SetLinearVelocity(new b2d.b2Vec2(300,0))
    console.log(body)
    return body;
}

exports.Game = Game;