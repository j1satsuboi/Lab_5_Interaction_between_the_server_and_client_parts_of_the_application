const db = require('../../database/db.js')

class RequestController {
    async createRequest (req, res) {
        const {title, description, client_id} = req.body
        const newRequest = await db.query('INSERT INTO request (title, description, client_id) VALUES ($1, $2, $3) RETURNING *', [title, description, client_id])
        res.json(newRequest.rows[0])
    }
    async getRequests (req, res) {
        const requests = await db.query('SELECT * FROM request')
        res.json(requests.rows)
    }
    async getOneRequest (req, res) {
        const id = req.params.id
        const requests = await db.query('SELECT * FROM request where client_id = $1', [id])
        res.json(requests.rows)
    }
    async updateRequest (req, res) {
        const {id, title, description, client_id} = req.body
        const requests = await db.query('UPDATE request SET title = $2, description = $3, client_id = $4 WHERE id = $1', [id, title, description, client_id])
        res.json(requests.rows[0])
    }
    async deleteRequest (req, res) {
        const id = req.params.id
        const requests = await db.query('DELETE FROM request WHERE id = $1', [id])
        res.json(requests.rows[0])
    }
}

module.exports = new RequestController()