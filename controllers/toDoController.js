const mongoose = require('mongoose');
// connect to database 
const DB_STRING = 'mongodb+srv://test:test@cluster0.7bgts.mongodb.net/cluster0?retryWrites=true&w=majority';
mongoose.connect(DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });



// creating a schema
const todoSchema = new mongoose.Schema({
  item: String,
  desc: String,
  ctg: String,
  id: String,
  date: String,
});

const todoCtgSchema = new mongoose.Schema({
  ctg: String,
} , {
  collection: 'todoCtg'
});

// creating a model based on a schema
const Todo = mongoose.model('Todo', todoSchema);
const todoCtg = mongoose.model('todoCtg', todoCtgSchema);

module.exports = (app) => {
// get req
  app.get('/todo', (req, res) => {
    todoCtg.find({}, (err, categories) => {
      if (err) throw err;
      Todo.find({}, (err, todoItems) => {
        if (err) throw err;
        res.render('todo', { categories: categories, todoItems: todoItems });
      });
    });
  });

// show one item details
  app.get('/todo/:itemId', function(req,res){
    Todo.findOne({id: req.params.itemId}, function(err, item){
      if (err) throw err;
      res.render('item', {todoitem: item});
    })
  });

// add items 
  app.post('/todo/add-item', function(req,res){
    Todo(req.body).save(function(err, todo){
      if (err) throw err;
      Todo.find({}, function(err, todoItems){
        if (err) throw err;
        res.render('todoList', {todoItems: todoItems});
        // res.json(data);
      });
    });
  });

// clear one item 
  app.delete('/todo/clear-item/:item', function(req, res){
    Todo.find({id: req.params.item}).remove(function(err, data){
      if (err) throw err;
      // res.json(data);
      Todo.find({}, function(err, todoItems){
        if (err) throw err;
        res.render('todoList', {todoItems: todoItems});
      });
    });
  });

// add new catigory
  app.post('/todo/add-ctg', function(req,res){
    // if (todoCtg.find( { sad: { $exists: true } } )) {

    //   console.log('already there')
    // }
    todoCtg.find( { ctg: { $exists: false } } ), function(err, data){
      if (err) throw err;
      console.log('false')
    }
    todoCtg(req.body).save(function(err, data){
      if (err) throw err;
      todoCtg.find({}, function(err, categories){
          if (err) throw err;
          res.render('ctgList', {categories: categories});
          // res.json(data);
        });
    });
  });

//clear all ctg items
  app.delete('/todo/clear-all-ctg', function(req, res){
    todoCtg.find({}).remove(function(err, data){
      if (err) throw err;
      todoCtg.find({}, function(err, categories){
          if (err) throw err;
          res.render('ctgList', {categories: categories});
          // res.json(data);
        });
    });
  });

// show this ctg 
  app.get('/todo/ctg/:ctg', function(req, res){
    Todo.find({ctg: req.params.ctg}, function(err, todoItemsFromSameCtg){
      if (err) throw err;
      res.render('todoCtgOnly', {todoItems: todoItemsFromSameCtg});
    });
  });

//clear all list items
  app.delete('/todo/clear-all', function(req, res){
    Todo.find({}).remove(function(err, data){
      if (err) throw err;
      // res.json(data);
      Todo.find({}, function(err, todoItems){
        if (err) throw err;
        res.json(todoItems);
      });
    });
  });
}

