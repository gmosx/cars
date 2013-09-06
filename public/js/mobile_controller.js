var Controller = function () {
    setInterval(function () {
        $(this).trigger('accelerate', Math.round(100 * Math.random()))
    }.bind(this), 1000)
}
