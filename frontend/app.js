// Create AngularJS application
var app = angular.module("rescueApp", []);
app.service("VolunteerService", function($http) {

    this.getVolunteers = function() {

        return $http.get(
            "http://localhost:5000/volunteers"
        );

    };
    this.addVolunteer = function(volunteer) {

        return $http.post(
            "http://localhost:5000/volunteers",
            volunteer
        );

    };

});


// ==========================
// DIRECTIVE
// ==========================

app.directive("rescueTitle", function() {

    return {

        restrict: "E",

        template: "<h1>cRescueConnect</h1>"

    };

});


// ==========================
// CONTROLLER
// ==========================

app.controller("MainController",function($scope, VolunteerService) {
        // Initial page

        $scope.page = "login";


        // Login

        $scope.login = function() {

            if (
                $scope.username == "admin" &&
                $scope.password == "1234"
            ) {

                $scope.page = "volunteers";

                $scope.error = false;
                // Get volunteers
                VolunteerService.getVolunteers()

                    .then(function(response) {

                        $scope.volunteers =
                            response.data;

                    })

                    .catch(function() {

                        $scope.volunteers = [];

                    });

            }

            else {

                $scope.error = true;

            }

        };


        // Logout

        $scope.logout = function() {

            $scope.page = "login";

            $scope.username = "";

            $scope.password = "";

        };


        // Volunteer data

        $scope.volunteers = [];


        $scope.newVolunteer = {

            name: "",
            city: "",
            experience: ""

        };


        $scope.message = "";


        // Add volunteer

        $scope.addVolunteer = function() {

            if (
                !$scope.newVolunteer.name ||
                !$scope.newVolunteer.city ||
                !$scope.newVolunteer.experience
            ) {

                alert("Fill all fields");

                return;

            }


            VolunteerService
                .addVolunteer($scope.newVolunteer)

                .then(function(response) {

                    $scope.volunteers.push(
                        response.data
                    );

                    $scope.message =
                        "Volunteer added successfully";


                    $scope.newVolunteer = {

                        name: "",
                        city: "",
                        experience: ""

                    };

                })

                .catch(function() {

                    alert("Backend is not running");

                });

        };

    }
);
