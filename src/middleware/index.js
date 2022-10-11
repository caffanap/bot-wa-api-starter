export default function Middleware() {
    app.use(function (req, res, next) {
        console.log(req.method + " : " + req.path);
        next();
    });
}