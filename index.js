const http = require('http');
const fs = require('fs');
const data = require('./top_2018_movies.json');
const srt = require('sort-json-array');

function allMovies(response){

    response.write("This displays all movies \n");
    data.forEach(x => response.write(x.rank + ". " + x.movie + "\n"));
    response.end();
 
}

function action(response){

    response.write("This displays all movies in the action genre that grosssed over 20 million \n");

    for(i = 0; i < data.length; i++){
        if(data[i].genre === "Action" && data[i].gross > 20000000){
            response.write(data[i].rank + ". " + data[i].movie + "\n");
        }
    }
    response.end();
}

function pg (response){

    response.write("This displays all movies rated PG-13 that sold between 1 million and 5 million tickets \n");

    for(i = 0; i < data.length; i++){
        if(data[i].mpaa === "PG-13" && 1000000 < data[i].tickets_sold < 5000000){
            response.write(data[i].rank + ". " + data[i].movie + "\n");
        }
    }
    response.end();
}

function distributor (response){
    response.write("This displays the list of movies in order of distributor \n");

    for (i = 0; i < data.length; i++){
        response.write(data[i].rank + ". " + data[i].movie + " |Distributor: " + data[i].distributor + "\n");
    }
    response.end();
}

//Create server function
let server = http.createServer(function(request,response){

    if((request.url === "/") && (request.method ==="GET"))
        {
                response.statusCode = 200;
                fs.readFile('./index.html', function(err,data){
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                
                return response.end();
                });
        
        }else if(request.url === "/all_movies" && request.method === "GET"){
                response.statusCode = 200;
                allMovies(response);
                response.end();
        
        }else if(request.url === "/action" && request.method === "GET"){
                response.statusCode = 200;
                action(response);
                response.end();
        
        }else if(request.url === "/pg" && request.method === "GET"){
                response.statusCode = 200;
                pg(response);
                response.end();
        
        }else if(request.url === "/distributor" && request.method === "GET"){
                response.statusCode = 200;
                distributor(response);
                response.end();
        }else{
            console.log("invalid route");
            response.end("Ya done messed up A-Aron");
        }

});
    server.listen(3000, ()=>{
        console.log("Server is running on port 3000");
    });
