'use strict';

angular.module('wtcApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth) {
    $scope.errors = {};
    $scope.user_info_message = '';
    $scope.photo_info_message = '';
    $scope.user = Auth.getCurrentUser();

    if($scope.user.picture){
      $scope.url_pic = "/api/files/" + $scope.user.picture + "?_ts=" + new Date().getTime();
    }else{
      $scope.url_pic = "/assets/images/user.png"
    }

    // Update Password Function
    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    // Update Personals infos Function
    $scope.changePersonalInfos = function(form) {
      if(form.$valid){
        var $user_params = {
          fname: $scope.user.fname,
          name: $scope.user.name,
          phone: $scope.user.phone,
          birthday: $scope.user.birthday,
          address: $scope.user.address,
          zipcode: $scope.user.zipcode,
          city: $scope.user.city,
          country: $scope.user.country
        };

        $http.put('/api/users/'+Auth.getCurrentUser()._id, $user_params).success(function(user) {
            $scope.user_info_message = 'Infos successfully changed.';
            $scope.user = user;
        });
      }
    };

    // Update Personnal Avatar function
    $scope.changePersonalPhoto = function(files) {
      var fd = new FormData();
      fd.append("file", files[0]);
      $http.post('/api/files', fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
      })
      .success(function(files) {
        // Link picture saved to current User
        var $user_params = {
          picture: files.file._id
        };
        $http.put('/api/users/'+Auth.getCurrentUser()._id, $user_params).success(function(user) {
          // Update User Info
          $scope.user = user;
          $scope.url_pic = "/api/files/" + $scope.user.picture + "?_ts=" + new Date().getTime();
          $scope.photo_info_message = 'Photo changée avec succès !';
        });
      });
    };
  })
  .directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue;
            }
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   }
  });
