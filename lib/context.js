const Request = require('./request')
const Response = require('./response')

class Context {

  constructor (app, config, req, res) {
    req = new Request(req)
    res = new Response(res)

    Reflect.defineProperty(this, 'app', { value: app })
    Reflect.defineProperty(this, 'req', { value: req })
    Reflect.defineProperty(this, 'res', { value: res })
    Reflect.defineProperty(this, 'config', { value: config })

    Reflect.defineProperty(this.req, 'app', { value: app })
    Reflect.defineProperty(this.req, 'res', { value: res })
    Reflect.defineProperty(this.req, 'config', { value: config })

    Reflect.defineProperty(this.res, 'app', { value: app })
    Reflect.defineProperty(this.res, 'req', { value: req })
    Reflect.defineProperty(this.res, 'config', { value: config })

    // Cache ip
    req.ip = req._ip
  }

}

module.exports = Context