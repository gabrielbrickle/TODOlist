$(document).ready(function() {
  gabeToDo.init();
})

var gabeToDo = {
  url: 'http://tiny-tiny.herokuapp.com/collections/gabetodo',
  todos: [],
  init: function() {
    gabeToDo.styling();
    gabeToDo.events();
  },//end init funciton
  styling: function() {
    gabeToDo.getToDo();
  },//end styling
  events: function() {
//Add New ToDo Item
  $('form').submit(function () {
    event.preventDefault();
    if ($('input').val() !== '') {
      var input_value = $(this).children('input').val();
      var thingToSubmit = {
        todo: input_value
      }
      gabeToDo.createToDoPost(thingToSubmit)
      $('ul').append(`<li>${input_value}<a href=""> ✓</a></li>`);
    };
    $('input').val('');
    return false;
  })
  // /code below enables delete
  $(document).on('click', 'a', function (element) {
    event.preventDefault();
    var toDoId = $(this).parent().data('id');
    console.log("TODO ID", toDoId)
    window.glob = $(this);
    $(this).parent().remove();
    gabeToDo.deleteToDo(toDoId);
  });
  ////completed button
  // $('.completebutton').on('click', function(){
  //   event.preventDefault();
  //   $.each($('li'),function(idx,element) { $(element).has('a').css("display",'none') });
  // });

  // $('a').on('click', function(){
  //   event.preventDefault();
  //   console.log("a tag!");
  // })
  //
  $('.clearbutton').on('click', function(){
    event.preventDefault();
    var deleteAll = $('li').siblings().data('id');
    $('li').remove();
    gabeToDo.deleteToDo(deleteAll);
  })

  ////editing a post
  var newLiVal;
  $("ul").on('dblclick', 'li', function () {
    newLiVal = $(this).text();
    $(this).text("");
    $("<input type='text' data-id='"+ $(this).data('id') +"'>").appendTo(this).focus();
  });
  $("ul").on('focusout', 'li > input', function () {
    var $this = $(this);
    var newLiVal = $this.val()
    $this.text($this.val());
    $(this).parent().text($this.val()).append('<a href=""> ✓</a>');
    $this.remove();
    gabeToDo.editToDo({
      todo: newLiVal,
      _id: $this.data('id')
    })
  });
  ///Clicking on buttons
   $('button').on('click',function(event) {
    event.preventDefault();
    console.log(this);
  });
    /////clicking on active button
    // $('.clear').on('click',function(){
    //   event.preventDefault();
    //   $('ul').toggle('li');
    // });
    $('.activebutton').on('click', function(){
      event.preventDefault();
      $.each($('li'),function(idx,element) { $(element).has('a').css("display",'block') });
    });
    $('.allbutton').on('click',function(){
      event.preventDefault();
      // $('ul').toggle('hidden');
      $.each($('li'),function(idx,element) { $(element).has('a').css("display",'block') });

    });
    },

////////AJAX ---CRUD

  createToDoPost: function(thingToDo) {
    $.ajax({
      url: gabeToDo.url,
      method: "POST",
      data: thingToDo,
      success: function(data) {
        console.log("works", data);
          gabeToDo.todos.push(data);
          gabeToDo.getToDo();
      },
      error: function(err) {
        console.error("OH CRAP", err);
      }
    })
  },

  getToDo: function() {
    $.ajax({
      url: gabeToDo.url,
      method: "GET",
      success: function(data) {
        console.log("WE GOT SOMETHING", data);
        $(".tasksremaining").find('h5').text("Tasks Remaining: " + data.length ); ///this counts the list items
        $('ul').html("");
        data.forEach(function(element,idx) {
          var toDoStr = `<li data-id="${element._id}">${element.todo}<a href=""> ✓</a></li>`
          $('ul').append(toDoStr)
          gabeToDo.todos.push(element);
        });
      },
      error: function(err) {
        console.error("ugh", err);
      }
    })
  },
  deleteToDo: function(toDoId) {
          // find post to delete from our post data;
    var DeletePost = gabeToDo.url + "/" + toDoId;
      $.ajax({
        url: DeletePost,
        method: "DELETE",
        success: function(data) {
          console.log("WE DELETED SOMETHING", data);
          gabeToDo.getToDo();

        },
        error: function(err) {
          console.error("ugh", err);
        }
      })
    },

    editToDo: function(thingToEdit) {
      console.log("THING TO EDIT", thingToEdit);
      $.ajax({
        url: gabeToDo.url + "/" + thingToEdit._id,
        method: "PUT",
        data: thingToEdit,
        success: function(data) {
          console.log("edited!!!!!",data)
          gabeToDo.getToDo();
        },
        error: function(err) {
          console.error("OH CRAP", err);
        }
      })
  }, ///ending
//
//   templification: function(template) {
//     return _.template(template);
//   },
//
//   htmlGenerator: function(template,data) {
//     var tmpl = gabeToDo.templification(template);
//     return tmpl(data);
//   }
//
//
//
};//end variable gabeToDo
