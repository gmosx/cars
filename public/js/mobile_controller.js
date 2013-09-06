var Controller = function () {
    console.log('init controller') ;
window.addEventListener('deviceorientation', this.onOrientation.bind(this));
    this.alpha = NaN;
    this.beta = NaN;
    this.gamma = NaN;
}

Controller.prototype.onOrientation = function (e) {

}

