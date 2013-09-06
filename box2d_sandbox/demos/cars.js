demos.cars = {};

b2Settings.b2_maxPolyVertices = 256;

function parseVertixes(path) {
    var toPair = function(v) {
            var p = v.split(' ');
            return {
                x: parseFloat(p[0]),
                y: parseFloat(p[1])
            };
        },
        toVertex = function(pair) {
            return new b2Vec2(pair.x, pair.y);
        };
    return path.split(', ').map(toPair).map(function(p) {p.x += .1; return p; }).map(toVertex);
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
        '851.596 495.713, 831.383 452.096, 797.340 430.820, 764.362 420.181');

b2MapDefInner.vertexCount = innerVertexes.length;
b2MapDefInner.vertices = innerVertexes;

b2MapDefOuter.vertexCount = outerVertexes.length;
b2MapDefOuter.vertices = outerVertexes;
console.log(outerVertexes)

function line(x1, y1, x2, y2) {
    var w = 5,
        pd = new b2PolyDef();
    if ( x1 > x2 ) {
        x1 += x2;
        x2 = x1 - x2;
        x1 = x1 - x2;

        y1 += y2;
        y2 = y1 - y2;
        y1 = y1 - y2;
    }

    pd.vertices = [
        [x1,y1],
        [x2,y2],
        [x2, y2 + w],
        [x1, y1 + w]
    ]

    pd.vertices = pd.vertices.map(function(p){ return new b2Vec2(p[0], p[1]); });
    pd.vertexCount = pd.vertices.length;
    pd.restitution = .3;
    pd.friction = .5;
    return pd;
}

function buildOuterShape(points) {
    var shp = new b2BodyDef(),
        p = points.slice(0),
        first = p.shift(),
        prev = first,
        cur;
    if (!points.length) return shp;
    while(cur = p.shift()) {
        shp.AddShape(line(prev.x, prev.y, cur.x, cur.y));
        prev = cur;
    }
    shp.AddShape(line(first.x, first.y, prev.x, prev.y));
    //shp.AddShape(line( prev.x, prev.y, first.x, first.y));
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

demos.cars.initWorld = function(world) {
    createTrack(world);
    //createBall(world, 500, 300);
}
demos.InitWorlds.push(demos.cars.initWorld);