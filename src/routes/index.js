const siteRouter = require('./site')
const ideaRouter = require('./idea')
const topicRouter = require('./topic')
const categoryRouter = require('./category')
const commentRouter = require('./comment')
const userRouter = require('./user')
const departmentRouter = require('./department')

function route(app) {

    app.use('/idea', ideaRouter)

    app.use('/topic', topicRouter)

    app.use('/category', categoryRouter)

    app.use('/comment', commentRouter)

    app.use('/user', userRouter)

    app.use('/department', departmentRouter)

    app.use('/', siteRouter)

}


module.exports = route