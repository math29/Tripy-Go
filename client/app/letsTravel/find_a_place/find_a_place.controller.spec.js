'use strict';

describe('Controller: FindAPlaceCtrl', function () {

  // load the controller's module
  beforeEach(module('wtcApp'));
  // beforeEach(module('socketMock'));

  var FindAPlaceCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FindAPlaceCtrl = $controller('FindAPlaceCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
