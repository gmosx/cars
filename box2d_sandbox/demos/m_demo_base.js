function createWorld() {
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(0, 0);
    worldAABB.maxVertex.Set(950, 685);
    var gravity = new b2Vec2(0, 0);
    var doSleep = true;
    var world = new b2World(worldAABB, gravity, doSleep);
    return world;
}

function createGround(world) {
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(1000, 50);
    groundSd.restitution = 0.2;
    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundBd.position.Set(-500, 340);
    return world.CreateBody(groundBd)
}

function createBall(world, x, y) {
    var ballSd = new b2CircleDef();
    ballSd.density = 1.0;
    ballSd.radius = 10;
    ballSd.restitution = 1.0;
    ballSd.friction = 0;
    var vel = new b2Vec2(Math.random()*300 - 150, Math.random()*100 - 50);
    var ballBd = new b2BodyDef();
    ballBd.AddShape(ballSd);
    ballBd.linearDamping = 0.0075;
    ballBd.position.Set(x,y);
    var bd =  world.CreateBody(ballBd);
    bd.SetLinearVelocity(vel);
    //bd.SetAngularVelocity(vel);
    return bd;
}

function createBox(world, x, y, width, height, fixed) {
    if (typeof(fixed) == 'undefined') fixed = true;
    var boxSd = new b2BoxDef();
    if (!fixed) boxSd.density = 1.0;
    boxSd.extents.Set(width, height);
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);
    return world.CreateBody(boxBd)
}

var demos = {};
demos.InitWorlds = [];
