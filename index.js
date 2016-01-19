
//Node requires
var fs = require('fs');

//Electron requires
var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('electron').ipcMain;
var dialog = require('dialog');

var editorWindow;

app.on('ready', function(){
  editorWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  editorWindow.on('close', function(){
    editorWindow = null;
  });

  editorWindow.loadURL('file://' + __dirname + '/main.html');
  editorWindow.show();

  ipc.on('openFile', function(evt){
    dialog.showOpenDialog({
      title: 'Open a file'
    }, function(filenames){

      if(!filenames){
        return;
      }

      filenames.forEach(function(filename){
        fs.readFile(filename, function(err, data){
          if(err){
            console.log(err.toString());
          } else {
            evt.sender.send('openedFile', {
              filename: filename,
              data: data.toString()
            });
          }
        });
      });


    });
  });

  ipc.on('saveFile', function(evt, fileData, index){
    dialog.showSaveDialog({
      title: 'Save File'
    }, function(filename){
      fs.writeFile(filename, fileData, function(err){
        if(err){
          console.log(err);
          return;
        }
        evt.sender.send('savedFile', filename, index);
      })
    });
  });

});
