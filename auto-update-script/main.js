'use strict';

const { spawn } = require('child_process');
var path = require('path')
var spawnObj = null

module.exports = {
  load() {
    setTimeout(() => {
      Editor.log('尝试自启动脚本自动更新')
      module.exports.messages.start()
    }, 2000)
  },

  unload() {
    module.exports.messages.stop()
  },

  messages: {
    start() {

      spawnObj = spawn('node', [path.join(__dirname, './script/index.js'), Editor.argv.path])
      spawnObj.stdout.on('data', function (chunk) {
        Editor.log(chunk.toString())
      })
      spawnObj.stderr.on('data', (data) => {
        Editor.log('error')
        Editor.log(data.toString())
      })

      Editor.log('自动更新已启动')
    },
    stop() {
      if (spawnObj != null) {
        spawnObj.disconnect()
        spawnObj = null
      }
      Editor.log('自动更新已停止')
    },
  },
};