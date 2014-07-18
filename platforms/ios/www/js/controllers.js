var serverUrl = 'http://morning-temple-3849.herokuapp.com';

angular.module('starter.controllers', [])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $rootScope, $http) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            $http.post(serverUrl + '/auth/signin', {
                username: $scope.loginData.username,
                password: $scope.loginData.password
//            $http.post(serverUrl + '/login', {
//                email: $scope.loginData.username,
//                password: $scope.loginData.password
            }).success(function (response) {
                alert('Good');
                $scope.loginError = 0;
                //$rootScope.user = response.user;
                    $rootScope.user = response;
                $rootScope.$emit('loggedin');
                $scope.closeLogin();
            }).error(function () {
                alert('Error');
                $scope.loginerror = 'Authentication failed.';
            });
        };
    })

    .controller('PlaylistsCtrl', function ($scope, $http) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];

        $scope.loadPlayList = function () {
            $http.get(serverUrl + '/articles').success(function (response) {
                $scope.playlists = response;
            }).error(function () {
                alert('Error Articles');
            });
        };
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });
