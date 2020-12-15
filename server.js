const express = require('express')

const app = express()

const PORT = 5000


app.use((req, res, next) => {
    req.neo4j = require('./neo4j')
    next()
})


app.get('/text', (req, res) => {
    res.json('Удачно!')
})

app.get('/nodes', (req, res) => {
    req.neo4j.read('MATCH (n) RETURN n.id AS id, n.title AS title, n.size AS size, n.community AS community')
        .then(data => {
            let array = []
            let keys = data.records[0].keys
            data.records.forEach(record => {
                let newRecord = {}
                for(let i = 0; i < record._fields.length; i++) {
                    if (typeof(record._fields[i]) == 'object') {
                        newRecord[keys[i]] = record._fields[i].low
                    } else {
                        newRecord[keys[i]] = record._fields[i]
                    }
                }
                array.push(newRecord)
            })
            res.json(array)
            // console.log(array)
        })
        .catch(error => console.log(error))
})


app.listen(PORT, () => {
    console.clear()
    console.log('Listening on port: ' + PORT)
})