const Router = require('express')
const router = new Router()
const clientController = require('../controller/client.controller')

router.post('/client', clientController.createClient)
router.get('/client', clientController.getClients)
router.get('/client/:id', clientController.getOneClient)
router.put('/client', clientController.updateClient)
router.delete('/client/:id', clientController.deleteClient)

module.exports = router