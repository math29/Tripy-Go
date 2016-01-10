'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('wtcApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {


    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of slides', function () {
    expect(scope.slides.length).toBe(4);
  });
});
