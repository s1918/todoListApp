$(document).ready(function(){
   //this line is to watch the result in console , you can remove it later	




  

  const refreshtoDoList = (todolist) => {
    // reload()
    // $("#todo-list").load(location.href + " #todo-list")
    let tList = $('#todo-list');
    let todoTable = $('#todo-table')
    tList.remove()
    todoTable.append(todolist)
    addEventListenterToLi();
    addEventListenterToDeleteAll();
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// delete this
  const addEventListenterToLi = () => {
    $('.dlt').on('click', function(){
      console.log('clicked');
      // var item1 = $(this).closest('li').find('h3:not(:first-child)').text();
      var item1 = $(this).attr('id')
      console.log($(this).attr('id'))
      $.ajax({
        type: 'DELETE',
        url: '/todo/clear-item/' + item1,
        // url: '/todo/cool',
        success: function(data){
          //do something with the data via front-end framework
          refreshtoDoList(data);
        }
      });
    });
  };
  
// delete all
  const addEventListenterToDeleteAll = () => {
    $('#clear').on('click', function(){
      $.ajax({
        type: 'DELETE',
        url: '/todo/clear-all', 
        success: function(data){
          refreshtoDoList(data);
        }
      })
    });
  };


  $('form').on('submit', function(){
      // console.log($('form').serialize());
      // var item = $('form input');
      var item = $('form #item');
      var desc = $('form #desc');
      var catg = $('form #catg');
      var randomID = getRandomInt(99999)
      let time = new Date().toLocaleTimeString();
      let date = new Date().toLocaleDateString();
      
      var todo = {item: item.val(), desc: desc.val(), catg: catg.val(), id: randomID.toString(), date: date + '-' + time};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          // location.reload();
          refreshtoDoList(data);
        }
      });
      item.val('');
      desc.val('');
      catg.val('');
      return false;
  });

  addEventListenterToLi();
  addEventListenterToDeleteAll();
  });

  // const addEventListenterToLi = () => {
  //   $('li').on('click', function(){
  //     var item = $(this).text().replace(/' '/g, "-");
  //     $.ajax({
  //       type: 'DELETE',
  //       url: '/todo/clear-item/' + item,
  //       // url: '/todo/cool',
  //       success: function(data){
  //         //do something with the data via front-end framework
  //         refreshtoDoList(data);
  //       }
  //     });
  //   });
  // };

  // tList.append(todolist.map((row) => `<li>
  // <p>
  // <H2>Item:</H2>${row.item}
  // </p>
  // <p>
  // <H2>Description:</H2> ${row.desc}
  // </p>
  // <P> 
  // <H2>Category: </H2>${row.catg}
  // </P>
  // <P> 
  // <H2>Date: </H2>${row.date}
  // </P>
  // <h3 id='item-id'>${row.id}</h3>
  // <button type="button" id=${row.id} class='dlt' >Delete This Item</button>
  // </li>`).reduce((acc, ele) => acc += ele, ''));
  