'use strict';

module.exports = [
  {method: 'get',    path: '/{param*}',                     config: require('../definitions/general/static')},
  {method: 'post',   path: '/register',                     config: require('../definitions/users/register')},
  {method: 'post',   path: '/login',                        config: require('../definitions/users/login')},
  {method: 'delete', path: '/logout',                       config: require('../definitions/users/delete_logout')},
  {method: 'get',    path: '/status',                       config: require('../definitions/users/get_status')}
];
