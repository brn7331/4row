#pragma strict

var righe:int;
var colonne:int;
var larghezza:double;
var altezza:double;
var i:int;
var j:int;
var p :int;
var campi:int;
var fin_i:int;
var fin_j:int;
var matrix : int[,];
var player:int;
var player_human:int;
var ia:boolean;

function Start () {
	righe=6;		//deve essere pari!!!!!!!
	colonne=7;	
	campi=1;
	ia=false;
	matrix = new int[righe,colonne];
	player=1;
	player_human=1;

	for(i=0;i<righe;i++){
		for(j=0;j<colonne;j++){
			matrix[i,j]=0;
		}
	}
		
	

}


function Update () {

}



function OnGUI () {
 
	larghezza=Screen.width/colonne;
	altezza = Screen.height/righe;
	
	Tocco(0,1,matrix,player);
	
	if((ia)&&(player!=player_human)){
		matrix=Mossa(matrix,player);
		print("mossa ia");
		if(Check(fin_i,fin_j,matrix,4,player)){
			print(player + " ha vinto!!!");
		}
		player*=-1;
	}

	for(i=0;i<righe;i++){
		for(j=0;j<colonne;j++){
			if (GUI.Button (Rect (larghezza*j, altezza*i, larghezza, altezza), Show(i,j))) {
				
				if((player==player_human)||(ia==false)){
					matrix=Tocco(i,j,matrix,player);
					
					//controlla se righe/colonne/diagonali passanti per quel punto formano 4 player consecutivi
					if(Check(fin_i,fin_j,matrix,4,player)){
						print(player + " ha vinto!!!");
					}
					
					player*=-1;
				}
				



				
				
				
			}
		}
	}



}


function Mossa(matrix_mossa:int[,], player_temp:int):int[,]{
	var matrix_temp:int[,];
	var res:int[,];
	var end:boolean=false;
	matrix_temp=matrix_mossa;
	
	j=3;
	Tocco(0,j,matrix_mossa,player_temp);
	
	/*
	for(j=0;j<colonne;j++){
		matrix_temp=Tocco(0,j,matrix_mossa,player_temp);
		
		if(Check(fin_i,fin_j,matrix_temp,4,player_temp)){
			res = matrix_temp;
			end=true;
			print("cazzo");
		}else{
			matrix_temp=matrix_mossa;
			print("culo");
		}
		
		matrix_temp=matrix_mossa;
	}
	
	
	if(!end){
		res=Tocco(0,Random.Range(0,colonne),matrix_mossa,player_temp);

	}
	*/
	
	res=matrix;
	return res;
}






function Tocco(m:int,n:int,matrix_tocco:int[,], player_temp:int):int[,]{

	var matrix_tocco_temp:int[,];
	matrix_tocco_temp=matrix_tocco;

	if(campi==1){
		for(m=righe-1;m>=0;m--){
			if(matrix_tocco_temp[m,n]==0){
				matrix_tocco_temp[m,n]=player_temp;			fin_i=m; fin_j=n;
				m=-1;
			}
		}
	}

/*	
	if(campi==2){
		if(m+1>righe/2){
			for(m=righe-1;m>=0;m--){
				if(matrix_tocco_temp[m,n]==0){
					matrix_tocco_temp[m,n]=player_temp;		fin_i=m; fin_j=n;
					m=-1;
				}
			}
		}else{
		
			for(m=0;m<righe;m++){
				if(matrix_tocco_temp[m,n]==0){
					matrix_tocco_temp[m,n]=player_temp;		fin_i=m; fin_j=n;
					m=righe;
				}
			}		
		
		}
	}	
*/	
	return matrix_tocco_temp;
}



function Check(p:int,q:int,matrix_check:int[,],max:int,player_temp:int):boolean{
	var count:int=0;
	var m:int;
	var n:int;
	var cond:boolean=false;
	var matrix_temp:int[,];
	matrix_temp=matrix_check;
	//controlla le righe
	count=0;
	m=p;
	for(n=0;n<colonne;n++){
		if(matrix_temp[m,n]==player_temp){
			count++;
			if(count==max){cond=true;}
		}else{
			count=0;
		}
	}
	
	

	//controlla le colonne
	count=0;
	n=q;
	for(m=0;m<righe;m++){
		if(matrix_temp[m,n]==player_temp){
			count++;
			if(count==max){cond=true;}
		}else{ count=0;}
	}
	
	
	
	//diagonale \
	count=0;
	m=p;
	n=q;
	while((m>0)&&(n>0)){
		 m--;
		 n--;
	}
	
	while((m<righe)&&(n<colonne)){
		if(matrix_temp[m,n]==player_temp){
			count++;
			if(count==max){cond=true;}
		}else{ count=0;}
		m++;
		n++;
	}
	
	//diagonale /
	count=0;
	m=p;
	n=q;
	while((m<righe-1)&&(n>0)){
		 m++;
		 n--;
	}
	while((m>0)&&(n<colonne)){
		if(matrix_temp[m,n]==player_temp){
			count++;
			if(count==max){cond=true;}
		}else{ count=0;}
		m--;
		n++;
	}
	
	
	return cond;

}





function Show(s:int,t:int):String{ //print(i);print(j);
	var res:String;
	if(matrix[s,t]==0){
		res="";
	}
	if(matrix[s,t]==1){
		res="X";
	}
	if(matrix[s,t]==-1){
		res="O";
	}
	return res;
}





