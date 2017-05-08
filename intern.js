var allteams = ["Arsenal (ENG)", "Astana (KAZ)", "Atlético (ESP)", "BATE (BLR)", "CSKA Moskva (RUS)", "Dinamo Zagreb (CRO)", "Dynamo Kyiv (UKR)", "Galatasaray (TUR)", "Gent (BEL)", "Leverkusen (GER)", "Lyon (FRA)", "M. Tel-Aviv (ISR)", "Malmö (SWE)", "Man. City (ENG)", "Man. United (ENG)", "Mönchengladbach (GER)", "Olympiacos (GRE)", "Porto (POR)", "Real Madrid (ESP)", "Roma (ITA)", "Sevilla (ESP)", "Shakhtar Donetsk (UKR)", "Valencia (ESP)", "Wolfsburg (GER)","Barcelona (ESP)", "Bayern (GER)", "Benfica (POR)", "Chelsea (ENG)", "Juventus (ITA)", "Paris (FRA)", "PSV (NED)", "Zenit (RUS)"] 
var teams = ["Arsenal (ENG)", "Astana (KAZ)", "Atlético (ESP)", "BATE (BLR)", "CSKA Moskva (RUS)", "Dinamo Zagreb (CRO)", "Dynamo Kyiv (UKR)", "Galatasaray (TUR)", "Gent (BEL)", "Leverkusen (GER)", "Lyon (FRA)", "M. Tel-Aviv (ISR)", "Malmö (SWE)", "Man. City (ENG)", "Man. United (ENG)", "Mönchengladbach (GER)", "Olympiacos (GRE)", "Porto (POR)", "Real Madrid (ESP)", "Roma (ITA)", "Sevilla (ESP)", "Shakhtar Donetsk (UKR)", "Valencia (ESP)", "Wolfsburg (GER)"];
var domesticLeagueCham = ["Barcelona (ESP)", "Bayern (GER)", "Benfica (POR)", "Chelsea (ENG)", "Juventus (ITA)", "Paris (FRA)", "PSV (NED)", "Zenit (RUS)"];



var teamsremain = teams.length;
var domesticLeagueChamremain = domesticLeagueCham.length;
var selectedTeam = "";
var teamArray = [];
var group = [];					// to hold 4 teams in single group
var groupSet = [];				// to hold 8 groups which contain 4 teams in it
var champTeamArray = [];
var teamValue;
var teamno = 1;
var count = 0;

//=========================//
//		   START		   //
//=========================//
window.onload = teamData();



// Adding respective JSON
function teamData(){

//reset all the previous value
reset();

//create JSON of all teams except domestic league champions.
for(var i=0;i<teams.length;i++){
     var teamdemo = teams[i].split("(");
	 var team = {"name":teamdemo[0].trim(),"country":teamdemo[1].substring(0,3),"img" : i+1}
	 teamArray.push(team);
}


//create JSON of domestic league champions.
for(var i=0;i<domesticLeagueCham.length;i++){
     var teamdemo = domesticLeagueCham[i].split("(");
	 var team = {"name":teamdemo[0].trim(),"country":teamdemo[1].substring(0,3),"img" : "s"+(i+1)}
	 champTeamArray.push(team);
}

// calling create group
createGroup();
}


// Reset all the previous value
function reset(){
teamsremain = teams.length;
domesticLeagueChamremain = domesticLeagueCham.length;
selectedTeam = "";
teamArray = [];
group = [];
groupSet = [];
count = 0;
champTeamArray = [];
teamno = 1;
}

//  teamgenerator//
//random number generator
function otherTeams(teamsremain){
	count++;
    var val = swap();							// calling swap to get random generated team
    if(selectedTeam.includes(val.country)){		// checking if same country is already in the group
    	if(count < 50)							// to control the endless loop
    		return otherTeams(teamsremain);
    	else
    		teamData();							// restart everything if no solution id found
    	}
    else{   	
    	selectedTeam += val.country;	// to add the name of different country
    	remove();						// removing the added team
    	return val;
    }
}

// swap
function swap(){
 var x = Math.floor(Math.random()*teamsremain);   // generating random number from the team remains except domestic league champions.
   
 	// swaping the generated team from last team in a set and removing the last value from the set to avoid repeatition
    var temp =	 teamArray[x];						  	
    teamArray[x] = teamArray[teamsremain-1];
    teamArray[teamsremain-1] = temp;
    return temp;	
}

// after adding the team in group remove it from the teamArray
function remove(){
	teamArray.pop();
    teamsremain--;
}


// champions teams //
// same logic as above but for the DLC teams

function mainTeam(domesticLeagueChamremain){
	var val = swapChamp();
	selectedTeam += val.country;
	removechamp();
	return val;
}

function swapChamp(){
	var x = Math.floor(Math.random()*domesticLeagueChamremain);
    var temp1 = champTeamArray[x];
    champTeamArray[x] = champTeamArray[domesticLeagueChamremain-1];
    champTeamArray[domesticLeagueChamremain-1] = temp1;
    return temp1;	
}


function removechamp(){
champTeamArray.pop();
if(domesticLeagueChamremain<0)
    domesticLeagueChamremain = 0;
else
domesticLeagueChamremain = domesticLeagueChamremain-1;
}





//--------------------------//
//      Creating Group      //
//--------------------------//
function createGroup(){
for (var i=0,j=0,teamno=1; i < allteams.length; i++) {
		if(j>3){									// checking the group size i.e. should be 4 in one group
			j=0;									
			teamno++								// increasing the team number	
			selectedTeam = "";
		}
		if(j==0){
			group = [];
			teamValue = mainTeam(domesticLeagueChamremain);		// calling the function to get random team from set of domestic league champions
			group.push(teamValue);							// adding it to a set of group which can only have max 4 teams
		}
		else{
			teamValue = otherTeams(teamsremain);		    // calling the function to get random team from other team set
			group.push(teamValue);							// adding it to group of 4
		}
		j++;
		if(j>3){
			groupSet.push(group);					// if group contains 4 teams then add those collection to groupset as index i
		}
		if(i===30){
			groupSet.push(group);					// adding it to check if last group has 2 set of teams with same country
		}
		if(i===31){
			var divMain = document.getElementById('div');
			divMain.innerHTML = ""							// if anypage is already created it will empty the page
			pageCreate();									// calling page create to create the display page 	
		}
}
}


//**********************************//
//   Creating the Display Page	    //
//*********************************//


function  pageCreate(){
	for(var i=0;i<8;i++){
		var divMain = document.getElementById('div');
		var div = document.createElement('div');
		div.id = teamno;
		div.className = "col-lg-3 col-md-3 col-sm-4";
		var ch = String.fromCharCode("A".charCodeAt(0)+i);
		div.innerHTML = "<li><span class = 'groupname'><b>Group "+ch+"</b></span></li>"
		for (var j = 0; j < 4; j++) {
			div.innerHTML += "<li><img src='img\\"+groupSet[i][j].img+".png' width='15' height = '15'>  "+groupSet[i][j].name+" <span class = 'countryname'>("+groupSet[i][j].country +")</span></li>"
		}
		divMain.appendChild(div);
	}
}	