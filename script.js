let confirmlist = [];
//function to get date as a input and then return the message sent back 

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
            
        }  
      }      
    }

    // Calendar Code
    // 
    // 
    // 
    // 
    // 
    // 
    var app = angular.module('dateTimeApp', []);

app.controller('dateTimeCtrl', function ($scope) {
	var ctrl = this;
	
	ctrl.selected_date = new Date();
	ctrl.selected_date.setHours(10);
	ctrl.selected_date.setMinutes(0);
	ctrl.updateDate = function (newdate) {
		// Do something with the returned date here.
	};
});

// Date Picker
app.directive('datePicker', function ($timeout, $window) {
    return {
        restrict: 'AE',
        scope: {
            selecteddate: "=",
            updatefn: "&",
            open: "=",
            datepickerTitle: "@",
            customMessage: "@",
            picktime: "@",
            pickdate: "@",
            pickpast: '=',
			mondayfirst: '@'
        },
		transclude: true,
        link: function (scope, element, attrs, ctrl, transclude) {
			transclude(scope, function(clone, scope) {
				element.append(clone);
			});
			
            if (!scope.selecteddate) {
                scope.selecteddate = new Date();
            }

            if (attrs.datepickerTitle) {
                scope.datepicker_title = attrs.datepickerTitle;
            }

            scope.days = [
                { "long":"Sunday","short":"Sun" },
                { "long":"Monday","short":"Mon" },
                { "long":"Tuesday","short":"Tue" },
                { "long":"Wednesday","short":"Wed" },
                { "long":"Thursday","short":"Thu" },
                { "long":"Friday","short":"Fri" },
                { "long":"Saturday","short":"Sat" },
            ];
			if (scope.mondayfirst == 'true') {
				var sunday = scope.days[0];
				scope.days.shift();
				scope.days.push(sunday);
			}

            scope.monthNames = [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ];

            function getSelected() {
                if (scope.currentViewDate.getMonth() == scope.localdate.getMonth()) {
                    if (scope.currentViewDate.getFullYear() == scope.localdate.getFullYear()) {
                        for (var number in scope.month) {
                            if (scope.month[number].daydate == scope.localdate.getDate()) {
                                scope.month[number].selected = true;
								if (scope.mondayfirst == 'true') {
									if (parseInt(number) === 0) {
										number = 6;
									} else {
										number = number - 1;
									}
								}
								scope.selectedDay = scope.days[scope.month[number].dayname].long;
                                
							}
                        }
                    }
                }
                // below code will get the selected day and print it to the div 

                // document.getElementById("demo").innerHTML = scope.localdate.getDate();


                        //appending a month to day
                        //assign a variable to day
                        var justDate = scope.localdate.getDate();
                        const slackVar = '/';
                        var addZero = "0";

                        if(justDate > 9){
                            var a = justDate + slackVar;
                        }else{
                            
                            var a = addZero + justDate + slackVar;
                        }
                        
                      
                        //turn string month into int
                        var numMonth = parseInt(scope.localdate.getMonth());
                        //increment the number to account of an array
                        var b = numMonth + 1;
                       

                        if(b.length > 1){
                            var b = numMonth + 1;
                        }else{
                            var b = numMonth + 1;
                            var b = addZero + b;
                        }

                        //concat the day and month
                        var c = a + b;



                        //concat the day/month + year
                        var d = c + slackVar;
                        var fullDate = d + scope.localdate.getFullYear();
                        
                        //appending a year to the day and month
                        //Create the full date
                         
                
                
                var getQuotes = "https://cafhb8mj5a.execute-api.ap-southeast-2.amazonaws.com/v1/client-bookings/{id}";
                // code to call an api to get the dummy quotes 
                  // instantiate a headers object
                    var myHeaders = new Headers();
                    // add content type header to object
                    myHeaders.append("Accept", "application/json");

                    let req = new Request(getQuotes,{
                        method: 'GET',
                        headers: myHeaders,
                        mode: 'cors'
                    })


                    //Fetches the requested Data 

                    const response = fetch(req)
                    .then((response)=>{
                        if(response.ok){

                    


                            //Data is being receieved from the DB
                            return response.json();

                        }else{
                            throw new Error('Badd');
                        }
                    })
                    .then((jsonData)=>{


                        

                        // loads the input data into a list to be used later as an Object needs Stringify for Times
                        let dataArray = JSON.parse(jsonData.body );


                  
    
                        const filteredData = dataArray.filter(item => item.id === fullDate);
                        console.log("datePicked" +  fullDate);
                        console.log(filteredData);


                        var storedTimesObj = [];
                        var storedTimesStr = [];


                         // delete the div elements
                         const container = document.getElementById('container');

                         while (container.firstChild) {
                           container.removeChild(container.firstChild);
                         }

                        var found = false;

                        for(var i = 0; i < filteredData.length; i++) {
                           
                            
                           if(filteredData[i].id == fullDate){

                                

                                found = true;
                                //turns the object into an array called storedTimes when the right record is found 
                                storedTimesObj = Array.from(filteredData[i].Times);
                               
                             
                                //checks that the length of the array is not 0 ie availbale dates
                                if(storedTimesObj.length>0){

                               

                                    //conversts the objects to strings then puts them in array 
                                    for(var i = 0; i < storedTimesObj.length; i++){
                                        let timeNow = storedTimesObj[i];
                                        
                                        if(timeNow.length == 5){
                                            
                                            var pmSub = " PM AEDT";
                                            var pmString = timeNow.concat(pmSub);
                                            

                                            storedTimesStr.push(pmString);
                                        }else{
                                           
                                            var amSub = " AM AEDT";
                                            var amString = timeNow.concat(amSub);
                                         

                                            storedTimesStr.push(amString);
                                        }
                                    
                                    
                                    };

                                    
                                    // then dynamically create divs 
                                    const container = document.getElementById('container');

                                    const newDiv = document.createElement('div');
                                   


                                    //assign it error text
                                    const textError = 'Available times with Chef David:';
                               
                                    newDiv.innerHTML = textError;
                                    

                                    

                                    //assign it a class name
                                    newDiv.className = 'successClass';
    
                                    newDiv.style.border="white";
                                    newDiv.style.marginLeft="4px";
                                    newDiv.style.marginLeft="14  %";
       
                                    //append the created div to the body 
                                    container.appendChild(newDiv);






                                    storedTimesStr.forEach(element => {
                                    const div = document.createElement('div');
                            
                                    div.innerHTML = element;
                                    
                                    
                               
                                    //makes the created div clickable 
                                    div.addEventListener('click', function() {
                                       
                                        //push to global list date and time to send  
                                        confirmlist.push(fullDate);
                                        confirmlist.push(element);

                                        
                                        localStorage.setItem("1", fullDate);
                                        localStorage.setItem("2", element);
                                        window.open("confirmBooking.html", "_self");
                
                                    });
                                    div.style.backgroundColor = "rgb(201, 235, 255)";
                                    div.style.border = "white";
                                    div.style.width = "50%";
                                    div.style.textAlign = "center";
                                    div.style.fontSize = "18px";
                                    div.style.marginLeft ="25%";
                                    
                                    container.appendChild(div);
                                    });
                                }
                                
                           } 


                                    
                          

                           //clear first array
                            storedTimesObj = []
                            //clear second array 
                            storedTimesStr = []                        
                        }

                        if(found != true){
                            

                            //define where you want the message
                            const container = document.getElementById('container');

                            //define a new div element 
                            const newDiv = document.createElement('div');


                            //assign it error text
                            const textError = 'Oh no! It appears we dont have any available times for the day you chose';

                            newDiv.innerHTML = textError;

                            //assign it a class name
                            newDiv.className = 'errorClass';


                            newDiv.style.border="white";
                            newDiv.style.marginLeft="4px";

                            //append the created div to the body 
                            container.appendChild(newDiv);

                
                        }
                        

                       

                        
                            
                       
                        
                    })
                    .catch((err)=>{
                        console.log("ERROR",  err.message);
                    })
            }
            

            function getDaysInMonth() {
                var month = scope.currentViewDate.getMonth();
                var date = new Date(scope.currentViewDate.getFullYear(), month, 1);
                var days = [];
                var today = new Date();
                while (date.getMonth() === month) {
                    var showday = true;
                    if (!scope.pickpast && date < today) {
                        showday = false;
                    }
                    if (today.getDate() == date.getDate() &&
                        today.getYear() == date.getYear() &&
                        today.getMonth() == date.getMonth()) {
                        showday = true;
                    }
                    var day = new Date(date);
                    var dayname = day.getDay();
                    var daydate = day.getDate();
                    days.push({ 'dayname': dayname, 'daydate': daydate, 'showday': showday });
                    date.setDate(date.getDate() + 1);
                }
                scope.month = days;
            }

            function initializeDate() {
                scope.currentViewDate = new Date(scope.localdate);
                scope.currentMonthName = function () {
                    return scope.monthNames[scope.currentViewDate.getMonth()];
                };
                getDaysInMonth();
                getSelected();
            }

            // Takes selected time and date and combines them into a date object
            function getDateAndTime(localdate) {
                var time = scope.time.split(':');
                if (scope.timeframe == 'am' && time[0] == '12') {
                    time[0] = 0;
                } else if (scope.timeframe == 'pm' && time[0] !== '12') {
                    time[0] = parseInt(time[0]) + 12;
                }
                return new Date(localdate.getFullYear(), localdate.getMonth(), localdate.getDate(), time[0], time[1]);                
            }

            // Convert to UTC to account for different time zones
            function convertToUTC(localdate) {
                var date_obj = getDateAndTime(localdate);
                var utcdate = new Date(date_obj.getUTCFullYear(), date_obj.getUTCMonth(), date_obj.getUTCDate(), date_obj.getUTCHours(), date_obj.getUTCMinutes());
                return utcdate;
            }
            // Convert from UTC to account for different time zones
            function convertFromUTC(utcdate) {
                localdate = new Date(utcdate);
                return localdate;
            }

            // Returns the format of time desired for the scheduler, Also I set the am/pm
            function formatAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                hours >= 12 ? scope.changetime('pm') : scope.changetime('am');
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = hours + ':' + minutes;
                return strTime;
            }
			
            scope.$watch('open', function() {
                if (scope.selecteddate !== undefined && scope.selecteddate !== null) {
                    scope.localdate = convertFromUTC(scope.selecteddate);
                } else {
                    scope.localdate = new Date();
                    scope.localdate.setMinutes(Math.round(scope.localdate.getMinutes() / 60) * 30);
                }
				scope.time = formatAMPM(scope.localdate);
				scope.setTimeBar(scope.localdate);
				initializeDate();
				scope.updateInputTime();
            });

            scope.selectDate = function (day) {

                if (scope.pickdate == "true" && day.showday) {
                    for (var number in scope.month) {
                        var item = scope.month[number];
                        if (item.selected === true) {
                            item.selected = false;
                        }
                    }
                    day.selected = true;
                    scope.selectedDay = scope.days[day.dayname].long;
                    scope.localdate = new Date(scope.currentViewDate.getFullYear(), scope.currentViewDate.getMonth(), day.daydate);
                    initializeDate(scope.localdate);
                    scope.updateDate();
                }
            };

            scope.updateDate = function () {
                if (scope.localdate) {
                    var newdate = getDateAndTime(scope.localdate);
                    scope.updatefn({newdate:newdate});
                }
            };

            scope.moveForward = function () {
                scope.currentViewDate.setMonth(scope.currentViewDate.getMonth() + 1);
                if (scope.currentViewDate.getMonth() == 12) {
                    scope.currentViewDate.setDate(scope.currentViewDate.getFullYear() + 1, 0, 1);
                }
                getDaysInMonth();
                getSelected();
            };

            scope.moveBack = function () {
                scope.currentViewDate.setMonth(scope.currentViewDate.getMonth() - 1);
                if (scope.currentViewDate.getMonth() == -1) {
                    scope.currentViewDate.setDate(scope.currentViewDate.getFullYear() - 1, 0, 1);
                }
                getDaysInMonth();
                getSelected();
            };

            scope.calcOffset = function (day, index) {
                if (index === 0) {
                    var offset = (day.dayname * 14.2857142) + '%';
					if (scope.mondayfirst == 'true') {
						offset = ((day.dayname - 1) * 14.2857142) + '%';
					}
                    return offset;
                }
            };
            
			///////////////////////////////////////////////
			// Check size of parent element, apply class //
			///////////////////////////////////////////////
			scope.checkWidth = function (apply) {
				var parent_width = element.parent().width();
				if (parent_width < 620) {
					scope.compact = true;
				} else {
					scope.compact = false;
				}
				if (apply) {
					scope.$apply();
				}
			};
			scope.checkWidth(false);
			
            //////////////////////
            // Time Picker Code //
            //////////////////////
            if (scope.picktime) {
                var currenttime;
                var timeline;
                var timeline_width;
                var timeline_container;
                var sectionlength;

                scope.getHours = function () {
                    var hours = new Array(11);
                    return hours;
                };

                scope.time = "12:00";
                scope.hour = 12;
                scope.minutes = 0;
                scope.currentoffset = 0;

                scope.timeframe = 'am';

                scope.changetime = function(time) {
                    scope.timeframe = time;
                    scope.updateDate();
					scope.updateInputTime();					
                };
				
				scope.edittime = {
					digits: []
				};
				
				scope.updateInputTime = function () {
					scope.edittime.input = scope.time + ' ' + scope.timeframe;
					scope.edittime.formatted = scope.edittime.input;
				};
				
				scope.updateInputTime();
				
				function checkValidTime (number) {
					validity = true;
					switch (scope.edittime.digits.length) {
						case 0:
							if (number === 0) {
								validity = false;
							}
							break;
						case 1:
							if (number > 5) {
								validity = false;
							} else {
								validity = true;
							}
							break;
						case 2:
							validity = true;
							break;
						case 3:
							if (scope.edittime.digits[0] > 1) {
								validity = false;
							} else if (scope.edittime.digits[1] > 2) {
								validity = false;
							} else if (scope.edittime.digits[2] > 5) {
								validity = false;
							}
							else {
								validity = true;								
							}
							break;
						case 4:
							validity = false;
							break;
					}
					return validity;
				}
				
				function formatTime () {
					var time = "";
					if (scope.edittime.digits.length == 1) {
						time = "--:-" + scope.edittime.digits[0];
					} else if (scope.edittime.digits.length == 2) {
						time = "--:" + scope.edittime.digits[0] + scope.edittime.digits[1];
					} else if (scope.edittime.digits.length == 3) {
						time = "-" + scope.edittime.digits[0] + ':' + scope.edittime.digits[1] + scope.edittime.digits[2];
					} else if (scope.edittime.digits.length == 4) {
						time = scope.edittime.digits[0] + scope.edittime.digits[1].toString() + ':' + scope.edittime.digits[2] + scope.edittime.digits[3];
						
					}
					return time + ' ' + scope.timeframe;
				};
				
				scope.changeInputTime = function (event) {
					var numbers = {48:0,49:1,50:2,51:3,52:4,53:5,54:6,55:7,56:8,57:9};
					if (numbers[event.which] !== undefined) {
						if (checkValidTime(numbers[event.which])) {
							scope.edittime.digits.push(numbers[event.which]);
						
							scope.time_input = formatTime();
							scope.time = numbers[event.which] + ':00';
							scope.updateDate();
							scope.setTimeBar();
						}
					} else if (event.which == 65) {
						scope.timeframe = 'am';
						scope.time_input = scope.time + ' ' + scope.timeframe;
					} else if (event.which == 80) {
						scope.timeframe = 'pm';
						scope.time_input = scope.time + ' ' + scope.timeframe;
					} else if (event.which == 8) {
						scope.edittime.digits.pop();
						scope.time_input = formatTime();
					
					}
					scope.edittime.formatted = scope.time_input;
					// scope.edittime.input = formatted;
				};
				
                var pad2 = function (number) {
                    return (number < 10 ? '0' : '') + number;
                };
           
                scope.moving = false;
                scope.offsetx = 0;
                scope.totaloffset = 0;
                scope.initializeTimepicker = function () {
                    currenttime = $('.current-time');
                    timeline = $('.timeline');
                    if (timeline.length > 0) {
                        timeline_width = timeline[0].offsetWidth;
                    }
                    timeline_container = $('.timeline-container');
                    sectionlength = timeline_width / 24 / 6;
                };

                angular.element($window).on('resize', function () {
                    scope.initializeTimepicker();
                    if (timeline.length > 0) {
                        timeline_width = timeline[0].offsetWidth;
                    }
                    sectionlength = timeline_width / 24;
					scope.checkWidth(true);
                });
           
                scope.setTimeBar = function (date) {
					currenttime = $('.current-time');
					var timeline_width = $('.timeline')[0].offsetWidth;
                    var hours = scope.time.split(':')[0];
					if (hours == 12) {
						hours = 0;
					}
					var minutes = scope.time.split(':')[1];
					var minutes_offset = (minutes / 60) * (timeline_width / 12);
					var hours_offset = (hours / 12) * timeline_width;
					scope.currentoffset = parseInt(hours_offset + minutes_offset - 1);
                    currenttime.css({
						transition: 'transform 0.4s ease',
                        transform: 'translateX(' + scope.currentoffset + 'px)',
                    });
                };

                scope.getTime = function () {
                    // get hours
                    var percenttime = (scope.currentoffset + 1) / timeline_width;
                    var hour = Math.floor(percenttime * 12);
                    var percentminutes = (percenttime * 12) - hour;
					var minutes = Math.round((percentminutes * 60) / 5) * 5;
                    if (hour === 0) {
                        hour = 12;
                    }
					if (minutes == 60) {
						hour += 1;
						minutes = 0;
					}

                    scope.time = hour + ":" + pad2(minutes);
					scope.updateInputTime();
                    scope.updateDate();
                };
           
                var initialized = false;

                element.on('touchstart', function() {
                    if (!initialized) {
                        element.find('.timeline-container').on('touchstart', function (event) {
                            scope.timeSelectStart(event);
                        });
                        initialized = true;
                    }
                });

                scope.timeSelectStart = function (event) {
                    scope.initializeTimepicker();
                    var timepicker_container = element.find('.timepicker-container-inner');
					var timepicker_offset = timepicker_container.offset().left;
                    if (event.type == 'mousedown') {
                        scope.xinitial = event.clientX;
                    } else if (event.type == 'touchstart') {
                        scope.xinitial = event.originalEvent.touches[0].clientX;
                    }
                    scope.moving = true;
                    scope.currentoffset = scope.xinitial - timepicker_container.offset().left;
                    scope.totaloffset = scope.xinitial - timepicker_container.offset().left;
				
					if (scope.currentoffset < 0) {
						scope.currentoffset = 0;
					} else if (scope.currentoffset > timepicker_container.width()) {
						scope.currentoffset = timepicker_container.width();
					}
					currenttime.css({
                        transform: 'translateX(' + scope.currentoffset + 'px)',
                        transition: 'none',
                        cursor: 'ew-resize',
                    });
                    scope.getTime();
                };
           
                angular.element($window).on('mousemove touchmove', function (event) {
                    if (scope.moving === true) {
                        event.preventDefault();
                        if (event.type == 'mousemove') {
                            scope.offsetx = event.clientX - scope.xinitial;
                        } else if (event.type == 'touchmove') {
                            scope.offsetx = event.originalEvent.touches[0].clientX - scope.xinitial;
                        }
                        var movex = scope.offsetx + scope.totaloffset;
                        if (movex >= 0 && movex <= timeline_width) {
                            currenttime.css({
                                transform: 'translateX(' + movex + 'px)',
                            });
                            scope.currentoffset = movex;
                        } else if (movex < 0) {
                            currenttime.css({
                                transform: 'translateX(0)',
                            });
                            scope.currentoffset = 0;
                        } else {
                            currenttime.css({
                                transform: 'translateX(' + timeline_width + 'px)',
                            });
                            scope.currentoffset = timeline_width;
                        }
                        scope.getTime();
                        scope.$apply();
                    }
                });
           
                angular.element($window).on('mouseup touchend', function (event) {
                    if (scope.moving) {
                        // var roundsection = Math.round(scope.currentoffset / sectionlength);
                        // var newoffset = roundsection * sectionlength;
                        // currenttime.css({
                        //     transition: 'transform 0.25s ease',
                        //     transform: 'translateX(' + (newoffset - 1) + 'px)',
                        //     cursor: 'pointer',
                        // });
                        // scope.currentoffset = newoffset;
                        // scope.totaloffset = scope.currentoffset;
                        // $timeout(function () {
                        //     scope.getTime();
                        // }, 250);
                    }
                    scope.moving = false;
                });

                scope.adjustTime = function (direction) {
                    event.preventDefault();
                    scope.initializeTimepicker();
                    var newoffset;
                    if (direction == 'decrease') {
                        newoffset = scope.currentoffset - sectionlength;
                    } else if (direction == 'increase') {
                        newoffset = scope.currentoffset + sectionlength;
                    }
                    if (newoffset < 0 || newoffset > timeline_width) {
                        if (newoffset < 0) {
                            newoffset = timeline_width - sectionlength;
                        } else if (newoffset > timeline_width) {
                            newoffset = 0 + sectionlength;
                        }
                        if (scope.timeframe == 'am') {
                            scope.timeframe = 'pm';
                        }
                        else if (scope.timeframe == 'pm') {
                            scope.timeframe = 'am';
                        }
                    }
                    currenttime.css({
                        transition: 'transform 0.4s ease',
                        transform: 'translateX(' + (newoffset - 1) + 'px)',
                    });
                    scope.currentoffset = newoffset;
                    scope.totaloffset = scope.currentoffset;
                    scope.getTime();
                };
            }

            // End Timepicker Code //

        }
    };
});






