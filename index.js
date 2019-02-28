#!/usr/bin/env node

const verifier = require('email-verify')
const ProgressBar = require('progress')
const fs = require('fs')
const del = require('delete')
const path = require('path')
const input = process.argv[2]

const validEmailPath = 'valid-emails.txt'
const invalidEmailPath = 'invalid-emails.txt'

del.sync([validEmailPath, invalidEmailPath])

fs.readFile(input, function (err, data) {
  if (err) throw err
  const emails = data.toString().split('\n').filter(Boolean)

  const bar = new ProgressBar('  verifying [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: emails.length
  })

  emails.forEach(function (email) {
    verifier.verify(email, function (err, info) {
      bar.tick()
      const outputFilePath = path.join(process.cwd(), (err || !info.success ? invalidEmailPath : validEmailPath))
      fs.appendFile(outputFilePath, email + '\n', function (err) {
        if (err) throw err
      })
    })
  })
})
