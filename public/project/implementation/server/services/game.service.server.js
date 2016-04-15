module.exports = function(app, userModel, gameModel, companyModel, portfolioModel, passport, isAdmin, authorized) {

    var auth = authorized;
    var admn = isAdmin;
    app.get("/api/project/game",auth, admn,  findAllGames);
    app.get("/api/project/game/:userId",auth, findGamesForUser);
    app.post("/api/project/game", createGame);
    app.delete("/api/project/game/:gameId",auth,admn, deleteGame);
    app.put("/api/project/game/:gameId",auth, updateGame);
    app.get("/api/project/game/search/:text", findAllGamesByText);
    app.get("/api/project/game/add/:username/:gameName", addUserInGame);
    app.get("/api/project/game/companies/:gameId", findAllCompaniesForGame);


    function findAllCompaniesForGame(req, res){
        var gameName = req.params.gameId;
        gameModel.findAllCompaniesForGame(gameName)
            .then(
                function (doc) {
                    res.json(doc[0].universe);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function addUserInGame(req, res){
        var username = req.params.username;
        var gameName = req.params.gameName;
        gameModel.addUserInGame(username, gameName)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findAllGamesByText(req, res){
        var text = req.params.text;
        var games = gameModel.findAllGamesByText(text);
        res.json(games);
    }

    function findAllGames(req, res) {
        gameModel.findAllGames()
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findGamesForUser(req, res) {
        var user = req.params.username;
        gameModel.findAllGamesForUser(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function createGame(req, res) {
        var user = req.body;
        companyModel.findAllCompanies()
            .then(
                function (doc) {
                    gameModel.createGame(user, doc)
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            // send error if promise rejected
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function deleteGame(req, res) {
        var gameId = req.params.gameId;
        gameModel.deleteGame(gameId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateGame(req, res) {
        var gameId = req.params.gameId;
        var newGame = req.body;
        gameModel.updateGame(gameId, newGame)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
};


