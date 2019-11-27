const app = require('./app/server');
const port = process.env.NODE_PORT || 3090;

app.listen(port, function(e) {
    if (e) {
        Logger.error(e);
    }
    Logger.info('server listening to port ' + port);
});
