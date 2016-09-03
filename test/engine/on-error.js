import test from 'ava'
import request from 'request-promise'
import Engine from '../../lib/engine'

const listen = app => {
  return new Promise((resolve, reject) => {
    app.run(function (err) {
      if (err) {
        return reject(err)
      }

      const { port } = this.address()
      resolve(`http://localhost:${port}`)
    })
  })
}

test.beforeEach(t => {
  t.context = new Engine()
})

test('should response and throws', async t => {
  const app = t.context

  app.use(() => {
    const err = new Error()
    err.code = 404
    err.message = 'Not found'
    throw err
  })

  app.on('error', err => {
    t.true(err !== null)
  })

  const url = await listen(app)
  t.throws(request(url), '404 - "Not found"')
})