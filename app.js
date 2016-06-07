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
  ///Clicking on buttons
   $('button').on('click',function(event) {
    event.preventDefault();
    console.log(this);
  });
    //   var thingWeClickText = $(this).text();
    //   var ourClassToShow = "." + thingWeClickText.toLowerCase();
    //
    // if(thingWeClickText.toLowerCase() === 'all') {
    //   cconsole.log(thingWeClickText.text);
    //   // $(ourClassToShow).removeClass('all')
    //   // $(ourClassToShow).siblings().addClass('hidden')
    // } else {
    //   var htmlStr = gabeToDo.htmlGenerator(blogTemplates[thingWeClickText.toLowerCase()])
    //   $(ourClassToShow).removeClass('hidden').append(htmlStr);
    //   $(ourClassToShow).siblings().addClass('hidden')
    // }
    // }),
    $('.clear').on('click',function(){
      event.preventDefault();
      $('ul').toggle('li');
    });

    $('.allbutton').on('click',function(){
      event.preventDefault();
      $('ul').toggle('hidden');
    });

    },


  createToDoPost: function(thingToDo) {
    $.ajax({
      url: gabeToDo.url,
      method: "POST",
      data: thingToDo,
      success: function(data) {
        console.log("works", data);
          gabeToDo.todos.push(data);
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
        },
        error: function(err) {
          console.error("ugh", err);
        }
      })
  },


        // ///clicking on buttons
        //    $('.actions').on('click','button'function(event) {
        //     event.preventDefault();
        //     var thingWeClickText = $(this).text();
        //     var ourClassToShow = "." + thingWeClickText.toLowerCase();
        //
        //   if(thingWeClickText.toLowerCase() === 'all') {
        //     cconsole.log(thingWeClickText.text);
        //     // $(ourClassToShow).removeClass('all')
        //     // $(ourClassToShow).siblings().addClass('hidden')
        //   } else {
        //     var htmlStr = gabeToDo.htmlGenerator(blogTemplates[thingWeClickText.toLowerCase()])
        //     $(ourClassToShow).removeClass('hidden').append(htmlStr);
        //     $(ourClassToShow).siblings().addClass('hidden')
        //   }
        //   }),
        // ///deleting a to do item i.e. checking the box
        //   $('.toDoPost').on('click','button', function(event) {
        //     event.preventDefault();
        //     var blogId = $(this).parent().data('id');
        //     gabeToDo.deleteToDo(????);
        //   })


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
