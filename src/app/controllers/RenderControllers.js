const {User, Role, Department, Submission, Category, Idea} = require('../models')
class RenderControllers {

    // [GET] /user-management?page={}&limit={}
    async crudUser(req, res, next) {
        try {
            const limitAsNumber = parseInt(req.query.limit)
            const pageAsNumber = parseInt(req.query.page)

            let page = 1
            if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
                page = pageAsNumber;
            }

            let limit = 10
            if (!Number.isNaN(limitAsNumber) && !(limitAsNumber > 10) && !(limitAsNumber < 1)) {
                limit = limitAsNumber;
            }

            const users = await User.find().populate('role').populate('department').skip((limit * page) - limit).limit(limit)
            const count = users.length
            res.status(200).render('accounts/showList', {
                layout: 'layouts/dashboard', users, current: page, pages: Math.ceil(count / limit),
            })
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /user-register
    async registerUser(req, res, next) {
        try {
            const roles = await Role.find()
            const departments = await Department.find()
            res.status(200).render('accounts/register', {layout: 'layouts/dashboard', roles, departments})
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /user-update/:id
    async updateUser(req, res, next) {
        try {
            const userId = req.params.id 
            const users = await User.findById(userId)
            const roles = await Role.find()
            const departments = await Department.find()
            res.status(200).render('accounts/update', {
                layout: 'layouts/dashboard', users, roles, departments
            })
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }
    
    // [GET] /category-management
    async crudCategory(req, res, next) {
        try {
            res.status(200).render('category/showList', {layout: 'layouts/dashboard'})
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /department-management
    async crudDepartment(req, res, next) {
        try {
            res.status(200).render('department/showList', {layout: 'layouts/dashboard'})
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    //TODO: REPORT
    // [GET] /report
    async exportData(req, res, next) {
        try {
            res.status(200).render('report/index', {layout: 'layouts/dashboard'})
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    //TODO
    // [GET] /all-submissions
    async showForum(req, res, next) {
        try {
            res.status(200).render('forum/showSubmission', {layout: 'layouts/forum'})
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    //TODO
    // [GET] /all-ideas
    async showAllIdeas(req, res, next) {
        try {
            res.status(200).render('forum/ideas', {layout: 'layouts/forum'})
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    //TODO
    // [GET] /idea/:id/detail
    async showDetailIdea(req, res, next) {
        try {
            res.status(200).render('forum/ideaDetail', {layout: 'layouts/forum'})
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /idea-register
    async registerIdea(req, res, next) {
        try {
            const categories = await Category.find()
            res.status(200).render('idea/register', {layout: 'layouts/forum', categories})
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    //TODO
    // [GET] /idea-update/:id
    async updateIdea(req, res, next) {
        try {
            const ideaId = req.params.id
            const ideas = await Idea.findById(ideaId)
            res.status(200).render('idea/update', {layout: 'layouts/forum', ideas})
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /submission-management?page{}&limit={}
    async crudSubmission(req, res, next) {
        try {
            const limitAsNumber = parseInt(req.query.limit)
            const pageAsNumber = parseInt(req.query.page)

            let page = 1
            if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
                page = pageAsNumber;
            }

            let limit = 10
            if (!Number.isNaN(limitAsNumber) && !(limitAsNumber > 10) && !(limitAsNumber < 1)) {
                limit = limitAsNumber;
            }

            const submissions = await Submission.find().populate('folder').skip((limit * page) - limit).limit(limit)
            const count = submissions.length
            res.status(200).render('submission/showList', {
                layout: 'layouts/dashboard', submissions, current: page, pages: Math.ceil(count / limit),
            })
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /submission-register
    async registerSubmission(req, res, next) {
        try {
            res.status(200).render('submission/register', {layout: 'layouts/dashboard'})
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /submission-update
    async updateSubmission(req, res, next) {
        try {
            const submissionId = req.params.id 
            const submissions = await Submission.findById(submissionId)
            res.status(200).render('submission/update', {
                layout: 'layouts/dashboard', submissions
            })
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

}

module.exports = new RenderControllers