//contains all client-side services for signup, signin, and dashboard

angular.module('suhp.services', [])

.factory('Auth', function($http){
  //factory to post username to database upon signup
  var signup = function(user){
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function(response){
      return response.data;
    })
    .catch(function(error){
      console.error('+++line17 services.js: Error in services.factory.signup');
    });
  };

  //factory to post email friend list to designated table within db
  var storeFriendEmailList = function(friendEmailList) {
    return $http({
      method: 'POST',
      url: '/email',
      data: friendEmailList
    })
    .then(function(response){
      return response.data;
    })
    .catch(function(error){
      console.error('+++line 32 services.js: Error in storeFriendEmailList');
    });
  };

  var userFound = false;

  var signin = function(userobj){
    console.log("+++line 38 services.js user object", userobj);
    return $http({
      method: 'GET',
      url: '/signin',
      params: userobj
    }).then(function(response){
      if(response.data.length > 0){
        if (response.data[0].username === userobj.username && response.data[0].password === userobj.password){
          return userFound = true;
        } else {
          return userFound;
        }
    }).catch(function(error){
      console.error('+++line 52 services.js: There was a problem in services/sign in function');
    });
  };

  return {
    signup : signup,
    postFriendEmailList : postFriendEmailList,
    signin: signin,
    userFound: userFound
  }

})




//factory function for user dashboard, will handle post requests for
.factory('Dashboard', function($http){
  var getUserGoals = function(){
    return $http({
      method: 'GET',
      url: '/goals'
    })
    .then(function(response){
      return response.data
    })
    .catch(function(error){
      console.error('+++line79 services.js: There was an error retrieving your data')
    })
  }

  var storeUserGoals = function(userGoal){
      return $http({
        method: 'POST',
        url: '/goals',
        data: userGoal
            // should data be {
            //   "username": username,
            //   "description": description,
            //   "deadline": deadline,
            //   "hasExpired": false,
            //   "hasCompleted": false
            // }
      });
  };

  return {
    getUserGoals : getUserGoals,
    storeUserGoals: storeUserGoals
  }

});
