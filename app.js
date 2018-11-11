var http = require('http'),
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    pg = require('pg'),
    app = express();

/*database connection string*/
var connect = "postgres://postgres:conven3ntpostgres@localhost/recipebookDB";

app.use("/assets", express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');


/*setting the body parser middleware to be available as a global object*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
/*end of body parser middleware*/

/*application route*/
app.get('/', function(req, res){
    pg.connect(connect, function(err, client, done) {
        if (err) {
            console.log('error fetching client from pool', err);
            reject(0);
        } else {
            client.query('SELECT * from recipes', function (err, results){
                if(err) {
                    return console.log('error running in query ' + err);
                }
                res.render('index', {
                    input : "saying this and that",
                    data :  results.rows
                });
            });

            done();
        }
    });
});

/*function that inserts the information from the front end*/
app.post('/add', function(req, res) {
    pg.connect(connect, function(err, client, done) {
        if (err) {
            console.log('error fetching client from pool', err);
            reject(0);
        } else {
            client.query("INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)",
             [req.body.name, req.body.ingredients, req.body.directions]);
            res.redirect('/');
            done();
        }
    });
});
/*end of function that inserts the information from the front end*/

/*end of appliaction route*/

/*creating a route for delete request */
app.delete('/delete/:id', function (req, res) {
        var data = req.params.id;

        pg.connect(connect, function(err, client, done) {
            if (err) {
                console.log('error fetching client from pool', err);
                reject(0);
            } else {
                client.query("DELETE FROM recipes WHERE id = $1", [data]);
                done();

                res.sendStatus(200);
            }
        });

});
/*End of creating a route for delete request*/


/*creating a route for updating or editing contents*/
app.post('/update', function (req, res) {
    var data = req.body;
    pg.connect(connect, function(err, client, done) {
        if (err) {
            console.log('error fetching client from pool', err);
            reject(0);
        } else {
            client.query("UPDATE recipes SET name = $1, ingredients = $2, directions = $3 WHERE ID = $4;",
                [data.UpdateName, data.updateIngredients, data.updateDirections, data.id]);

                done();
                res.redirect("/");
        }
    });

});
/*end of creating a route for updating or editing a recipe*/

/*server*/
app.listen(3000, console.log("server on @ port 3000"));