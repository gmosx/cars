var Controller = function () {
    console.log('init controller');
    window.addEventListener('deviceorientation', this.onOrientation.bind(this));
    this.alpha = 0;
    this.beta = 0;
    this.gamma = 0;
    this.oldAngle = 0;
    this.startDir = NaN;
};

Controller.prototype.onOrientation = function (e) {
    function trunc(v) {
        return Math.round(v);
    }

    function getDir() {
        return e.alpha;
    }

    var iPhone = navigator.userAgent.match(/iPhone/i);
//    if (iPhone) {
//        e.gamma = e.gamma-45;
//        e.alpha += 90;
//    }

    if (isNaN(this.startDir)) this.startDir = getDir();
    var alpha = trunc(e.alpha), beta = trunc(e.beta), gamma = trunc(e.gamma);
    var delta = Math.abs(alpha - this.alpha) + Math.abs(beta - this.beta) + Math.abs(gamma - this.gamma);
    if (delta < 5) return;


    var accel = (45 - e.gamma ) / 45 * 100;
    if (iPhone) {
        accel = (e.gamma + 45 ) /45 * 100;
    }
    if (accel > 100) accel = 100;
    if (accel < -30) accel = -30;

    $(this).trigger('accelerate', accel);

    var dir = getDir()
    if (dir < this.startDir) dir += 360;
    dir = dir - this.startDir;
    if (dir > 180) dir -= 360;
    dir = -dir;
    dir = Math.min(50, Math.max(-50, dir));

    console.log(alpha, beta, gamma, dir);
    $(this).trigger('rotate', dir);
//    $('.value').text(['rr',e.gamma, accel].join(','));


    this.alpha = alpha;
    this.beta = beta;
    this.gamma = gamma;

};

