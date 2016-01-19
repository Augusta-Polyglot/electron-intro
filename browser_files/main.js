
var ipc = require('electron').ipcRenderer;

var app = angular.module('editor',['ui.bootstrap','ui.ace']);


app.controller('main',function($scope){

  $scope.tabs = [];

  $scope.openFile = function(){
    ipc.send('openFile');
  }

  $scope.newFile = function(){
    $scope.tabs.push({
      filename:"untitled",
      data: "",
      active: true
    });
  }

  $scope.saveFile = function(){
    $scope.tabs.forEach(function(tab, index){

      if(!tab.active){
        return;
      }

      ipc.send('saveFile', $scope.tabs[index].data, index);

    });
  }

  ipc.on('openedFile', function(evt, fileData){
    $scope.$apply(function(){
      $scope.tabs.push({
        filename: fileData.filename,
        data: fileData.data,
        active: true
      });
    });
  });

  ipc.on('savedFile', function(evt, filename, index){
    $scope.$apply(function(){
      var tab = $scope.tabs[index];
      tab.filename = filename;
    });
  });

});
