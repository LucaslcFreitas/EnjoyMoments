import path from 'path'
import fs from 'fs'

var dir = path.join(__dirname, '../../images')

var mime = {
    jpg: 'image/jpeg',
    png: 'image/png',
}

export function handleGetImage(req, res) {
    var file = path.join(dir, req.path.replace(/\/$/, '/index.html'))

    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden')
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain'
    var s = fs.createReadStream(file)
    s.on('open', function () {
        res.set('Content-Type', type)
        s.pipe(res)
    })
    s.on('error', function () {
        res.set('Content-Type', 'text/plain')
        res.status(404).end('Not found')
    })
}
