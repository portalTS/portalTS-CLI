var fs = require('fs');

function check() {
    var path = process.cwd();
    var paths = [
        path+'/package.json',
        path+'/pmodules',
        path+'/core'
    ];
    for (var i = 0; i<paths.length; i++) {
        if (!fs.existsSync(paths[i])) {
            return false;
        }
    }
    return true;
}


module.exports = check;
