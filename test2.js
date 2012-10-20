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

module.exports = open;

function open(target, callback) {
  var opener;

  switch (process.platform) {
  case 'darwin':
    opener = 'open';
    break;
  case 'win32':
    // http://superuser.com/questions/36728/can-i-launch-urls-from-command-linewindows-directly
    // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/5bf91e62-7be9-4f1d-9bac-5b2a4dd8ced7/
    opener = 'start';
    break;
  default:
    // use Portlands xdg-open everywhere else
    opener = path.join(__dirname, '../vendor/xdg-open');
    break;
  }

  return exec(opener + ' "' + escape(target) + '"', callback);
}

function escape(s) {
  return s.replace(/"/, '\\\"');
}

open ('https://github.com/fshost', function(err) {
  if (err) throw err;
  console.log('done');
})