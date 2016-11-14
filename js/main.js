var app1 = angular.module("app",["ngRoute"]);
app1.config(function($routeProvider) {
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
app1.controller("upload",['$scope','$http', function ($scope,$http){
  $scope.url = "";
  $scope.result = "";
  $scope.Save = function(){
    data = {
      'originalUrl':$scope.url
    };
    $http.post("http://localhost:8000/api/urls/",data).then(succes,error);

    function succes(response){
      console.log(response.data);
      $scope.result = "http://localhost:8888/#/redirect/" + response.data.shortUrl;
    }
    function error(response){
      console.log(response.data);

    }
  }
}]);
app1.controller('redirect',["$routeParams",'$scope','$http',function($routeParams,$scope,$http){
  var short = $routeParams.url;
  $scope.MyUrl = "asd";
  if(short){
    $http.get("http://localhost:8000/api/urls/?short="+short).then(succes,error)
    function succes(response){
      console.log(response.data[0]);
      $scope.MyUrl = response.data[0].originalUrl;
      console.log(response.data[0].shortUrl);
    }
    function error(response){
      console.log(response.data);

    }
  }
}]);
app1.controller("listCtrl",['$scope','$http', function ($scope,$http){
  $scope.urls = {};
  $http.get("http://localhost:8000/api/urls/").then(success);
  function success(response){
    $scope.urls = response.data;
  }
}]);
