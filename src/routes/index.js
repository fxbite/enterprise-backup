const siteRouter = require('./site')
const version1Router = require('./version1')

function route(app) {

    app.use('/v1', version1Router)

    app.use('/', siteRouter)

}


module.exports = route