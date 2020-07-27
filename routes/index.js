module.exports = function (app) {
    var url = require('./controller');
    var apiV1 = "/api/v1/";
    //url homenya
    app.route('/').get(url.index);

    app.route(apiV1+'users/:id').get(url.userbyid);

    app.route(apiV1+'auth').post(url.auth);

    app.route(apiV1+'upload').post(url.upload);

    // //url create user
    // app.route('/user').post(url.createuser);

    // // //url update user
    // app.route('/user').put(url.updateuser);

    // // //url delete user
    // app.route('/user').delete(url.deleteuser);

    app.route(apiV1+'genre').get(url.genres);

    app.route(apiV1+'producer').get(url.producers);

    app.route(apiV1+'season').get(url.seasons);

    app.route(apiV1+'type').get(url.types);


    // app.route(apiV1+'anime').get(url.anime);

    // app.route(apiV1+'anime/search/:q').get(url.animesearch);

    // app.route(apiV1+'grab/widget-header').get(url.widgetHeader);

    app.route(apiV1+'grab/widget-header').get(url.widgetHeader);

    app.route(apiV1+'grab/anime/:q').get(url.animeSearch);

    app.route(apiV1+'grab/anime/:q/:show').get(url.animeSearch);

};