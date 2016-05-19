var Command = require('ronin').Command;
var check = require('../../libs/checkPosition');
var colors = require('colors');
var fs = require('fs');

var Create = Command.extend({
    desc: 'Create a new module',

    run: function(name) {
        if (!check()) return console.error("No portalTS detected.\nAre you sure to be in the root of a portalTS installation??".red);
        if (!name) return console.error("Error: please specify the name of the module.".red);

        if (/\s/g.test(name)) return console.error("Error: the module name can not contain white spaces.".red);

        var path = process.cwd() + '/pmodules/' + name;
        if (fs.existsSync(path)) return console.error("Error: a module with name " + name + " already exists.".red);

        //I need to create the folder
        fs.mkdirSync(path);

        // and the controllers subfolder
        fs.mkdirSync(path + '/controllers');
        // and the public subfolder
        fs.mkdirSync(path + '/public');
        // and the views subfolder
        fs.mkdirSync(path + '/views');
        //I can add a standard helloWorld controller
        fs.readFile(__dirname+'/../../examples/controller.txt', function(err, data) {
            var str = data.toString();
            fs.writeFileSync(path+'/controllers/index.ts', str);
        });

        var descr = {
            name: name,
            description: name + ' is a module generated using the portalts cli'
        };
        fs.writeFileSync(path + '/config.json', JSON.stringify(descr, null, 4));



        // last step: add module to modules.json!
        var modulesPath = process.cwd() + '/pmodules/modules.json';
        fs.readFile(modulesPath, function(err, data) {
            var modules = JSON.parse(data.toString());
            var index = -1;
            for (var i = 0; i<modules.modules.length; i++) {
                if (modules.modules[i]=='404') {
                    index = i;
                    break;
                }
            }
            if (index==-1) modules.modules.push(name);
            else modules.modules.splice(index, 0, name);
            fs.writeFileSync(modulesPath, JSON.stringify(modules, null, 4));
        });
    }
});

module.exports = Create;
