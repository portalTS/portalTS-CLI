var Command = require('ronin').Command;

var download = require('../libs/download');
var AdmZip = require('adm-zip');
var fs = require('fs');
var ora = require('ora');
var colors = require('colors');

var Create = Command.extend({
    desc: 'Create a new installation of portalTS',

    run: function(path) {
        if (!path) {
            console.log("Please specify the path");
            return;
        }
        if (fs.existsSync(path)) return console.error("The specified path ".red + path + " already exists!".red);
        console.log('portalTS to ' + path);
        var spinner = ora('Downloading...').start();
        var p = 'tmp-' + new Date() + ".zip";
        download('https://codeload.github.com/portalTS/portalTS/zip/master', p, function(err) {
            if (err) return console.log("Error downloading".red);
            spinner.text = "Unzipping...";
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
            var zip = new AdmZip(p);
            var ris = zip.extractAllTo( /*target path*/ '.', /*overwrite*/ true);
            ris = fs.renameSync('portalTS-master', path);
            fs.unlinkSync(p);
            spinner.stop();
            console.log("Compleated!!!");
            console.log("New portalTS instance created in " + path);
        });
    }
});

module.exports = Create;
