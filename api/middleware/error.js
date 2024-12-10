export default function (error, req, res, next) {
    res.status(500).send('Something faild');
}