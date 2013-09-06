var Controller = function () {
    console.log('init controller');
    window.addEventListener('deviceorientation', this.onOrientation.bind(this));
    this.alpha = 0;
    this.beta = 0;
    this.gamma = 0;
}

Controller.prototype.onOrientation = function (e) {
    function trunc(v) {
        return Math.round(v);
    }

    var alpha = trunc(e.alpha), beta = trunc(e.beta), gamma = trunc(e.gamma);
    var delta = Math.abs(alpha - this.alpha) + Math.abs(beta - this.beta) + Math.abs(gamma - this.gamma);
    if (delta < 5) return;
    console.log(alpha, beta, gamma);
    this.alpha = alpha;
    this.beta = beta;
    this.gamma = gamma;

}

