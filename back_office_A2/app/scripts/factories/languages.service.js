'use strict';

angular.module('WTCBack')
  .factory('Language', function ($resource) {
    return $resource('/api/language/:id/:controller', {
      id: '@_id'
    },
    {
      create: {
        method: 'POST',
        params: {
        }
      },
      get: {
        method: 'GET',
        params: {
          id:''
        }
      }
	  });
  });
