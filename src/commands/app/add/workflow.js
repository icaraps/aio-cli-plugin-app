/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const express = require('express')
const ejs = require('ejs')
const request = require('request')
const fs = require('fs')
const open = require('open')

const BaseCommand = require('../../../BaseCommand')
const yeoman = require('yeoman-environment')
const aioLogger = require('@adobe/aio-lib-core-logging')('@adobe/aio-cli-plugin-app:add:workflow', { provider: 'debug' })
const generators = require('@adobe/generator-aio-app')

class AddWorkflowCommand extends BaseCommand {
  async run () {
    const { args, flags } = this.parse(AddWorkflowCommand)
    aioLogger.debug(`adding component ${args.component} to the project, using flags: ${flags}`)
    this.startUIServer()
    open('http://localhost:3000')
  }

  startUIServer() {
    const app = express()
    const router = express.Router()
    const path =  __dirname + '/views/'

    // app.set("view engine", "ejs")

    // UI root
    router.get('/',function(req, res){
      res.sendFile(path + 'index.html')
      // we need to use ejs for dynamic content
      // res.render('index')
    })

    router.post('/preview',function(req, res){
      setTimeout(() => {res.sendFile(path + 'preview.html')}, 3000)

    })

    router.post('/create',function(req, res){
      updateManifest()
      setTimeout(() => {res.sendFile(path + 'create.html')}, 4000)
      // res.sendFile(path + 'create.html')
    })

    app.use('/',router)
    app.use(express.urlencoded({
      extended: true
    }))

    //start listening to requests
    app.listen(3000, function () {
      aioLogger.info('Orchestration Server started.. listening on port 3000!');
    })
  }
}

function updateManifest() {
  var manifestPath = __dirname + '/template/composer.yml'
  var content = fs.readFileSync(manifestPath,{encoding:'utf8', flag:'r'})

  fs.writeFileSync('/Users/sandeepp/work/cna/poc/orchestration/demo_app/app.config.yaml', content)

  manifestPath = __dirname + '/template/compositiondemo.js'
  content = fs.readFileSync(manifestPath,{encoding:'utf8', flag:'r'})

  fs.writeFileSync('/Users/sandeepp/work/cna/poc/orchestration/demo_app/compositions/compositiondemo.json', content)
}

AddWorkflowCommand.description = `Add workflow (sequence/composition)
`

AddWorkflowCommand.flags = {
  ...BaseCommand.flags
}

AddWorkflowCommand.args = []

module.exports = AddWorkflowCommand
