angular.module('wtcApp')

  angular.module('wtcApp')
    .directive('googleplace', function () {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, model) {
                var options = {
                    types: [],
                    componentRestrictions: {}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    scope.$apply(function() {
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode( { "address": element.val() }, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                                var location = results[0].geometry.location;
                                model.$setViewValue({
                                    name: element.val(),
                                    // loc : { lng : <longitude> , lat : <latitude> }
                                    loc : [
                                        Number(location.lat()),
                                        Number(location.lng())
                                    ]
                                });
                            }
                        });
                    });
                });
            }
        };
    });