module.exports = function (app) {
    var url = require('./controller');
    var apiV1 = "/api/v1/";
    //url homenya
    app.route('/').get(url.index);
    //admin api
    app.route(apiV1+'auth').post(url.auth);

    app.route(apiV1+'genre').get(url.genres);

    app.route(apiV1+'producer').get(url.producers);

    app.route(apiV1+'season').get(url.seasons);

    app.route(apiV1+'type').get(url.types);


    app.route(apiV1+'jikan/findanime/:id').get(url.jikanFindAnime);
    app.route(apiV1+'jikan/findanime/:id/:request').get(url.jikanFindAnime);
    app.route(apiV1+'jikan/findanime/:id/:request/:page').get(url.jikanFindAnime);

    app.route(apiV1+'translate').post(url.translateGoogle);
   

    app.route(apiV1+'grab/widget-header').get(url.widgetHeader);

    app.route(apiV1+'grab/anime/:q').get(url.animeSearch);

    app.route(apiV1+'grab/anime/:q/:show').get(url.animeSearch);


    //datatables
    app.route(apiV1+'dt/animelist').post(url.dtanimelist);
    app.route(apiV1+'animelist').post(url.addanimelist);
    app.route(apiV1+'animelist/:id').get(url.animelistbyid);
    app.route(apiV1+'animelist').put(url.updateanimelist);
    app.route(apiV1+'animelist/:id').delete(url.deleteanimelist);

    app.route(apiV1+'dt/genrelist').post(url.dtgenrelist);
    app.route(apiV1+'genrelist').post(url.addgenrelist);
    app.route(apiV1+'genrelist/:id').get(url.genrelistbyid);
    app.route(apiV1+'genrelist').put(url.updategenrelist);
    app.route(apiV1+'genrelist/:id').delete(url.deletegenrelist);

    app.route(apiV1+'dt/producerlist').post(url.dtproducerlist);
    app.route(apiV1+'producerlist').post(url.addproducerlist);
    app.route(apiV1+'producerlist/:id').get(url.producerlistbyid);
    app.route(apiV1+'producerlist').put(url.updateproducerlist);
    app.route(apiV1+'producerlist/:id').delete(url.deleteproducerlist);
    //end datatables

};