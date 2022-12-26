const express = require("express");
const app = express();

let quotes = require("./quotes.json");

app.use(express.json())

app.get('/', function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function(request, response){
  response.json(quotes);
}); 
app.post("/quotes", function(request, response){
  //get the quote from the request body
  const quote = request.body

  if (notValidRequest(quote)){
    return response.status(400).send({success: false})
  }
  //console.log(quote)
  //response.send("wip")

  //add quote to our quotes
  quotes.push(quote)

  //return a successful status code 201
  response.status(201).send({success: true})

  function notValidRequest(quote){
    return quote.id == undefined ||
    quote.author == undefined ||
    quote.body == undefined

  }

})
///put method
app.put("/quotes/:id", function(request, response){
  //get the id of the quote we want to modify
  const id = request.params.id
  //console.log(id)
  //find the quote in all of quotes
  const quotesFiltered = quotes.filter(function (quote){
 return quote.id != id
  })
  const quoteToUpdate = quotes.find(function(quote){
    return quote.id = id
  })
  //update quote
  const quoteUpdated = {
    id : id,
    author : request.body.author,
    quote : request.body.quote
  }
quotes = quotesFiltered
quotes.push(quoteUpdated)
  //change the content
  response.send({success: true})
})
//deletion
app.delete("/quotes/:id", function(request,response){
  response.send({success : true})
  //get the id from request
  //find quote
  //remove it
})

app.listen(3000, () => console.log("Listening on port 3000"));
