    angular.module('starter.services', [])

    .factory('Socket', function () {
        var myIoSocket = io.connect('http://mcchatt.mybluemix.net:80');
        myIoSocket.on('connect', function () {
            myIoSocket.emit('adduser', "sarath");
        });
        return myIoSocket;
    })
.factory('UserDetails', function () {
        var user = {};
         return {
            getUser: function () {
                return user;
            },
            setUser: function (usr) {
                user = usr;
            }
        };
        return user;
    })
    .factory('Chat', function ($ionicScrollDelegate, Socket) {

        var username;
        var users = {};
        var messages = [];
        var TYPING_MSG = '..';

        var Notification = function (username, message) {
            var notification = {};
            notification.username = username;
            notification.message = message;
            notification.notification = true;
            return notification;
        };

        Socket.on('updateusers', function (data) {
        });

        Socket.on('updatechat', function (sender,newMessage) {
            var msg={};
            msg.message=newMessage;
            msg.username=sender;
            addMessage(msg);
        });

        var scrollBottom = function () {
            $ionicScrollDelegate.resize();
            $ionicScrollDelegate.scrollBottom(true);
        };

        var addMessage = function (msg) {
            msg.notification = msg.notification || true;
            var el = document.getElementById('messagesec');
            var messageScope = angular.element(el).scope();
            messageScope.$apply(function(){
            messages.push(msg);
            });
            console.log(messageScope);
            scrollBottom();
        };

        return {
            getUsername: function () {
                return username;
            },
            setUsername: function (usr) {
                username = usr;
            },
            getMessages: function () {
                return messages;
            },
            sendMessage: function (msg) {
                Socket.emit('sendchat', msg);
                scrollBottom();
                Socket.emit('new message', msg);
            },
            scrollBottom: function () {
                scrollBottom();
            }
        };
    })




    .service('LoginService', function ($q, $http,UserDetails) {
            return {
                loginUser: function (name, pw) {
                    var deferred = $q.defer();
                    var promise = deferred.promise;

                    $http({
                        method: 'GET',
                        url: 'https://api.mongolab.com/api/1/databases/medcon/collections/Users?q={username:\'' + name + '\'}&apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
                        contentType: "application/json"

                    }).success(function (data) {
                        UserDetails.setUser(data[0]);
                        if (name == data[0].username && pw == data[0].password) {
                            localStorage.setItem("patientid", data[0]._id.$oid);
                            localStorage.setItem("patientname", data[0].firstname);
                            deferred.resolve('Welcome ' + data[0].username + '!');
                        } else {
                            deferred.reject('Wrong credentials.');
                        }

                    })
                    promise.success = function (fn) {
                        promise.then(fn);
                        return promise;
                    }
                    promise.error = function (fn) {
                        promise.then(null, fn);
                        return promise;
                    }
                    return promise;


                }
            }
        })
        .service('doctorLoginService', function ($q, $http) {
            return {
                loginUser: function (name, pw) {
                    var deferred = $q.defer();
                    var promise = deferred.promise;

                    $http({
                        method: 'GET',
                        url: 'https://api.mongolab.com/api/1/databases/medcon/collections/Doctors?q={username:\'' + name + '\'}&apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
                        contentType: "application/json"

                    }).success(function (data) {
                        if (name == data[0].username && pw == data[0].password) {
                            localStorage.setItem("docmongoid", data[0]._id.$oid);

                            localStorage.setItem("docname", data[0].firstname);
                            deferred.resolve('Welcome ' + data[0].username + '!');
                        } else {
                            deferred.reject('Wrong credentials.');
                        }

                    })
                    promise.success = function (fn) {
                        promise.then(fn);
                        return promise;
                    }
                    promise.error = function (fn) {
                        promise.then(null, fn);
                        return promise;
                    }
                    return promise;


                }
            }
        })


    .service('RegisterService', function ($q, $http) {
            return {
                RegisterUser: function (fname, lname, address, age, email, username, password) {
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
                        contentType: "application/json"

                    }).success(function (data) {

                        deferred.resolve('Welcome!');
                        /* if ( data[0].username != null && data[0].password != null && data[0].lastname != null && data[0].firstname != null &&data[0].email != null ) {
                            deferred.resolve('Welcome ' + data[0].username + '!');
                        } else {
                            deferred.reject('please fill all the fields');
                        }
                          */

                    })
                    promise.success = function (fn) {
                        promise.then(fn);
                        return promise;
                    }
                    promise.error = function (fn) {
                        promise.then(null, fn);
                        return promise;
                    }
                    return promise;

                }
            }
        })
        .service('doctorRegisterService', function ($q, $http) {
            return {
                RegisterUser: function (fname, lname, specialization, qualification, hname, haddress, city, phone, username, password) {
                    var deferred = $q.defer();
                    var promise = deferred.promise;
                    $http({
                        method: 'POST',
                        url: 'https://api.mongolab.com/api/1/databases/medcon/collections/Doctors?apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
                        data: JSON.stringify({
                            firstname: fname,
                            lastname: lname,
                            specialization: specialization,
                            qualification: qualification,
                            hname: hname,
                            haddress: haddress,
                            city: city,
                            phone: phone,
                            username: username,
                            password: password,
                        }),
                        contentType: "application/json"

                    }).success(function (data) {

                        deferred.resolve('Welcome!');
                        /* if ( data[0].username != null && data[0].password != null && data[0].lastname != null && data[0].firstname != null &&data[0].email != null ) {
                            deferred.resolve('Welcome ' + data[0].username + '!');
                        } else {
                            deferred.reject('please fill all the fields');
                        }
                          */

                    })
                    promise.success = function (fn) {
                        promise.then(fn);
                        return promise;
                    }
                    promise.error = function (fn) {
                        promise.then(null, fn);
                        return promise;
                    }
                    return promise;

                }
            }
        })

    .service('AppointmentService', function ($q, $http) {
        var appointments = [];
        return {
            findAll: function (patientid) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'https://api.mongolab.com/api/1/databases/medcon/collections/appointments?&q=  {patientid:\'' + patientid + '\'}&apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
                    contentType: "application/json"

                }).success(function (data) {
                    appointments = data;
                    deferred.resolve(data);
                })
                return deferred.promise;
            },
            finddoc: function (doctorname) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'https://api.mongolab.com/api/1/databases/medcon/collections/appointments?&q=  {doctorname:\'' + doctorname + '\'}&apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
                    contentType: "application/json"

                }).success(function (data) {
                    appointments = data;
                    deferred.resolve(data);
                })
                return deferred.promise;
            },

            createNew: function (patientid, doctormongoid, doctorid, date, h, m, a, doctorname, patientname) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: 'https://api.mongolab.com/api/1/databases/medcon/collections/appointments?apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
                    data: JSON.stringify({
                        patientid: patientid,
                        doctormongoid: doctormongoid,
                        doctorid: doctorid,
                        date: date,
                        h: h,
                        m: m,
                        a: m,
                        doctorname: doctorname,
                        patientname: patientname

                    }),
                    contentType: "application/json"

                }).success(function (data) {
                    deferred.resolve(true);
                })
                return deferred.promise;
            }

        }
    })

    .service('DocProfileService', function ($q, $http) {
        var employees = [];
        return {
            getData: function (docname) {

                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'https://api.mongolab.com/api/1/databases/medcon/collections/Doctors?&q=  {firstname:\'' + docname + '\'}&apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
                    contentType: "application/json"

                }).success(function (data) {
                    employees = data;

                    deferred.resolve(data);
                })
                return deferred.promise;
            }

        }
    })

    .service('EmployeeService', function ($q, $http) {
        var employees = [];
        return {
            findAll: function () {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'https://api.mongolab.com/api/1/databases/medcon/collections/Doctors?&apiKey=BSHQMdPlD-USKTsizAPOBio_XS-05S-b',
                    contentType: "application/json"

                }).success(function (data) {
                    employees = data;
                    deferred.resolve(data);
                })
                return deferred.promise;
            },

            findById: function (employeeId) {
                var deferred = $q.defer();
                var employee = employees[employeeId - 1];
                deferred.resolve(employee);
                return deferred.promise;
            },

            findByName: function (searchKey) {
                var deferred = $q.defer();
                var results = employees.filter(function (element) {
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
