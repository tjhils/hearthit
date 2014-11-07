'use strict';

/**
 * @ngdoc function
 * @name hearthitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hearthitApp
 */
angular.module('hearthitApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.cardLibrary = [];
    $scope.activeCards = [];
    $scope.query = {};
    $scope.yourDeck = {
      cards: [],
      addCard: function (card) {
        var cardCount = _.where(this.cards, {'name':card.name}).length;
        if (card.rarity === 'Legendary' && cardCount === 0) {
          this.cards.push(card);
        } else if (card.rarity !== 'Legendary' && cardCount < 2) {
          this.cards.push(card);
        }
      }
    };

    $scope.addCard = function (card) {
      $scope.yourDeck.addCard(card);
    };

    $scope.removeCard = function(card) {
      var cardIndex = $scope.yourDeck.cards.indexOf(card);
      console.log(cardIndex);
      $scope.yourDeck.cards.splice(cardIndex, 1);     
    };


    $scope.setPlayerClass = function (playerClass) {

      $scope.query.playerClass = playerClass;
    };

    $scope.clearQuery = function() {
      $scope.query = {};
    }

    $scope.cardList = function () {
      console.log("Testing")
      $http.get('/data/AllSets.json')
      .then(function(data){
        var theData = data.data;
        var keys = Object.keys(theData);

        keys.map(function (key) {
          for(var i = 0; i < theData[key].length; i++) {
            if(theData[key][i].collectible === true) {
              $scope.cardLibrary.push(theData[key][i]);
            }
          }
        });
        console.log($scope.cardLibrary);
      })
      
      };

    $scope.cardSearch = function () {
      $scope.activeCards = [];
      for(var i = 0; i < $scope.cardLibrary.length; i++) {
        if($scope.cardLibrary[i].name == $scope.query) {
          console.log($scope.cardLibrary[i]);
          $scope.activeCards.push($scope.cardLibrary[i]);
        };
      };

    };
    

    // $scope.cardSearch = function () {
    //   $http.get('http://hearthstone-api.com/en/api/?name=' + $scope.query)
    //   .success(
    //     function(data, status, headers, config) {
    //       $scope.searchList = data;
    //       console.log(status);
    //       console.log(data);
    //   })
    //   .error(
    //     function(data, status, headers, config) {
    //       console.log(status);
    //       console.log(data);
    //   });
    // }

    // $scope.cardList = [];

 //    $scope.searchList = [];

 //    $scope.cardSearch = function() {
 //      console.log('searching');
 //      $http.get('http://hearthstone-api.com/en/api?name=' + $scope.query).success(
 //        function(data, status, headers, config) {
 //      $scope.searchList = data;
 //      console.log(status);
 //        console.log(data);
 //  }).error(
 //        function(data, status, headers, config) {
 //          console.log(status);
 //          console.log(data);
 //    // called asynchronously if an error occurs
 //    // or server returns response with an error status.
 //  });

 //  }

  }]);
