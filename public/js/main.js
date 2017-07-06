$(function () {
    function validate(id) {
        var regex = /^[a-zA-Z ]{2,30}$/;
        if (id == "email") {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        } else if (id == "phone") {
            var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        }
        var ctrl = document.getElementById(id);
        if (regex.test(ctrl.value)) {
            $('#' + id).removeClass('wrong');
            return true;
        } else {
            $('#' + id).addClass('wrong');
            return false;
        }
    }
    $('#email').tooltip({
        'trigger': 'manual',
        'title': 'The e-mail already exists.'
    });
    $('button').click(function () {
        var name = $('#name').val();
        var last_name = $('#last_name').val();
        var mail = $('#email').val();
        var state = $('#state').val();
        var phone = $('#phone').val();
        var nameBool = validate("name");
        var last_nameBool = validate("last_name");
        var mailBool = validate("email");
        var stateBool = validate("state");
        var phoneBool = validate("phone");
        if (!$('input[type="checkbox"]').is(':checked')) {
            $('label').addClass('wrong');
            return;
        } else {
            $('label').removeClass('wrong');
        }
        if (nameBool && last_nameBool && mailBool && stateBool && phoneBool) {
            var data = {
                name: name,
                last_name: last_name,
                mail: mail,
                state: state,
                phone: phone,
            }
            $.ajax({
                type: 'POST',
                url: '/register',
                data: data,
                success: function (res) {
                    if (res == '1062') {
                        $('#email').tooltip('show');
                        $('#email').addClass('wrong');
                    } else {
                        $('#email').tooltip('hide');
                        $('#email').removeClass('wrong');
                        $(".form-container").toggleClass('done');
                    }
                }
            });
        }

    });
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
})
