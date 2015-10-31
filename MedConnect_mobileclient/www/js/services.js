angular.module('starter.services', [])

    .service('LoginService', function($q, $http) {
    return {
  loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
             $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/medcon/collections/Users?q={username:\''+name+'\'}&apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
        contentType:"application/json"
        
    }).success(function(data){
      if (name == data[0].username && pw == data[0].password) {
          localStorage.setItem("patientid",data[0]._id.$oid );
                deferred.resolve('Welcome ' + data[0].username + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
                 
    })
    promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
                
            
        }
    }
})


.service('RegisterService', function($q, $http) {
    return {
        RegisterUser: function(fname, lname, address, age, email, username, password) {
            var deferred = $q.defer();
            var promise = deferred.promise;
          $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/medcon/collections/Users?apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
        data: JSON.stringify({
       firstname: fname,
        lastname: lname,
        address: address,
        age: age,
        email: email,
        username: username,
        password: password,
    }),
        contentType:"application/json"
        
    }).success(function(data){
            
              deferred.resolve('Welcome!');
            /* if ( data[0].username != null && data[0].password != null && data[0].lastname != null && data[0].firstname != null &&data[0].email != null ) {
                deferred.resolve('Welcome ' + data[0].username + '!');
            } else {
                deferred.reject('please fill all the fields');
            }
              */ 
    
    })
           promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
           
        }
    }
})

    .service('AppointmentService', function($q, $http) {
        var appointments =[];
        return {
         findAll: function(patientid) {
             var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'https://api.mongolab.com/api/1/databases/medcon/collections/appointments?&q=  {patientid:\''+patientid+'\'}&apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
                    contentType:"application/json"
        
                }).success(function(data){
                    appointments = data;
                    deferred.resolve(data);
                })   
                return deferred.promise;
        },
    
        createNew: function(patientid,doctormongoid, doctorid,date,h,m,a,doctorname) {
            var deferred = $q.defer();
              $http({
                method: 'POST',
                url: 'https://api.mongolab.com/api/1/databases/medcon/collections/appointments?apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
                data: JSON.stringify({
                    patientid: patientid,
                     doctormongoid:doctormongoid,
                    doctorid:doctorid,
                    date:date,
                    h:h,
                    m:m,
                    a:m,
                    doctorname:doctorname
                }),
                contentType:"application/json"
        
            }).success(function(data){
                    deferred.resolve(true);
                })
            return deferred.promise;
        }

    }
})

    .service('EmployeeService', function($q,$http) {
    var employees =[];
        return {
            findAll: function() {
               var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'https://api.mongolab.com/api/1/databases/medcon/collections/Doctors?&apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
                    contentType:"application/json"
        
                }).success(function(data){
                    employees = data;
                    deferred.resolve(data);
                })   
                return deferred.promise;
            },

            findById: function(employeeId) {
                var deferred = $q.defer();
                var employee = employees[employeeId - 1];
                deferred.resolve(employee);
                return deferred.promise;
            },

            findByName: function(searchKey) {
                var deferred = $q.defer();
                var results = employees.filter(function(element) {
                    var fullName = element.firstname + " " + element.lastname;
                    return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
                deferred.resolve(results);
                return deferred.promise;
            },

            findByManager: function (managerId) {
                var deferred = $q.defer(),
                    results = employees.filter(function (element) {
                        return parseInt(managerId) === element.managerId;
                    });
                deferred.resolve(results);
                return deferred.promise;
            }

        }

    });;
