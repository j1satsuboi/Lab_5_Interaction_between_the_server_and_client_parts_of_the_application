const Router = require('express')
const router = new Router()
const requestController = require('../controller/request.controller')

router.post('/request', requestController.createRequest)
router.get('/request', requestController.getRequests)
router.get('/request/:id', requestController.getOneRequest)
router.put('/request', requestController.updateRequest)
router.delete('/request/:id', requestController.deleteRequest)

module.exports = router