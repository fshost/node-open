var exec = require('child_process').exec
  , path = require('path')
  ;




/**
 * open a file or uri using the default application for the file type.
 *
 * @return {ChildProcess} - the child process object.
 * @param {string} target - the file/uri to open.
 * @param {function(Error)} callback - called with null on success, or
 *      an error object that contains a property 'code' with the exit
 *      code of the process.
 */
module.exports = function open(target, callback) {
  var command,
    url = target.replace(/"/, '\\\"');
  switch (process.platform) {
  case 'darwin':
    command = 'open "' + url + '"';
    break;
  case 'win32':
    command = 'start ' + url;
    break;
  default:
    // use Portlands xdg-open everywhere else
    command = path.join(__dirname, '../vendor/xdg-open') + ' "' + url + '"';
  }
  console.log('command:',command)
  return exec(command, callback);
}

module.exports('https://www.github.com/fshost', function (err) {
  console.log(arguments);
    if (err) throw err;
    console.log('success');
});