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
    $scope.yourDeck = [];

    $scope.addCard = function (index, name) {
      if($scope.yourDeck.length > 0) {
        for(var i = 0; i < $scope.yourDeck.length; i++) {
          if($scope.yourDeck[i].name == name) {
            console.log($scope.yourDeck[i].name)
            if($scope.yourDeck[i].count === 1) {
              console.log("1 exists") ;
              $scope.yourDeck[i].count = 2;
            } else {
                console.log("At 2")
            }

          } else {
                console.log("No matching cards.")
                $scope.yourDeck.push($scope.cardLibrary[index]);
                $scope.yourDeck[i].count = 1;
              }


            }
            // this madness is just here to catch an empty deck list
          } else {
            console.log("No cards.")
            $scope.yourDeck.push($scope.cardLibrary[index]);
            $scope.yourDeck[0]['count'] = 1;
          }

      
    };


    $scope.addNewCard = function (index, name, rarity) {
      if($scope.isDeckEmpty($scope.yourDeck) = true) {
        $scope.yourDeck.push($scope.cardLibrary[index]);
        $scope.yourDeck[0]['count'] = 1;
      } else {
          if($scope.isLegendary(rarity) = true) {
            $scope.addLegendary(index, name, rarity);
        } else {
          for(var i = 0; i < $scope.yourDeck.length; i++) {
            if($scope.yourDeck[i].name == name) {
              if($scope.yourDeck[i].count = 1) {
                $scope.yourDeck[i].count = 2;
              } else {
                console.log("there are already 2 cards")
              }
            } else {
                $scope.yourDeck.push($scope.cardLibrary[index]);
                $scope.yourDeck[0]['count'] = 1;              
            }          
          }
        }
      }
    }

    $scope.addLegendary = function (index, name, rarity) {
      for(var i = 0; i < $scope.yourDeck.length; i++) {
        if($scope.yourDeck[i].name == name) {
          console.log("Already there.")     
        } else {
          $scope.yourDeck.push($scope.cardLibrary[index]);
          $scope.yourDeck[0]['count'] = 1;
        } 
      }
    }

    $scope.isLegendary = function (rarity) {
      if(rarity == "Legendary"){
        return true
      } else {
        return false
      }
    }

    $scope.isDeckEmpty = function() {
      if($scope.yourDeck.length > 0) {
        return true
      } else {
        return false;
      }

    }


    $scope.setPlayerClass = function (playerClass) {
      $scope.query.playerClass = playerClass;
    }

    $scope.cardList = function () {
      console.log("Testing")
      $http.get('/data/AllSets.json')
      .then(function(data){
        var theData = data.data;
        var keys = Object.keys(theData);

        keys.map(function (key) {
          for(var i = 0; i < theData[key].length; i++) {
            if(theData[key][i].rarity === 'Legendary') {
              theData[key][i].maxNumber = 1;  
            } else {
              theData[key][i].maxNumber = 2;
            }
            
            $scope.cardLibrary.push(theData[key][i]);
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
