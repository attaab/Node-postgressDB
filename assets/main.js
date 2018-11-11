$(document).ready(function() {

          /*ajax delete request*/
         $('.delete-recipe').on('click', function() {

           /*with the next line i am collecting the id and catching it in a variable*/
              var id = $(this).attr("data-id");
              /*end of collecting and catching id in variable*/
              if (confirm('Are you sure you want to delete?')) {
                     /*checking if the delete request is valid*/
                $.ajax({
                        type: 'delete',
                        url: '/delete/' + id,
                        success: function(data){
                          /*redirecting the location of the page after the delete request has been made*/
                            window.location.href="/";
                          /*end of redirecting the location of the page after the delete request has been made*/
                    },
                    error: function (err) {
                        console.log("the error from deleting item is " + err);
                        }
                  });
               
              }
              
        });
         /*end of Ajax delete request*/

         /*setting the value of the input fields for the particular item being clicked*/
         $(".edit-recipe").on("click", function () {
              var dataName = $(this).data("name"),
                  dataId = $(this).data('id'),
                  dataIngredients = $(this).data('ingredients'),
                  dataDirections = $(this).data('directions');
                    
                  // console.log(dataId);

                    $("#updateForm").children().find("input.recipe-name").val(dataName);//setting the input field to have the name for the 'about to edit item'
                    $("#updateForm").children().find("input.recipe-ingredients").val(dataIngredients);//setting the input field to have the ingredient for the 'about to edit item'
                    $("#updateForm").children().find("input.recipe-directions").val(dataDirections);//setting the input field to have the direction for the 'about to edit item'
                    $("#updateForm").children("input.recipe-id").val(dataId);//setting the input field to have the id for the 'about to edit item'
         });
         /*end of setting the values of the input fields*/

         /*update request using ajax, its not working and i am not getting the things i need needs tweeking*/
        //  $(".update-form").on("submit", function (e) {
        //   e.preventDefault();//stopping the form from submiting or reloading page
        //     var recipeName =  $(this).children('input .recipe-name').val(),
        //         recipeIngredients =$(this).children('input .recipe-ingredients').val(),
        //         recipeDirections =$(this).children('input .recipe-directions').val(),
        //         id = $(this).attr('data-id'),
        //         recipe = {name : recipeName,
        //                   ingredients : recipeIngredients,
        //                   directions : recipeDirections};

        //         console.log(recipeName);
               
                /*ajax call to the update function*/
                // $.ajax({
                //   type: 'POST',
                //   url: '/update/' + id,
                //   data: recipe,
                //   success: function (data) {
                //      window.href = "/";
                //   }
                // });
        //  })
         /*end of update request*/

});