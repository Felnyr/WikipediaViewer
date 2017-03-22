$(document).ready(function(){
  
  $(document).keypress(function(e){
    if(e.which == 13) {
     $("#btn_search").click()
    }
  });
$("#btn_search").on("click", function(){
  var SearchValue = $("#input").val();
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+SearchValue;
  $("#display").empty();
  $.ajax({   
    url: url,
    type:"GET",
    dataType:"jsonp",
    async:false,
    success: function(data){
      for(var i=0;i<data[1].length;i++){
      $("#display").append("<div id=\"term"+i+"\"><a href=\""+data[3][i]+"\" target=\"_blank\">"+data[1][i]+"</a><br>"+data[2][i]+"</div>");
      $('#term'+i).hide();
      }
      
      //Random Color&slide script 

      for(var i=0;i<data[1].length;i++){
      $("#term"+i).css("background-color", "#"+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10));
      $("#term"+i).css("border-radius","6px");
      $("#term"+i).show(200*i+300);  
      }
      
    },
    error: function(error){
      alert("You typed nothing");    
    }
    
  }); // ajax req end for normal search
});//btn search end

$("#btn_rand").on("click", function(){
  $("#display").empty();
  $.ajax({
    type: "GET",
    url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&grnlimit=5&prop=extracts&exsentences=5&exintro=true&exlimit=5excontinue=1",
    dataType: "jsonp",
    async: true,
    success:function(randId){ 
     
     console.log(Object.values(randId.query.pages));
     var randId2 = Object.values(randId.query.pages);
     $.each(randId2, function(index, val) {
     $("#display").append("<div id=\"term"+index+"\"><p><a href=\"https://en.wikipedia.org/?curid="+val.pageid+"\" target=\"_blank\">"+val.title+"</a></p><p>"+val.extract+"</p></div>");
     $('#term'+index).hide();  
       
     //Random Color&slide script 

      for(var i=0;i<5;i++){
      $("#term"+i).css("background-color", "#"+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10));
      $("#term"+i).css("border-radius","6px");
      $("#term"+i).show(200*i+300);  
      }
       
    }) //end ajax for random         
    },
    error:function(errorRand){
     alert("Cannot load articles. Try again");
    }
  });

  
});//btn rand end  
});//doc ready end