'use strict';

/**
 * @ngdoc function
 * @name hearthitApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hearthitApp
 */
angular.module('hearthitApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
