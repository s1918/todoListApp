/* eslint-disable no-undef */
$(document).ready(function(){
  
  const alertUser = (msg) => {
    alert(msg);
  }

  const refreshtoCtgList = (ctglist) => {
    let cList = $('#ctgs');
    let catigoryList = $('#catigory-list')
    cList.remove();
    catigoryList.append(ctglist);
    addEventListenterToLi();
    addEventListenterToDeleteAll();
    addEventListenterToCtgClearAll();
  }	

  const refreshtoDoList = (todoLitsHTMLElem) => {
    // get old table element and delete it 
    let tList = $('#todo-list');
    tList.remove();

    // get table parent and add new table element to it
    let todoTable = $('#todo-table');
    todoTable.append(todoLitsHTMLElem);

    // Hook all needed evenets to new elements
    addEventListenterToLi();
    addEventListenterToDeleteAll();
    addEventListenterToCtgClearAll();
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // add items
  $('#item-list').on('submit', function(){
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
      success: function(todoLitsHTMLElem){
        refreshtoDoList(todoLitsHTMLElem);
      }
    });
    item.val('');
    desc.val('');
    return false;
  });

  // delete this
  const addEventListenterToLi = () => {
    $('.dlt').on('click', function(){
      var item1 = $(this).attr('id')
      $.ajax({
        type: 'DELETE',
        url: '/todo/clear-item/' + item1,
        success: function(data){
          refreshtoDoList(data);
        }
      });
    });
  };

  // add a new category
  $('#ctg-div').on('submit', function(){
    let ctg = $('#ctg-input');
    let todoCtg = {ctg: ctg.val()};
    $.ajax({
      type: 'POST',
      url: '/todo/add-ctg',
      data: todoCtg,
      success: function(data){
        refreshtoCtgList(data);
      }
    })
  });

  // show this ctg
  $('#ctg-show-btn').on('click', function(){
    let ctg = $('#ctgs').find(":selected").text();
    $.ajax({
      type: 'GET',
      url: '/todo/ctg/' + ctg,
      success: function(data){
        window.open('/todo/ctg/' + ctg)
      }
    });
  });

// delete all catigories 
  const addEventListenterToCtgClearAll = () => {
    $('#ctg-clear-all').on('click', function(){
      $.ajax({
        type: 'DELETE',
        url: '/todo/clear-all-ctg',
        success: function(data){
          refreshtoCtgList(data);
        }
      });
    });
  };

// delete all items
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

  addEventListenterToLi();
  addEventListenterToDeleteAll();
  addEventListenterToCtgClearAll();
});