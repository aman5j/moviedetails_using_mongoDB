$(document).ready(function(){
    $.getJSON("/movie/fetch_all_states",function(data){
        var data=data.result;
        // alert(JSON.stringify(data))
        data.map((item,i)=>{
            $("#stateid").append($('<option>').text(item.statename).val(item._id));
        })
    })

    $("#stateid").change(function(){
        $.getJSON("/movie/fetch_all_cities", {stateid:$('#stateid').val()}, function(data){
            var data=data.result;
            $("#cityid").empty();
            $("#cityid").append($('<option>').text("-Select City-"))
            data.map((item,i)=>{
                $("#cityid").append($('<option>').text(item.cityname).val(item._id));
            })
        })
    })

    $.getJSON("/movie/fetch_all_cinemas",function(data){
        var data=data.result;
        data.map((item,i)=>{
            $('#cinemaid').append($('<option>').text(item.cinemaname).val(item._id));
        })
    })  

    $('#cinemaid').change(function(){
        $.getJSON("/movie/fetch_all_screens",{cinemaid:$('#cinemaid').val()}, function(data){
            var data=data.result;
            $('#screenid').empty();
            $('#screenid').append($('<option>').text('-Select Screen-'));
            data.map((item,i)=>{
                $('#screenid').append($('<option>').text(item.screenname).val(item._id));
            })
        })
    })
})