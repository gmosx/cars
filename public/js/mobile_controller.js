var Controller = function () {
window.addEventListener('deviceorientation', this.onOrientation.bind(this));
}

Controller.prototype.onOrientation = function (e) {
    console.log(e);
}

