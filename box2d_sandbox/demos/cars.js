demos.cars = {};

b2Settings.b2_maxPolyVertices = 128;

function parseVertixes(path) {
    var toPair = function(v) {
            var p = v.split(' ');
            //return p.map(parseFloat);
            return {
                x: parseFloat(p[0]),
                y: parseFloat(p[1])
            };
        },
        toVertex = function(pair) {
            return new b2Vec2(pair.x, pair.y);
        };
    return path.split(', ').map(toPair).map(toVertex);
}

var b2MapDefInner = new b2PolyDef(),
    b2MapDefOuter = new b2PolyDef(),
    innerVertexes = parseVertixes('639.500 606.830, 203.500 605.830, 193.500 617.830, 171.500 851.830, ' +
        '180.500 877.830, 191.500 876.830, 202.500 866.830, 218.500 675.830, 264.500 634.830, 296.500 623.830, ' +
        '405.500 626.830, 430.500 641.830, 668.500 877.830, 675.500 868.830, 649.500 615.830'),
    outerVertexes = parseVertixes('744.149 415.926, 152.660 415.926, 93.085 434.011, 55.851 462.735, 38.830 519.117, ' +
        '0.532 932.947, 15.426 973.373, 47.340 997.841, 73.936 1009.543, 317.553 1013.798, ' +
        '372.872 984.011, 400.532 929.756, 386.702 755.288, 400.532 752.096, 647.340 999.969, ' +
        '676.064 1012.735, 815.425 1008.479, 854.787 998.905, 882.447 968.054, 899.468 906.352, ' +
        '851.596 495.713, 831.383 452.096, 797.340 430.820, 764.362 420.181'),
    innerVertexes = parseVertixes('120 120, 250 120, 320 150, 250 180, 120 180'),
    outerVertexes =  parseVertixes('100 100, 300 100, 350 150, 300 200, 100 200');

b2MapDefInner.vertexCount = innerVertexes.length;
b2MapDefInner.vertices = innerVertexes;
b2MapDefInner.restitution = -1.0;
b2MapDefInner.friction = .3;
b2MapDefInner.groupIndex = 1;

b2MapDefOuter.vertexCount = outerVertexes.length;
b2MapDefOuter.vertices = outerVertexes;
b2MapDefOuter.restitution = -1.0;
b2MapDefOuter.friction = .3;
b2MapDefInner.groupIndex = 1;

function createTrack(world) {
    var trackOuterBd = new b2BodyDef();
    trackOuterBd.AddShape(b2MapDefOuter);
    trackOuterBd.position.Set(50,350);
    outer = world.CreateBody(trackOuterBd);


    var trackInnerBd = new b2BodyDef();
    trackInnerBd.AddShape(b2MapDefInner);
    trackInnerBd.position.Set(50,350);
    world.CreateBody(trackInnerBd);
    //demos.top.createPoly(world, 0, 0, innerVertexes, true);
}

demos.cars.initWorld = function(world) {
    createTrack(world);
    createBall(world, 500, 300);
}
demos.InitWorlds.push(demos.cars.initWorld);