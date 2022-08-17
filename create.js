const filename = process.argv.slice(2)[0];
const path = require('path');
const fs = require('fs');

const UIFlolder = path.join(__dirname, '/components/UI/');
const JSFlolder = path.join(__dirname, '/components/JS/');

fs.writeFile(UIFlolder+filename+'.module.scss','',function(){console.log('write a SCSS file')});
fs.writeFile(JSFlolder+filename+'.js',`import css from "../UI/${filename}.module.scss"`,function(){console.log('write a JSfile')});