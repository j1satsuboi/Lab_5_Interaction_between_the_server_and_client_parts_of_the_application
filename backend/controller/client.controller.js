const db = require('../../database/db.js')

class ClientController {
    async createClient (req, res) {
        const {name, surname} = req.body
        const newClient = await db.query('INSERT INTO client (name, surname) VALUES ($1, $2) RETURNING *', [name, surname])
        res.json(newClient.rows[0])
    }
    async getClients (req, res) {
        const clients = await db.query('SELECT * FROM client')
        res.json(clients.rows)
    }
    async getOneClient (req, res) {
        const id = req.params.id
        const clients = await db.query('SELECT * FROM client where id = $1', [id])
        res.json(clients.rows)
    }
    async updateClient (req, res) {
        const {id, name, surname} = req.body
        const client = await db.query('UPDATE client SET name = $2, surname = $3 where id = $1 RETURNING *', [id, name, surname])
        res.json(client.rows[0])
    }
    async deleteClient (req, res) {
        const id = req.params.id
        const clients = await db.query('DELETE FROM client WHERE id = $1', [id])
        res.json(clients.rows[0])
    }
}

module.exports = new ClientController()