const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const upload      = require('multer')();
const Emb         = require('express-markdown-browser');
const emb         = new Emb({path: __dirname + "/apidoc"});

const promiseRouter = require('./lib/PromiseRouter.js');
const getRoutes     = require('./lib/routers');
const handler       = require('./lib/ws/handler.js');
const routes        = getRoutes();
const router        = promiseRouter(express.Router);

require('./lib/db.js').connect();

const app = express();
require('express-ws')(app);
app.use(bodyParser.urlencoded());

app.use(cors({ origin: '*' }));

app.use(bodyParser.json({limit: 1024 * 1024, verify: (req, res, buf) => {
    try {
        JSON.parse(buf);
    } catch (e) {
        res.send({
            status: 0,
            error: {
                code:    'BROKEN_JSON',
                message: 'Please, verify your json'
            }
        });
    }
}}));

// API VERSION
app.use('/api/v1', router);

// API DOC
router.get('/apidoc', emb);

router.postAsync('/users/:userId/sites', upload.any(), routes.sites.open.bind(routes.sites));
router.getAsync('/users/:userId/sites', upload.any(), routes.sites.list.bind(routes.sites));

// Socket
router.ws('/:userId', handler);

if (process.env.ENV === 'live') {
    const { appPort }   = require('./etc/config.json')[process.env.ENV];
    app.listen(appPort, function () {
        console.log(`listening on port ${appPort}`);
    });
}

module.exports = app;
