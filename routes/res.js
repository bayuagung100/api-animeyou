exports.ok = function (values, res, status="200") {

    var data = {
        'status': status,
        'results': values
    };
    var api = {
        data: data
    }
    res.json(data);
    res.end();
};

exports.agc = function (values, res, query="", status="200") {

    var data = {
        'status': status,
        'query': query,
        'results': values
    };
    res.json(data);
    res.end();
};

exports.agcSearch = function (values, res, query="", page="1",status="200") {

    var data = {
        'status': status,
        'query': query,
        'paginations': page,
        'results': values
    };
    res.json(data);
    res.end();
};

exports.auth = function (token, values, res, status=200) {
    var data = {
        'status': status,
        'token': token,
        'results': values
    };
    var api = {
        data: data
    }
    // res.writeHead(200, { 'Access-Control-Allow-Origin': '*', });
    res.json(data);
    res.end();
};

exports.datatables = function (draw, recordsTotal, recordsFiltered, values, res) {

    var data = {
        'draw': draw,
        "recordsTotal": recordsTotal,
        "recordsFiltered": recordsFiltered,
        'data': values
    };
    res.header("Access-Control-Allow-Origin", "*");
    res.json(data);
    res.end();
};

