const db = require('../../database/db.js')

class ServiceController {
    async createService (req, res) {
        const {title, description, request_id} = req.body
        const newService = await db.query('INSERT INTO service (title, description, request_id) VALUES ($1, $2, $3) RETURNING *', [title, description, request_id])
        res.json(newService.rows[0])
    }
    async getServices (req, res) {
        const services = await db.query('SELECT * FROM service')
        res.json(services.rows)
    }
    async getOneService (req, res) {
        const id = req.params.id
        const services = await db.query('SELECT * FROM service where request_id = $1', [id])
        res.json(services.rows)
    }
    async updateService (req, res) {
        const {id, title, description, request_id} = req.body
        const services = await db.query('UPDATE service SET title = $2, description = $3, request_id = $4 WHERE id = $1', [id, title, description, request_id])
        res.json(services.rows[0])
    }
    async deleteService (req, res) {
        const id = req.params.id
        const services = await db.query('DELETE FROM service WHERE id = $1', [id])
        res.json(services.rows[0])
    }
}

module.exports = new ServiceController()