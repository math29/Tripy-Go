'use strict';

angular.module('WTCBack')
  .factory('Country', function ($resource) {
    return $resource('/api/countries/:id/:controller', {
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
