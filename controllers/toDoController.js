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
}, {
  collection: 'todoCtg',
});

// creating a model based on a schema
const Todo = mongoose.model('Todo', todoSchema);
const todoCtg = mongoose.model('todoCtg', todoCtgSchema);

module.exports = (app) => {
  // get req
  // app.get('/todo', (req, res) => {
  //   todoCtg.find({}, (err, categories) => {
  //     if (err) throw err;
  //     Todo.find({}, (err, todoItems) => {
  //       if (err) throw err;
  //       res.render('todo', { categories: categories, todoItems: todoItems });
  //     });
  //   });
  // });

  const getItemsAndRefresh = async (res, prop, key) => {
    const itemsList = await Todo.find({ prop: key });
    res.render('todoList', { todoItems: itemsList });
  };

  const getCtgsAndRefresh = async (res) => {
    const findCtg = await todoCtg.find();
    res.render('ctgList', { categories: findCtg });
  };

  app.get('/todo', async (req, res) => {
    try {
      const promises = [todoCtg.find({}), Todo.find({})];
      // const [categs, todos] = await Promise.all(promises);
      const retList = await Promise.all(promises);
      const categs = retList[0];
      const todos = retList[1];
      res.render('todo', { categories: categs, todoItems: todos });
    } catch (error) {
      res.status(404).render('errorPage', { error });
    }
  });

  // show one item details
  app.get('/todo/:itemId', async (req, res) => {
    try {
      const item = await Todo.findOne({ id: req.params.itemId });
      if (item == null) {
        throw new Error();
      }
      res.render('item', { todoitem: item });
    } catch (err) {
      res.status(404).render('errorPage', { error: err });
    }
  });

  // add items
  app.post('/todo/add-item', async (req, res) => {
    try {
      await Todo(req.body).save();
      getItemsAndRefresh(res);
    } catch (error) {
      res.status(404).render('errorPage', { error });
    }
  });

  // clear one item
  app.delete('/todo/clear-item/:item', async (req, res) => {
    try {
      await Todo.find({ id: req.params.item }).remove();
      getItemsAndRefresh(res);
    } catch (error) {
      res.status(404).render('errorPage', { error });
    }
  });

  // add new catigory
  app.post('/todo/add-ctg', async (req, res) => {
    await todoCtg(req.body).save();
    getCtgsAndRefresh(res);
  });

  // clear all ctg items
  app.delete('/todo/clear-all-ctg', async (req, res) => {
    await todoCtg.find({}).remove();
    getCtgsAndRefresh(res);
  });

  // show this ctg
  app.get('/todo/ctg/:ctg', async (req, res) => {
    const sameCtgItems = await Todo.find({ ctg: req.params.ctg });
    res.render('todoCtgOnly', { todoItems: sameCtgItems });
  });

  // clear all list items
  app.delete('/todo/clear-all', async (req, res) => {
    await Todo.find({}).remove();
    getItemsAndRefresh(res);
  });
};
