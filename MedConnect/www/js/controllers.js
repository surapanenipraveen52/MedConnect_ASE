
angular.module('starter.controllers', ['starter.services', 'ngOpenFB', 'pickadate'])

.controller('DashCtrl', function($scope) {})



.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state ,ngFB) {
       $scope.data = {};
 
    $scope.login = function(username) {
         LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab');
        }).error(function(data) {
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
    $scope.signup =function()
    {
        $state.go('register');
    }
     $scope.fbLogin = function () {
    ngFB.login({scope: 'email, public_profile,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                //$scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
};
}
)
  
.controller('RegisterCtrl', function($scope, RegisterService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.register = function(email){
      
            RegisterService.RegisterUser($scope.data.firstname, $scope.data.lastname, $scope.data.address, $scope.data.age, $scope.data.email, $scope.data.username, $scope.data.password ).success(function(data) {
           alert(data.lastname);
                $state.go('login');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
.controller('DatepickerCtrl', function($scope,$ionicModal) {
    
    $ionicModal.fromTemplateUrl('templates/datemodal.html', 
        function(modal) {
            $scope.datemodal = modal;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope, 
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
    $scope.opendateModal = function() {
      $scope.datemodal.show();
    };
    $scope.closedateModal = function(modal) {
      $scope.datemodal.hide();
      $scope.datepicker = modal;
    };
})

  .controller('EmployeeIndexCtrl', function ($scope, EmployeeService,$ionicModal) {

        $scope.searchKey = "";
      
        $scope.clearSearch = function () {
            $scope.searchKey = "";
            findAllEmployees();
        }

        $scope.search = function (searchkey) {
            EmployeeService.findByName(searchkey).then(function (employees) {
                $scope.employees = employees;
                if(employees.length < 0){
                return false;}else return true;                
            });
        }
         $scope.searchname = function (searchkey) {
            
                if(searchkey.length < 0){
                return false;}else return true;                
            
        }
          $scope.invalichars = function (searchkey) {
            if( searchkey.match(/[\<\>!@#\$%^&\*,]+/i) ) {
                return true;
            }             else{
                return false;
            }  
            
        }
           $scope.thirdtest = function (searchkey) {
            
                if(searchkey.length > 2){
                return false;}else return true;                
            
        }
        
        
        
        var findAllEmployees = function() {
            EmployeeService.findAll().then(function (employees) {
                $scope.employees = employees;
            });
        }

        findAllEmployees();

    })
  .controller('EmployeeDetailCtrl', function ($scope, $stateParams, $state, EmployeeService,AppointmentService,$ionicModal) {
        
    
        EmployeeService.findById($stateParams.employeeId).then(function(employee) {
            $scope.employee = employee;
            console.log(employee);
            localStorage.setItem("doctormongoid",employee._id.$oid );
            localStorage.setItem("doctorid",employee.id);
            localStorage.setItem("doctorname",employee.firstname);
        });
    $ionicModal.fromTemplateUrl('templates/datemodal.html', 
        function(modal) {
            $scope.datemodal = modal;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope, 
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
     $scope.date = function () {
            
                $state.go('datepicker');         
            
        }
      $scope.opendateModal = function() {
      $scope.datemodal.show();
    }
     $scope.closedateModal = function(modal) {
        $scope.selecteddate = modal;
      $scope.datemodal.hide();
    }
      
      $scope.confirm = function(date,hour,minute,AM) {       
          var h= hour;
          var m= minute;
          var a= AM;
          AppointmentService.createNew(localStorage.patientid,localStorage.doctormongoid, localStorage.doctorid,$scope.selecteddate,
                                      h,m,a,localStorage.doctorname);
          $state.go('tab.appointments');
          
      }
    })

.controller('ChatsCtrl', function($scope,AppointmentService) {
     var findAllChats = function() {
            AppointmentService.findAll(localStorage.patientid).then(function (chats) {
                $scope.chats = chats;
                console.log(chats);
            });
        }

        findAllChats();
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
