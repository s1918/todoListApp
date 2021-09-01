/* eslint-disable no-undef */
$(document).ready(function(){
   //this line is to watch the result in console , you can remove it later
  // const refreshtoCtgList = (ctglist) => {
  //   let cList = $('#ctgs');
  //   let dropDown = $('#dropdown')
  //   cList.remove();
  //   dropdown.append(ctglist);
  //   addEventListenterToLi();
  //   addEventListenterToDeleteAll();
  //   addEventListenterCtgAddition();
  // }	

  const refreshtoDoList = (todolist) => {
    // reload()
    // $("#todo-list").load(location.href + " #todo-list")
    let tList = $('#todo-list');
    let todoTable = $('#todo-table');
    tList.remove();
    todoTable.append(todolist);
    addEventListenterToLi();
    addEventListenterToDeleteAll();
    // addEventListenterCtgAddition();
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// delete this
  const addEventListenterToLi = () => {
    $('.dlt').on('click', function(){
      // var item1 = $(this).closest('li').find('h3:not(:first-child)').text();
      var item1 = $(this).attr('id')
      $.ajax({
        type: 'DELETE',
        url: '/todo/clear-item/' + item1,
        success: function(data){
          //do something with the data via front-end framework
          refreshtoDoList(data);
        }
      });
    });
  };
  
// add catigories
  // const addEventListenterCtgAddition = () => {
    $('#ctg-div').on('submit', function(){
      let ctg = $('#ctg-input');
      let todoCtg = {ctg: ctg.val()};
      $.ajax({
        type: 'POST',
        url: '/todo/add-ctg',
        data: todoCtg,
        success: function(data){
          refreshtoDoList(data);
        }
      })
    });
  // };

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

// add items
  $('#item-list').on('submit', function(){
      // console.log($('form').serialize());
      let item = $('form #item');
      let desc = $('form #desc');
      let randomID = getRandomInt(99999)
      let time = new Date().toLocaleTimeString();
      let date = new Date().toLocaleDateString();
      let ctg = $('#ctgs').find(":selected").text();
      let todo = {item: item.val(), desc: desc.val(), ctg: ctg, id: randomID.toString(), date: date + '-' + time};
      $.ajax({
        type: 'POST',
        url: '/todo/add-item',
        data: todo,
        success: function(data){
          // location.reload();
          refreshtoDoList(data);
        }
      });
      item.val('');
      desc.val('');
      return false;
  });

  addEventListenterToLi();
  addEventListenterToDeleteAll();
  // addEventListenterCtgAddition();
  });

  

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
  