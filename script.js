let list = [];
//function to get date as a input and then return the message rent back 
function getAvailability(){



  //Populate Drop down 



  var urlOG = "https://cafhb8mj5a.execute-api.ap-southeast-2.amazonaws.com/v1/availability";
 


  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Accept", "application/json");

  let req = new Request(urlOG,{
    method: 'GET',
    headers: myHeaders,
    mode: 'cors'
  })


//Fetches the requested Data 

  const response = fetch(req)
  .then((response)=>{
    if(response.ok){
      return response.json();
    }else{
      throw new Error('Badd ');
    }
  })
  .then((jsonData)=>{
   
    list = jsonData // loads the input data into a list to be used later as an Object needs Stringify for Times

    var select = document.getElementById("selectDate");
    //populate the drop down 
    for(var i = 0; i < list.length; i++) {
      var opt = list[i].id;
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }

   
    // document.getElementById("printHere").innerHTML = list[1].id;

  
  })
  .catch((err)=>{
    console.log("ERROR",  err.message);
  })



 
 
}

//function for the drop down to disply the choosen value 

function displayChoosenDate()
    {
      var select = document.getElementById("selectDate");
      var text = select.options[select.selectedIndex].text;
      
      for(var i = 0; i < list.length; i++) {
        
        if(text == list[i].id){

             var index = i;
             document.getElementById("printHere").innerHTML = JSON.stringify(list[index].Times);
        } 
        
      }
  

      
    }