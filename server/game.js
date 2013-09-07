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
    this.world.DestroyBody(player.body);
};

Game.prototype._onTick = function () {

    this.players.forEach(function (p) {
        var v = p.body.m_linearVelocity;

        var x1 = p.a * Math.cos(p.body.m_rotation) - 0 * Math.sin(p.body.m_rotation);
        var y1 = p.a * Math.sin(p.body.m_rotation) + 0 * Math.cos(p.body.m_rotation);
        var a = b2d.b2Vec2.Make(x1, y1);
        v.Add(a);

        console.log(p.body.m_rotation);


        p.body.SetAngularVelocity(p.angle / 20);
        console.log(p.angle);
        p.body.SetLinearVelocity(v);
//        v = p.body.GetOriginPosition();
//        p.body.SetOriginPosition(v, p.angle);
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
    player.a = delta / 100 * 7;
};

Game.prototype._onRotate = function (player, delta) {
    player.angle = delta;

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
        '180.500 877.830, 191.500 876.830, 217.500 866.830, 222.500 675.830, 264.500 630.830, 296.500 617.830, ' +
        '425.500 618.830, 450.500 641.830, 695.500 877.830, 700.500 868.830, 657.500 615.830'),
    outerVertexes = parseVertixes('744.149 415.926, 152.660 415.926, 93.085 434.011, 55.851 462.735, 38.830 519.117, ' +
        '0.532 932.947, 15.426 973.373, 47.340 997.841, 73.936 1009.543, 317.553 1013.798, ' +
        '372.872 984.011, 400.532 929.756, 380.702 755.288, 384.532 752.096, 635.340 999.969, ' +
        '676.064 1012.735, 800.425 1008.479, 840.787 998.905, 867.447 968.054, 883.468 906.352, ' +
        '831.596 495.713, 813.383 452.096, 797.340 430.820, 764.362 420.181');

function line(x1, y1, x2, y2) {
    var w = 1,
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
    pd.restitution = .5;
    pd.friction = 0.5;
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
    outer.position.Set(-10, -382);
    inner.position.Set(-10, -382);
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
//    bd.angularDamping = 0.005;
    bd.linearDamping = 0.01;
    bd.allowSleep = false;
    var body = world.CreateBody(bd);
    body.SetLinearVelocity(new b2d.b2Vec2(1, 0))
    body.SetAngularVelocity(0.5)
    return body;
}

exports.Game = Game;