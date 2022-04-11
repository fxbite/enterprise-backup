
class RenderControllers {

    // [GET] /dashboard
    async indexDashboard(req, res, next) {
        try {
            res.status(200).render('dashboard/index', {layout: 'layouts/index'})
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /user-management
    async crudUser(req, res, next) {
        try {
            
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /user-register
    async registerUser(req, res, next) {
        try {
            
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }
    
    // [GET] /category-management
    async crudCategory(req, res, next) {
        try {
            
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /category-register
    async registerCategory(req, res, next) {
        try {
            
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /department-management
    async crudDepartment(req, res, next) {
        try {
            
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /department-register
    async registerDepartment(req, res, next) {
        try {
            
        } catch (error) {
            res.status(500).render('status/500', {layout: false}) 
        }
    }

    // [GET] /export
    async exportData(req, res, next) {
        try {
            
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

    // [GET] /forum
    async showForum(req, res, next) {
        try {
            
        } catch (error) {
            res.status(500).render('status/500', {layout: false})
        }
    }

}

module.exports = new RenderControllers