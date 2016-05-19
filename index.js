var ronin = require('ronin');

var program = ronin({
  path: __dirname,
  desc: 'portalTS cli utility'
});

var header = require('./libs/header');
header();

program.run();
