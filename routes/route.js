module.exports = function(router) {
    router.get('/', function(req, res, next) {
        res.sendFile('login.html', {root: './views/'});
    })
    //不支持跨域
    router.get('/user/noSupport', function(req, res, next) {
        //res.header('Access-Control-Allow-Origin', '*');
        res.send({code: 'A00003', message: '不支持'});
    });
    //支持不携带身份凭证的跨域（任何域）
    router.get('/user/canSupport', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.send({code: 'A00003', message: '支持跨域'});
    });
    //支持携带身份凭证的跨域(不做域名限制)
    router.get('/user/canSupportCookies', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.send({code: 'A00003', message: '不支持跨域'});
    });
    //支持携带身份凭证的跨域（指定域名）cookie是跟域名相关的，设置 * 就没有意义了
    //对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为“*”。
    router.get('/user/canSupportCookiesSpecify', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://vip.iqiyi.com');
        res.header('Access-Control-Allow-Credentials', true);
        res.send({code: 'A00003', message: '支持跨域'});
    });
    //支持POST
    router.post('/user/post', function(req, res, next) {
        var userData = req.body;
        var username = userData.username;
        var password = userData.password;
        res.header('Access-Control-Allow-Origin', 'http://vip.iqiyi.com');
        //res.header('Access-Control-Allow-Credentials', true);
        res.send({code: 'A00001', message: username + password});
    })

    //复杂请求1
    router.delete('/user/delete', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://vip.iqiyi.com');
        res.header('Access-Control-Allow-Credentials', true);//如果有cookie的话 options也要加上 因为其实是两个独立的请求
        res.send({code: 'A00003', message: '支持跨域'});
    });
    //复杂请求2
    router.get('/user/complictGet', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.send({code: 'A00003', message: '支持跨域'});
    });
    //预检请求（检测服务器所支持的请求方法）
    router.options('*',function(req, res) {
        res.header('Access-Control-Allow-Origin', 'http://vip.iqiyi.com');// 允许传cookie的时候必须指定
        res.header('Access-Control-Allow-Credentials', true);//允许传cookie的时候加上
        res.header('Access-Control-Allow-Methods', 'DELETE,POST,PUT');//允许请求的方法
        res.header('Access-Control-Max-Age', 3628800);//chrome 配置 disable cache 就会一直都发送
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');//允许跨域请求包含头部字段(实际请求将携带这个自定义请求首部字段)
        res.send(200);
    });

}