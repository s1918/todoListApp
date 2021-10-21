/* eslint-disable no-undef */
$(document).ready(() => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  // add random comment
  // add items
  $('#item-list').on('submit', () => {
    const item = $('form #item');
    const desc = $('form #desc');
    const randomID = getRandomInt(99999);
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    const ctg = $('#ctgs').find(':selected').text();
    const todo = {
      item: item.val(),
      desc: desc.val(),
      ctg,
      id: randomID.toString(),
      date: `${date} - ${time}`,
    };
    $.ajax({
      type: 'POST',
      url: '/todo/add-item',
      data: todo,
      success: (todoLitsHTMLElem) => {
        // eslint-disable-next-line no-use-before-define
        refreshtoDoList(todoLitsHTMLElem);
      },
    });
    item.val('');
    desc.val('');
    return false;
  });

  // delete this
  const addEventListenterToLi = () => {
    $('.dlt').on('click', function () {
      const item1 = $(this).attr('id');
      $.ajax({
        type: 'DELETE',
        url: `/todo/clear-item/${item1}`,
        success: (data) => {
          // eslint-disable-next-line no-use-before-define
          refreshtoDoList(data);
        },
      });
    });
  };

  // add a new category
  $('#ctg-div').on('submit', () => {
    const ctg = $('#ctg-input');
    const todoCtg = { ctg: ctg.val() };
    $.ajax({
      type: 'POST',
      url: '/todo/add-ctg',
      data: todoCtg,
      success: (data) => {
        // eslint-disable-next-line no-use-before-define
        refreshtoCtgList(data);
      },
    });
  });

  // show this ctg
  $('#ctg-show-btn').on('click', () => {
    const ctg = $('#ctgs').find(':selected').text();
    $.ajax({
      type: 'GET',
      url: `/todo/ctg/ ${ctg}`,
      success: () => {
        window.open(`/todo/ctg/${ctg}`);
      },
    });
  });

  // delete all catigories
  const addEventListenterToCtgClearAll = () => {
    $('#ctg-clear-all').on('click', () => {
      $.ajax({
        type: 'DELETE',
        url: '/todo/clear-all-ctg',
        success: (data) => {
          // eslint-disable-next-line no-use-before-define
          refreshtoCtgList(data);
        },
      });
    });
  };

  // delete all items
  const addEventListenterToDeleteAll = () => {
    $('#clear').on('click', () => {
      $.ajax({
        type: 'DELETE',
        url: '/todo/clear-all',
        success: (data) => {
          // eslint-disable-next-line no-use-before-define
          refreshtoDoList(data);
        },
      });
    });
  };

  const refreshtoCtgList = (ctglist) => {
    const cList = $('#ctgs');
    const catigoryList = $('#catigory-list');
    cList.remove();
    catigoryList.append(ctglist);
    addEventListenterToLi();
    addEventListenterToDeleteAll();
    addEventListenterToCtgClearAll();
  };

  const refreshtoDoList = (todoLitsHTMLElem) => {
    // get old table element and delete it
    const tList = $('#todo-list');
    tList.remove();

    // get table parent and add new table element to it
    const todoTable = $('#todo-table');
    todoTable.append(todoLitsHTMLElem);

    // Hook all needed evenets to new elements
    addEventListenterToLi();
    addEventListenterToDeleteAll();
    addEventListenterToCtgClearAll();
  };

  addEventListenterToLi();
  addEventListenterToDeleteAll();
  addEventListenterToCtgClearAll();
});
