$(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            $.ajax({
                type: 'GET',
                url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyDgDTgeG85yEkYTyL8YF2Ly8VzWemIMQYw',
                success: function (res) {
                    console.log(res.results[0].address_components[6].short_name);
                }
            });
        });
    }
    var canvas;
    var context;
    var screenH;
    var screenW;
    var stars = [];
    var fps = 30;
    var numStars = 1000;
    screenH = $('.body-wrap').height() / 1.8;
    screenW = $('.body-wrap').innerWidth();
    canvas = $('#space');
    canvas.attr('height', screenH);
    canvas.attr('width', screenW);
    context = canvas[0].getContext('2d');
    for (var i = 0; i < numStars; i++) {
        var x = Math.round(Math.random() * screenW);
        var y = Math.round(Math.random() * screenH);
        var length = 1 + Math.random() * 2;
        var opacity = Math.random();
        var star = new Star(x, y, length, opacity);
        stars.push(star);
    }
    setInterval(animate, 1000 / fps);

    function animate() {
        context.clearRect(0, 0, screenW, screenH);
        $.each(stars, function () {
            this.draw(context);
        })
    }

    function Star(x, y, length, opacity) {
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.length = parseInt(length);
        this.opacity = opacity;
        this.factor = 1;
        this.increment = Math.random() * .03;
    }
    Star.prototype.draw = function () {
        context.rotate((Math.PI * 1 / 10));
        context.save();
        context.translate(this.x, this.y);
        if (this.opacity > 1) {
            this.factor = -1;
        } else if (this.opacity <= 0) {
            this.factor = 1;
            this.x = Math.round(Math.random() * screenW);
            this.y = Math.round(Math.random() * screenH);
        }
        this.opacity += this.increment * this.factor;
        context.beginPath()
        for (var i = 5; i--;) {
            context.lineTo(0, this.length);
            context.translate(0, this.length);
            context.rotate((Math.PI * 2 / 10));
            context.lineTo(0, -this.length);
            context.translate(0, -this.length);
            context.rotate(-(Math.PI * 6 / 10));
        }
        context.lineTo(0, this.length);
        context.closePath();
        context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
        context.shadowBlur = 5;
        context.shadowColor = '#ffff33';
        context.fill();

        context.restore();
    }
})
