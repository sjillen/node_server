module.exports = app => {
    app.get('/users/current_user', function(req, res) {
        return res.send({ hi: 'there' });
    });
};
