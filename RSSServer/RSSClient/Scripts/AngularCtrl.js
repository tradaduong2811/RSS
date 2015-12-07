// create angular controller
var app = angular.module('app', []) // set and get angular module
app.controller('studentController', ['$scope', '$http', studentController]);

//angularjs controller method
function studentController($scope, $http) {
    $scope.loading = true;
    $scope.addMode = false;
    $scope.viewMode = false;


    // get all student
    $http.get("http://localhost:5579/api/values/1").success(function (data, status, headers, config) {
        $scope.students = data;
        $scope.loading = false;
    })
    .error(function () {
        $scope.error = "An Error has occured while loading posts!";
        $scope.loading = false;
    });

    //by pressing toggleEdit button ng-click in html, this method will be hit
    $scope.toggleEdit = function () {
        this.student.editMode = !this.student.editMode;
    };

    $scope.toggleView = function () {
        this.student.viewMode = !this.student.viewMode;
    }
    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;
    };

    // insert student
    $scope.add = function () {
        $scope.loading = true;
        $http.post('http://localhost:2371/api/StudentApi', this.newstudent)
            .success(function (data) {
                alert("Add Successfully!");
                $scope.addMode = false;
                $scope.students.push(data);
                $scope.loading = false;
            })
            .error(function (data) {
                $scope.error = "An Error has occured while Adding Student! " + data;
                $scope.loading = false;
            });
    };

    //Delete Student
    $scope.deletestudent = function () {
        $scope.loading = true;
        var Id = this.student.StudentId;
        $http.delete('http://localhost:2371/api/student/delete/?id=' + Id).success(function (data) {
            alert("Deleted Successfully!!");
            $.each($scope.students, function (i) {
                if ($scope.students[i].StudentId === Id) {
                    $scope.students.splice(i, 1);
                    return false;
                }
            });
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occured while Saving Student! " + data;
            $scope.loading = false;

        });
    };


    //Edit Student
    $scope.save = function () {
        alert("Edit");
        $scope.loading = true;
        var frien = this.student;
        alert(frien);
        $http.put('http://localhost:2371/api/StudentApi/' + frien.StudentId, frien).success(function (data) {
            alert("Saved Successfully!!");
            frien.editMode = false;
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occured while Saving Student! " + data;
            $scope.loading = false;
        });
    };
}