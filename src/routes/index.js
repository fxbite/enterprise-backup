const siteRouter = require('./site')
const ideaRouter = require('./idea')
const submissionRouter = require('./submission')
const categoryRouter = require('./category')
const commentRouter = require('./comment')
const userRouter = require('./user')
const departmentRouter = require('./department')
const reactSubmitRouter = require('./react_submit')
const reactRouter = require('./react')
const fileRouter = require('./file')
const roleRouter = require('./role')
const viewRouter = require('./view')

function route(app) {

    app.use('/add-react', reactSubmitRouter)

    app.use('/reaction', reactRouter)

    app.use('/file', fileRouter)

    app.use('/role', roleRouter)

    app.use('/view', viewRouter)

    app.use('/idea', ideaRouter)

    app.use('/submission', submissionRouter)

    app.use('/category', categoryRouter)

    app.use('/comment', commentRouter)

    app.use('/user', userRouter)

    app.use('/department', departmentRouter)

    app.use('/', siteRouter)

}


module.exports = route