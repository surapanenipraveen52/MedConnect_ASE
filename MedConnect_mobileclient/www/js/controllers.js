angular.module('starter.controllers', ['starter.services', 'ngOpenFB', 'pickadate'])

.controller('DashCtrl', function ($scope) {})



.controller('LoginCtrl', function ($scope, LoginService, $ionicPopup, $state, ngFB) {
        $scope.data = {};

        $scope.login = function (username) {
                LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
                    $state.go('tab');
                }).error(function (data) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: 'Please check your credentials!'
                    });
                });

            }
            /* $scope.fbLogin = function () {
    ngFB.login({scope: 'email, public_profile,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                //$scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
};*/
        $scope.signup = function () {
            $state.go('register');
        }
        $scope.fbLogin = function () {
            ngFB.login({
                scope: 'email, public_profile,publish_actions'
            }).then(
                function (response) {
                    if (response.status === 'connected') {
                        console.log('Facebook login succeeded');
                        //$scope.closeLogin();
                    } else {
                        alert('Facebook login failed');
                    }
                });
        };
    })
    .controller('doctorLoginCtrl', function ($scope, doctorLoginService, $ionicPopup, $state, ngFB) {
        $scope.data = {};
        $scope.login = function (username) {
                // alert("hi");
                doctorLoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
                    $state.go('doctortab.docappointments');
                }).error(function (data) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: 'Please check your credentials!'
                    });
                });

            }
            /* $scope.fbLogin = function () {
    ngFB.login({scope: 'email, public_profile,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                //$scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
};*/
        $scope.signup = function () {
            $state.go('register');
        }
        $scope.fbLogin = function () {
            ngFB.login({
                scope: 'email, public_profile,publish_actions'
            }).then(
                function (response) {
                    if (response.status === 'connected') {
                        console.log('Facebook login succeeded');
                        //$scope.closeLogin();
                    } else {
                        alert('Facebook login failed');
                    }
                });
        };
    })

.controller('RegisterCtrl', function ($scope, RegisterService, $ionicPopup, $state) {
        $scope.data = {};

        $scope.register = function (email) {

            RegisterService.RegisterUser($scope.data.firstname, $scope.data.lastname, $scope.data.address, $scope.data.age, $scope.data.email, $scope.data.username, $scope.data.password).success(function (data) {
                alert(data.lastname);
                $state.go('login');
            }).error(function (data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });
            });
        }
    })
    .controller('doctorRegisterCtrl', function ($scope, doctorRegisterService, $ionicPopup, $state) {
        $scope.data = {};

        $scope.register = function (specialization) {

            doctorRegisterService.RegisterUser($scope.data.firstname, $scope.data.lastname, $scope.data.specialization, $scope.data.qualification, $scope.data.hname, $scope.data.haddress, $scope.data.city, $scope.data.phone, $scope.data.username, $scope.data.password).success(function (data) {
                alert(data.lastname);
                $state.go('login');
            }).error(function (data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });
            });
        }
    })
    .controller('DatepickerCtrl', function ($scope, $ionicModal) {

        $ionicModal.fromTemplateUrl('templates/datemodal.html',
            function (modal) {
                $scope.datemodal = modal;
            }, {
                // Use our scope for the scope of the modal to keep it simple
                scope: $scope,
                // The animation we want to use for the modal entrance
                animation: 'slide-in-up'
            }
        );
        $scope.opendateModal = function () {
            $scope.datemodal.show();
        };
        $scope.closedateModal = function (modal) {
            $scope.datemodal.hide();
            $scope.datepicker = modal;
        };
    })

