
$("#add_user").submit(function(event){
    alert("New User Inserted Successfully")
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array= $(this).serializeArray();

    $
    console.log(unindexed_array);
    // alert("User Details Updated Successfully")
})