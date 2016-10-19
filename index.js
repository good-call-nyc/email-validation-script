var verifier = require('email-verify')
var ProgressBar = require('progress')
var fs = require('fs')
var del = require('delete')
var path = require('path')
var input = process.argv[2]

var validEmailPath = 'valid-emails.txt'
var invalidEmailPath = 'invalid-emails.txt'

del.sync([validEmailPath, invalidEmailPath])

fs.readFile(input, function (err, data) {
  if (err) throw err
  var emails = data.toString().split('\n').filter(Boolean)

  var bar = new ProgressBar('  verifying [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: emails.length
  })

  emails.forEach(function (email) {
    verifier.verify(email, function (err, info) {
      if (err) throw err
      bar.tick()
      var outputFilePath = path.join(process.cwd(), (info.success ? validEmailPath : invalidEmailPath))
      fs.appendFile(outputFilePath, email + '\n', function (err) {
        if (err) throw err
      })
    })
  })
})