.controller('EmployeeIndexCtrl', function ($scope, EmployeeService, $ionicModal) {

        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            findAllEmployees();
        }

        $scope.search = function (searchKey) {
            alert(searchKey);
            EmployeeService.findByName(searchKey).then(function (employees) {
                $scope.employees = employees;
                if (employees.length < 0) {
                    return false;
                } else return true;
            });
        }
        $scope.searchname = function (searchkey) {

            if (searchkey.length < 0) {
                return false;
            } else return true;

        }
        $scope.invalichars = function (searchkey) {
            if (searchkey.match(/[\<\>!@#\$%^&\*,]+/i)) {
                return true;
            } else {
                return false;
            }

        }
        $scope.thirdtest = function (searchkey) {

            if (searchkey.length > 2) {
                return false;
            } else return true;

        }



        var findAllEmployees = function () {
            EmployeeService.findAll().then(function (employees) {
                $scope.employees = employees;
            });
        }

        findAllEmployees();

    })
    .controller('EmployeeDetailCtrl', function ($scope, $stateParams, $state, EmployeeService, AppointmentService, $ionicModal) {


        EmployeeService.findById($stateParams.employeeId).then(function (employee) {
            $scope.employee = employee;
            console.log(employee);
            localStorage.setItem("doctormongoid", employee._id.$oid);
            localStorage.setItem("doctorid", employee.id);
            localStorage.setItem("doctorname", employee.firstname);
            localStorage.setItem("doctoremail", employee.email);
        });
        $ionicModal.fromTemplateUrl('templates/datemodal.html',
            function (modal) {
                $scope.datemodal = modal;
            }, {
                // Use our scope for the scope of the modal to keep it simple
                scope: $scope,
                // The animation we want to use for the modal entrance
                animation: 'slide-in-up'
            }
        );
        $scope.date = function () {

            $state.go('datepicker');

        }
        $scope.opendateModal = function () {
            $scope.datemodal.show();
        }
        $scope.closedateModal = function (modal) {
            $scope.selecteddate = modal;
            $scope.datemodal.hide();
        }

        $scope.confirm = function (date, hour, minute, AM) {
            var h = hour;
            var m = minute;
            var a = AM;
            AppointmentService.createNew(localStorage.patientid, localStorage.doctormongoid, localStorage.doctorid, localStorage.doctoremail, $scope.selecteddate,
                h, m, a, localStorage.doctorname, localStorage.patientname).then(function (confirmed) {
                AppointmentService.sendEmail(localStorage.doctoremail);
                $state.go('tab.appointments');
            });

        }
    })

.controller('ChatsCtrl', function ($scope, AppointmentService) {
        var findAllChats = function () {
            AppointmentService.findAll(localStorage.patientid).then(function (chats) {
                $scope.chats = chats;
            });
        }

        findAllChats();
    })
    .controller('UpdateCtrl', function ($scope, UpdateService1, UpdateService2, UpdateService3, $ionicPopup, $state) {

        $scope.data = {};
        $scope.showstartCard1 = false;
        $scope.showstartCard2 = false;
        $scope.showstartCard3 = false;
        $scope.hideCard1 = function () {
            $scope.showstartCard1 = true;
            // $scope.showsecondCard = true;
        };
        $scope.hideCard2 = function () {
            $scope.showstartCard2 = true;
            // $scope.showsecondCard = true;
        };
        $scope.hideCard3 = function () {
            $scope.showstartCard3 = true;
            // $scope.showsecondCard = true;
        };

        $scope.change = function (oldusername, newusername) {
            if ($scope.data.oldusername == null) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please enter your oldusername!'
                })
            } else if ($scope.data.newusername == null) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please enter your new username!'
                })
            } else {


                UpdateService1.updateUser($scope.data.oldusername, $scope.data.newusername).success(function (data) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Updated!',
                        template: 'Your details are updated succesfully!'
                    });
                }).error(function (data) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Update failed!',
                        template: 'Please check your details!'
                    });
                });
            }
        }
        $scope.change1 = function (oldpassword, newpassword) {


            UpdateService2.updatePwd($scope.data.oldpassword, $scope.data.newpassword).success(function (data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Updated!',
                    template: 'Your details are updated succesfully!'
                });
            }).error(function (data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Update failed!',
                    template: 'Please check your details!'
                });
            });
        }
        $scope.change2 = function (oldemail, newemail) {


            UpdateService3.updateEmail($scope.data.oldemail, $scope.data.newemail).success(function (data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Updated!',
                    template: 'Your details are updated succesfully!'
                });
            }).error(function (data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Update failed!',
                    template: 'Please check your details!'
                });
            });
        }



    })
    .controller('DeleteCtrl', function ($scope, DeleteService, $ionicPopup, $state) {
        $scope.data = {};

        $scope.deleteaccount = function () {

            alert("Are you sure you want to delete your account? ");
            DeleteService.deleteUser(localStorage.id).success(function (data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Deleted!',
                    template: 'Your account is deleted succesfully!'
                });
            }).error(function (data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Delete failed!',
                    template: 'Please check your credentials!'
                });
            });

        }

    })

.controller('Chatting', function ($scope, Socket, Chat, UserDetails) {


    $scope.messages = Chat.getMessages();
    $scope.sendMessage = function (msg) {



        Chat.sendMessage(msg);
        $scope.getDatetime = new Date();
        $scope.data.message = "";
    };
    var updateMessages = function () {
        alert("updated");
    }

    var user = UserDetails.getUser().username;



    $scope.messageIsMine = function (username) {



        if ((user === username) || (username === "SERVER")) {

            return true;
        } else {
            return false;
        }

    };
    $scope.serverMsg = function (username) {
        if (username === "SERVER") {

            return true;
        } else {
            return false;
        }

    };


    $scope.getBubbleClass = function (username) {
        var classname = 'from-them';

        if ($scope.messageIsMine(username)) {

            classname = 'from-me';

        }

        return classname;
    };
})

.controller('DocProfileCtrl', function ($scope, $stateParams, $state, DocProfileService, AppointmentService, $ionicModal) {

    var docname = localStorage.docname;


    DocProfileService.getData(docname).then(function (employee) {

        $scope.employee = employee[0];
    });




})


.controller('AppointmentsCtrl', function ($scope, AppointmentService) {
    var findAllChats = function () {
        AppointmentService.finddoc(localStorage.docname).then(function (chats) {
            $scope.chats = chats;
        });
    }

    findAllChats();
})

.controller('AccountCtrl', function ($scope, $state) {
        $scope.go = function () {
            $state.go('home');
            $window.location.reload();
        }

    })
    .controller('DocAccountCtrl', function ($scope, $window, $state) {
        $scope.go = function () {


            $state.go('home');
            $window.location.reload();

        }

    })
    .controller('HomeCtrl', function ($scope, $window, $ionicPopup, $state) {
        $scope.goD = function () {

            $state.go('doctorLogin');
            $window.location.reload();

        }
        $scope.goP = function () {
            $state.go('login');
            $window.location.reload();

        }
    });