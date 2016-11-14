var app = angular.module("app",["ngRoute"]);

////////////////////////
// URL Configuration //
//////////////////////
app.constant('backend', 'http://localhost:8000');

//////////////////////////
// Route configuration //
////////////////////////
app.config(function($routeProvider) {
    $routeProvider
    .when("/redirect/:url", {
        templateUrl : "views/redirect.html",
        controller : "redirect"
    })
    .when("/", {
        templateUrl : "views/create.html",
        controller : "upload"
    })
    .when("/list", {
        templateUrl : "views/list.html",
        controller : "listCtrl"
    })

});
/////////////////////////////////////////
// Controller for uploading a new URL //
//////////////////////////////////////
app.controller("upload",['$scope','$http','backend', function ($scope,$http,backend){
  $scope.url = "";
  $scope.result = "";
  $scope.error = "";
  $scope.pre = false;
  $scope.Save = function(){
    data = {
      'originalUrl':$scope.url
    };
    $http.post(backend + "/api/urls/",data).then(succes,error);

    function succes(response){
      console.log(response.data);
      $scope.result = "http://localhost:8888/#/redirect/" + response.data.shortUrl;
    }
    function error(response){
      console.log(response.data);
      $scope.error = response.data;
      $scope.pre = true;
    }
  }
}]);

//////////////////////////////////////////
//Controller for access to a short URL //
////////////////////////////////////////
app.controller('redirect',["$routeParams",'$scope','$http','$window','backend',function($routeParams,$scope,$http,$window,backend){
  var short = $routeParams.url;
  $scope.error = "";
  $scope.pre = false;
  $scope.MyUrl = "asd";
  if(short){
    $http.get(backend +"/api/urls/?short="+short).then(succes,error)
    function succes(response){
      if(response.data[0] == undefined){
        $scope.error="Page Not found";
        $scope.pre = true;
      }
      else{
        $scope.MyUrl = response.data[0].originalUrl;
        $window.location.href = response.data[0].originalUrl;
      }
      console.log(response.data[0].shortUrl);
    }
    function error(response){
      console.log(response.data);
      $scope.error = response.data;
      $scope.pre = true;

    }
  }
}]);

//////////////////////////////////////////
// Controller for listing All the urls //
////////////////////////////////////////
app.controller("listCtrl",['$scope','$http','backend', function ($scope,$http,backend){
  $scope.urls = {};
  $http.get(backend + "/api/urls/").then(success);
  function success(response){
    $scope.urls = response.data;
  }
}]);
