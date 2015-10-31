// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services' ,'ngOpenFB'])


.run(function($ionicPlatform, ngFB) {
    ngFB.init({appId: '965541513504740'});
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.employee', {
    url: '/employee-index',
    views: {
      'employee': {
        templateUrl: 'templates/employee-index.html',
        controller: 'EmployeeIndexCtrl'
      }
    }
  })
      .state('employee', {
                url: '/employees/:employeeId',
                templateUrl: 'templates/employee-detail.html',
                controller: 'EmployeeDetailCtrl'
            })


  .state('tab.appointments', {
      url: '/appointments',
      views: {
        'appointments': {
          templateUrl: 'templates/appointments.html',
          controller: 'ChatsCtrl'
        }
      }
    })
   .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })
  .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
  })
  
  .state('datepicker', {
      url: "/datepicker",
     
          templateUrl: "templates/datepicker.html",
          controller: 'DatepickerCtrl'
        
      }
    )
 .state('joincall', {
                url: '/joincall',
                templateUrl: 'templates/join-call.html',
                controller: 'DatepickerCtrl'
            })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
