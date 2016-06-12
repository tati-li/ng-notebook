/* global angular */
import LoginCtrl from './LoginCtrl.js';

let loginModule = angular.module('ngNotebook:login', []);

loginModule.controller('LoginCtrl', LoginCtrl);

export default loginModule.name;