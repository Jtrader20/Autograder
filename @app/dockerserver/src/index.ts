import express from 'express'
import { runTests } from './expandableSandbox'

const app = express()
const PORT = 6000

app.get('/test', async (req, res) => {
    try {
        const result = await runTests()
        res.json({ success: true, result })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

app.listen(PORT, () => console.log('Server running on port 6000'))