const fs = require('fs');
const readlineSync = require('readline-sync');
const List =  require('./List');



//MOVIE APP PORTION
var movieList = new List();
var customerList = new List();

//Customer Object Constructor
function Customer(name, movie){
    this.name = name;
    this.movie = movie;
}

//These are wrapper functions that help keep the code similar to the book
function read(file_name){ 
    //Function not in book that returns the contents of a given file as a string
    return fs.readFileSync(file_name).toString();
}

function print(display_string){
    console.log(display_string);
}

function putstr(question){
    var response = readlineSync.question(question);
    return response;
}
//End of wrappers

function createArr(file) {
    var arr = read(file).split('\n');
    for(var i in arr){
        arr[i] = arr[i].trim();
    }
    return arr;
}

for(var i in movies){
    movieList.append(movies[i]);
}

function checkOut(name, movie, movieList, customerList){
    if(movieList.contains(movie)){
        var c = new Customer(name, movie);
        customerList.append(c);
        movieList.remove(movie);
    }  else {
        print( movie + ' is not available');
    }
}

function displayList(list){
    for(list.front(); list.hasNext(); ){
        var listItem = list.next();
        if(listItem instanceof Customer){
            print(listItem.name + ", " + listItem.movie)
        } else {
            print(listItem);
        }
    }
}

//Test Program
var movies = createArr('Movies.txt');
var movieList = new List();
var customers = new List();
var name = "";
var movie = "";
for(var i in movies){
    movieList.append(movies[i]);
}


while(name != "exit" || movie != "exit"){
    name = putstr("Enter your name: ");
    movie = putstr("Enter your desired movie: ");
    checkOut(name, movie, movieList, customers);
    print("Customer Rentals: ");
    displayList(customers);
   // print("Movies Now Available: \n");
   // displayList(movieList);
}
