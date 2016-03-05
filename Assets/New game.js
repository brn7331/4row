#pragma strict

var righe:int;
var colonne:int;
var matrix:int[,];
var dimensioni:int;
var ia:boolean;
var player:int;
var add_i:int;
var add_j:int;
var level:int;
var intestazione:int;
var endString:String;
var end:boolean=false;
var wBox:int;
var hBox:int;						

	var max:int=4;
																																																		
																																																																																																																																																						// START
function Start () {
	var i:int;
	var j:int;
	wBox=150;
	hBox=45;
	
	intestazione=2;
	righe=PlayerPrefs.GetInt("Righe");
	colonne=PlayerPrefs.GetInt("Colonne");
	dimensioni=1;
	ia=true;
	player=1;
	level=PlayerPrefs.GetInt("Difficolta");
						
	//azzero la matrice
	matrix = new int[righe,colonne];
	for(i=0;i<righe;i++){
		for(j=0;j<colonne;j++){
			matrix[i,j]=0;
		}
	}
	

	
}



																												// GUI
function OnGUI () {
	var larghezza:double = Screen.width/colonne;
	var altezza:double = Screen.height/(righe+intestazione);
	var i:int;
	var j:int; 
	
	
	//move ia
	

	
	
	if (GUI.Button (Rect (0, 0, wBox, hBox), "Menù")) {
			Application.LoadLevel("Set");
	}

	if (GUI.Button (Rect (wBox, 0, wBox, hBox), "Retry")) {
		Application.LoadLevel("game");
	}		

	GUI.Box(Rect (wBox*2.2, 0, wBox*2, hBox), endString);


	
	for(i=0;i<righe;i++){
		for(j=0;j<colonne;j++){
			if (GUI.Button (Rect (larghezza*j, altezza*(i+intestazione), larghezza, altezza), Show(matrix[i,j]))) {
				
				
				
				//move player
				matrix=Add(i,j,matrix,player);
				AI_col(matrix,1,player*-1);
				/*
				var output:String="";
				var k:int; 
				var ai:int[]=AI_col(matrix,1,player*-1);
				for(k=0;k<colonne;k++){
					output+=ai[k]+" ";
				}
				print(output);print("--------------------");
				*/
				
				
				if(Check(matrix)){
					print(Show(WhoWin(matrix)) + " ha vinto!!!");
					endString= Show(WhoWin(matrix))+" ha vinto!";
					end=true;
				}
				player*=-1;
						
																								
																																												
			}
		}
	}



}






///////////////////////////
////////	AI		///////
///////////////////////////

function AI_col(matrix_temp:int[,], level:int, player:int):int[]{
	
	var colonne_possibili:int[];
	colonne_possibili = new int[colonne];
		var j:int;
		for(j=0;j<colonne;j++){
			colonne_possibili[j]=0;
		}
		
		
	var n:int;
	
	if(level==0){

		
	}else{
		for(n=0;n<colonne;n++){
			if(Check(Add(0,n,matrix_temp,player))){
				colonne_possibili[n]=level;
			}else{
				colonne_possibili[n]=0;//AI_col(matrix,1,player*-1);
			}
		}
		
		
	}
	
	
	return colonne_possibili;
	
}




function is_There_Any(array:int[],val:int):boolean{
	var condition:boolean=false;
	var j:int;
	for(j=0;j<array.Length;j++){
		if(array[j]==val){
			condition=true;
		}
	}
	
	return condition;
}

function rand_Array(array:int[],val:int):int{
	var rand:int;
	rand=Random.Range(0,array.Length);

	while (array[rand]!=val){
		rand=Random.Range(0,array.Length);
	}	

	return rand;
}


///////////////////////////
////////	CHECK	///////
///////////////////////////

function Check(matrix_temp:int[,]):boolean{
	var cond:boolean=false;
	
	if(Check_player(matrix_temp,1)){
		cond=true;
	}else if(Check_player(matrix_temp,-1)){
		cond=true;
	}
	
	return cond;
}

function WhoWin(matrix_temp:int[,]):int{
	var winner:int=0;
	if(Check_player(matrix_temp,1)){
		winner=1;
	}
	if(Check_player(matrix_temp,-1)){
		winner=-1;
	}
	return winner;
}

function Check_player(matrix_temp:int[,],player_temp:int):boolean{
	var count:int=0;
	var m:int;
	var n:int;
	var cond:boolean=false;
	//controlla le righe
	count=0;
	for(m=0;m<righe;m++){
		for(n=0;n<colonne;n++){
			if(matrix_temp[m,n]==player_temp){
				count++;
				if(count==max){cond=true;}
			}else{
				count=0;
			}
		}
	}
	//controlla le colonne
	count=0;
	for(n=0;n<colonne;n++){
		for(m=0;m<righe;m++){
			if(matrix_temp[m,n]==player_temp){
				count++;
				if(count==max){cond=true;}
			}else{ count=0;}
		}
	}
	
	//diagonale \
	m=0;n=0;
	for(m=0;m<righe;m++){
		if (check_sub(m,n,matrix_temp, player_temp, 1)){
			cond=true;
		}
	}


	m=0;n=0;
	for(n=0;n<colonne;n++){
		if (check_sub(m,n,matrix_temp, player_temp, 1)){
			cond=true;
		}
	}	
	

	
	//diagonale /
	m=0;n=0;
	for(m=0;m<righe;m++){
		if (check_sub(m,n,matrix_temp, player_temp, 1)){
			cond=true;
		}
	}

	m=righe-1;n=0;
	for(n=0;n<colonne;n++){
		if (check_sub(m,n,matrix_temp, player_temp, -1)){
			cond=true;
		}
	}
	
	
	return cond;

}


function check_sub(m:int,n:int,matrix:int[,], player:int, add:int):boolean{
	var count:int=0;
	var cond:boolean=false;
	
	while((m<righe)&&(n<colonne)&&(m>=0)&&(n>=0)){
		if(matrix[m,n]==player){
			count++;
			if(count==max){cond=true;}
		}else{count=0;}
		m+=add;n+=1;
	}
	return cond;
}


///////////////////////////
////////	ADD		///////
///////////////////////////
																												// ADD
function Add(m:int,n:int,matrix:int[,],player:int):int[,]{

	var matrix_temp:int[,];
	matrix_temp = new int[righe,colonne];
	System.Array.Copy (matrix, matrix_temp, matrix.GetLength(0)*matrix.GetLength(1));


	if(dimensioni==1){
		for(m=righe-1;m>=0;m--){
			if(matrix_temp[m,n]==0){
				matrix_temp[m,n]=player;
				m=-1; //ottimizzazione
			}
		}
	}
	
	return matrix_temp;
}

///////////////////////////
////////	SHOW	///////
///////////////////////////

function Show(val:int):String{ 
	var res:String;
	
	if(val==0){
		res="";
	} else if(val==1){
		res="X";
	} else if(val==-1){
		res="O";
	}
	
	return res;
}