//retreives customer picked time and date from local storage must remain as 1 & 2 to show index  
const datePicked = localStorage.getItem("1");
const timePicked = localStorage.getItem("2");

//puts the data in a list to be used and displayed 
confirmlist.push(datePicked);
confirmlist.push(timePicked);

//The data shows the datepicked variable is the data and the time picked variable is the time 

// then dynamically create divs 
const container = document.getElementById('confirmContainer');

// const textDiv = document.createElement('div');

const datePickedDiv = document.querySelector(".date-picked");
if(datePickedDiv) {
  datePickedDiv.innerHTML = datePicked;
}

const timePickedDiv = document.querySelector(".time-picked");
if(timePickedDiv) {
    timePickedDiv.innerHTML = timePicked;
}


// textDiv.innerHTML = "Reservation details";

// container.appendChild(textDiv);


                    

// const newDiv = document.createElement('div');





// confirmlist.forEach(element => {
//     const dateDiv = document.getElementById("date-picked");

//     dateDiv.innerHTML = element;

//     container.appendChild(dateDiv);
// });




// define the callAPI function to send confirmation data to api 

// const sendButton = document.getElementById('submitButton');

// sendButton.addEventListener('click', callAPI);


const button = document.getElementById('myButton');
button.addEventListener('click', callAPI);


function callAPI () {



    //chat GPT code 
    var fName = document.getElementById("first-name").value;
    var lName = document.getElementById("last-name").value;
    var phNum = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
 

    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({ "firstName": fName, "lastName": lName, "email": email, "phone": phNum, "date": datePicked, "time": timePicked });
    // create a JSON object with parameters for API call and store in a variable
    

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://cafhb8mj5a.execute-api.ap-southeast-2.amazonaws.com/v1/client-bookings", requestOptions)
    .then(response => response.json())
    .then(result => {
     
    })
    .catch(error => console.log('error', error));
  }



