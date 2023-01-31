exports.index = (req, res) => {
    res.render('index')
}

exports.trataPost = (res, req) => {
    res.send(req.body)
    return
}