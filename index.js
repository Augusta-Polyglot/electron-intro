var app = require('app');
var BrowserWindow = require('browser-window');

var editorWindow;

app.on('ready', function(){
  editorWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  editorWindow.on('close', function(){
    editorWindow = null;
  });

  editorWindow.loadURL('file://' + __dirname + '/browser_files/main.html');
  editorWindow.show();

});
