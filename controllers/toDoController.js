
// let todoitems = [{item: "milk", descittion: 'dirnk it', catg: 'food'}, {item: "bike"}, {item: 'bread'}, {item: 'coco'}];
// console.log(todoitems[0])

const mongoose = require('mongoose');

// connect to database 

const DB_STRING = 'mongodb+srv://test:test@cluster0.7bgts.mongodb.net/cluster0?retryWrites=true&w=majority';
mongoose.connect(DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

// creating a schema
var todoSchema = new mongoose.Schema({
    item: String,
    desc: String,
    catg: String,
    id: String,
    date: String
});


// creating a model based on a schema 
let Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){
    
app.get('/todo', function(req,res){
    Todo.find({}, function(err, data){
        if (err) throw err;
        res.render('todo', {todos: data});
    })
});

app.get('/todo/:itemId', function(req,res){
    // 
    Todo.findOne({id: req.params.itemId}, function(err, data){
        if (err) throw err;
        res.render('item', {todoitem: data});
    })
    // res.render('test');
});

//catg
// app.get('/catg', function(req,res){
//     Todo.find({}, function(err, data){
//         if (err) throw err;
//         res.render('todo', {todos: data});
//     })
// });


app.post('/todo', function(req,res){
    Todo(req.body).save(function(err, data){
        if (err) throw err;

        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todoList', {todos: data});
            // res.json(data);
        });
    })
});

app.delete('/todo/clear-item/:item', function(req, res){
    Todo.find({id: req.params.item}).remove(function(err, data){
        if (err) throw err;
        // res.json(data);
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
});

//clear all
app.delete('/todo/clear-all', function(req, res){
    Todo.find({}).remove(function(err, data){
        if (err) throw err;
        // res.json(data);
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
});


// delete item
// app.delete('/todo/clear-item/:item', function(req, res){
//     Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
//         if (err) throw err;
//         // res.json(data);
//         Todo.find({}, function(err, data){
//             if (err) throw err;
//             res.json(data);
//         });
//     });
// });

// app.delete('/todo/clear-dublct', function(req, res){
//     Todo.find({}).remove(function(err, data){
//         if (err) throw err;
//         // res.json(data);
//         Todo.find({}, function(err, data){
//             if (err) throw err;
//             res.json(data);
//         });
//     });
// });

}


// testing the database 
// let itemOne = Todo({item: 'Do stuff'}).save(function(err){
//     if (err) throw err;
//     console.log('item saved');
// });

// // render from local data
// app.get('/todo', function(req,res){
//     res.render('todo', {todos: data});
//     // res.render('test');
// });

// // test item description in new page
// app.get('/todo/:item', function(req,res){
//     res.render('item', {todoitem: req.params.item});
//     // res.render('test');
// });

// app.get('/todo/:item/:x', function(req,res){
//     res.render('2item', {todoitem: req.params.item});
//     // res.render('test');
// });

// app.post('/todo', function(req,res){
//     data.push(req.body);
//     res.json(data);
//     console.log(data);
// });

// app.delete('/todo/:item', function(req, res){
//     data = data.filter(function(todo){
//         return todo.item.replace(/ /g, '-') !== req.params.item;
//     })
//     res.json(data);
// });



