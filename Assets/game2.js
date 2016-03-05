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

function Start () {
	var i:int;
	var j:int;
	
	righe=7;
	colonne=7;
	dimensioni=1;
	ia=true;
	player=1;
	level=2;
						
	//azzero la matrice
	matrix = new int[righe,colonne];
	for(i=0;i<righe;i++){
		for(j=0;j<colonne;j++){
			matrix[i,j]=0;
		}
	}
	

	
}




function OnGUI () {
	var larghezza:double=Screen.width/colonne;
	var altezza:double = Screen.height/righe;
	var i:int;
	var j:int; 
	
	if((player==-1)&&(ia==true)){
		matrix=AI(matrix,player);
		if(Check(add_i,add_j,matrix,4,player)){
			print(player + " ha vinto!!!");
		}
		player*=-1;
	}	
	
	
	if (GUI.Button (Rect (larghezza*1, 0, larghezza, altezza), "Menù")) {
			
	}
	
	for(i=2;i<righe;i++){
		for(j=0;j<colonne;j++){
			if (GUI.Button (Rect (larghezza*j, altezza*i, larghezza, altezza), Show(matrix[i,j]))) {
				
				if((player==1)||(ia==false)){
					if(Isvalid(i,j,matrix)){
						matrix=Add(i,j,matrix,player);
						if(Check(add_i,add_j,matrix,4,player)){
							print(player + " ha vinto!!!");
						}
						player*=-1;
					}
				}
				
										
			}
		}
	}



}

















function Win(i:int,j:int,matrix:int[,], player:int):boolean{
	var res:boolean=false;
	var matrix_temp:int[,];
	matrix_temp = new int[righe,colonne];
	System.Array.Copy (matrix, matrix_temp, matrix.GetLength(0)*matrix_temp.GetLength(1));
	
	if(Isvalid(0,j,matrix)){
		matrix_temp=Add(0,j,matrix,player);
	
		if(Check(add_i,add_j,matrix_temp,4,player)){
			res=true;
		}	
	}
	

	return res;
}

function col(matrix:int[,]):int[]{
	var j:int; 
	var colonne_possibili:int[];
	colonne_possibili = new int[colonne];
	for(j=0;j<colonne;j++){
		
		
		
						var output:String="lol: ";
			for(j=0;j<colonne;j++){
				output+=matrix[0,j]+" ";
			}
			print(output);
		
		
		if(Isvalid(0,j,matrix)){
			colonne_possibili[j]=1;
		}else{
			colonne_possibili[j]=0;
		}
	}
	return colonne_possibili;
}

function col2(matrix:int[,]):int[]{
	var j:int; 
	var colonne_possibili:int[];
	colonne_possibili = new int[colonne];
	for(j=0;j<colonne;j++){
		if(Isvalid2(0,j,matrix)){
			colonne_possibili[j]=1;
		}else{
			colonne_possibili[j]=0;
		}
	}
	return colonne_possibili;
}

//prossima mossa
function lev_1(matrix:int[,], player:int):int[]{
	var j:int; 
	var matrix_temp:int[,];
	matrix_temp = new int[righe,colonne];
	System.Array.Copy (matrix, matrix_temp, matrix.GetLength(0)*matrix_temp.GetLength(1));

	var col_poss:int[]=col(matrix);
	var cond:boolean=true;
	
				var output:String="base: ";
			for(j=0;j<colonne;j++){
				output+=col_poss[j]+" ";
			}
			print(output);
	
	if(dimensioni==1){
				
		// Posso vincere alla prossima mossa?
		for(j=0;j<colonne;j++){
			if((col_poss[j]!=0)&&(Win(0,j,matrix,player))){
				col_poss[j]=2;
				cond=false;
			}
		}
		
				
						
		// Il mio avversario può vincere alla prossima mossa?
		if(cond){
			for(j=0;j<colonne;j++){
				if((col_poss[j]!=0)&&(Win(0,j,matrix,player*(-1)))){
					col_poss[j]=2;
				}
			}
		}				
		
	}
	
	return col_poss;
}



function lev_2(matrix:int[,], player:int):int[]{
	var j:int; 
	var matrix_temp:int[,];
	matrix_temp = new int[righe,colonne];
	System.Array.Copy (matrix, matrix_temp, matrix.GetLength(0)*matrix_temp.GetLength(1));


	var colonne_possibili:int[]=lev_1(matrix,player);
	
	if(!IsThereAny(colonne_possibili,2)){
	
	
		// Se faccio questa mossa il mio avversario può vincere subito dopo?	
		for(j=0;j<colonne;j++){
			if((colonne_possibili[j]==1)&&(Isvalid2(0,j,matrix_temp))){
				matrix_temp=Add(0,j,matrix_temp,player);
				matrix_temp=Add(0,j,matrix_temp,player*(-1));
				//print("provo "+j);
				if(Win(0,j,matrix_temp,player*(-1))){
					colonne_possibili[j]=-1;
					print("non andare in "+j);
				}
				System.Array.Copy (matrix, matrix_temp, matrix.GetLength(0)*matrix_temp.GetLength(1));
			}
		}
		
		
		for(j=0;j<colonne;j++){
			if((Isvalid(0,j,matrix))&&(colonne_possibili[j]==0)){
				colonne_possibili[j]=1;
			}
		}

	}
	
	
	
	return colonne_possibili;
}



function lev_3(matrix:int[,], player:int):int[]{
	var j:int; 
	var matrix_temp:int[,];
	matrix_temp = new int[righe,colonne];
	System.Array.Copy (matrix, matrix_temp, matrix.GetLength(0)*matrix_temp.GetLength(1));

	var colonne_possibili:int[]=lev_2(matrix,player);


	var cond_av:boolean=true;
	
	var spiet2:boolean=false;
	var l:int;
	var contatore:int=0;
	for(j=0;j<colonne;j++){
	if(colonne_possibili[j]==1){
		matrix_temp=Add(0,j,matrix,player);
			
			for(l=0;l<colonne;l++){
			//if(Isvalid(0,k,Add(0,k,matrix,player*(-1)))){
				if(Win(0,l,matrix_temp,player)){
					contatore++;print("capita"+j+" "+l);
		 		}
			}//}
					
					
		if(contatore>1){
			colonne_possibili[j]=-1;
			cond_av=false;print("urra +");
		}
		contatore=0;
		System.Array.Copy (matrix, matrix_temp, matrix.GetLength(0)*matrix_temp.GetLength(1));
	}}
	
							
	
	if(cond_av){
		var spiet:boolean=false;
		var k:int;
		var m:int;
		contatore=0;
		for(j=0;j<colonne;j++){
		if(colonne_possibili[j]==1){
			matrix_temp=Add(0,j,matrix,player*(-1));
				
				for(k=0;k<colonne;k++){
				//if(Isvalid(0,k,Add(0,k,matrix,player*(-1)))){
					if(Win(0,k,matrix_temp,player*(-1))){
						contatore++;//print("capita"+j+" "+k);
			 		}
				}//}
						
						
			if(contatore>1){
				colonne_possibili[j]=-1;
			}
			contatore=0;
			System.Array.Copy (matrix, matrix_temp, matrix.GetLength(0)*matrix_temp.GetLength(1));
		}}
	
	}
	
	return colonne_possibili;
}








function AI(matrix:int[,], player:int):int[,]{
	var end:boolean=false;
	var i:int;
	var j:int; 
	var matrix_temp:int[,];
	matrix_temp = new int[righe,colonne];
	System.Array.Copy (matrix, matrix_temp, matrix.GetLength(0)*matrix_temp.GetLength(1));



	var colonne_possibili:int[];
	var condition:boolean=true;

		
	if(level==1){
		colonne_possibili=lev_1(matrix,player);
		
		if(IsThereAny(colonne_possibili,2)){
			matrix_temp=Add(0,RandArray(colonne_possibili,2),matrix,player);
		}else if(IsThereAny(colonne_possibili,1)){
			matrix_temp=Add(0,RandArray(colonne_possibili,1),matrix,player);
		}

		
   	}
	
	if(level==2){
		colonne_possibili=lev_2(matrix,player);
		
			var output:String="";
			for(j=0;j<colonne;j++){
				output+=colonne_possibili[j]+" ";
			}
			print(output);
		
		if(IsThereAny(colonne_possibili,2)){
			matrix_temp=Add(0,RandArray(colonne_possibili,2),matrix,player);
		}else if(IsThereAny(colonne_possibili,1)){
			matrix_temp=Add(0,RandArray(colonne_possibili,1),matrix,player);
		}else if(IsThereAny(colonne_possibili,-1)){
			matrix_temp=Add(0,RandArray(colonne_possibili,-1),matrix,player);
		}
		

   	}
   	       
	if(level==3){
		colonne_possibili=lev_1(matrix,player);
		if(IsThereAny(colonne_possibili,-1)){
			matrix_temp=Add(0,RandArray(colonne_possibili,-1),matrix,player);
		}else{
			colonne_possibili=lev_3(matrix,player);

			if(IsThereAny(colonne_possibili,-1)){
				matrix_temp=Add(0,RandArray(colonne_possibili,-1),matrix,player);
			}else if(IsThereAny(colonne_possibili,1)){
				matrix_temp=Add(0,RandArray(colonne_possibili,1),matrix,player);
			}		
		}
   	}
	
	/*
	if(Isfull(matrix)){
		print("finito");
		
	}else if(IsThereAny(colonne_possibili,-1)){
		matrix_temp=Add(0,RandArray(colonne_possibili,-1),matrix,player);
		
	}else if(IsThereAny(colonne_possibili,1)){
		matrix_temp=Add(0,RandArray(colonne_possibili,1),matrix,player);
		
	}else{
		print("errore sconosciuto!");
	}
	*/

	return matrix_temp;
}


function IsThereAny(array:int[],val:int):boolean{
	var condition:boolean=false;
	var j:int;
	for(j=0;j<array.Length;j++){
		if(array[j]==val){
			condition=true;
		}
	}
	
	return condition;
}

function RandArray(array:int[],val:int):int{
	var j:int;
	var rand:int;
	//print("a caso!");

var res:int;


	/*
	for(j=0;j<array.Length;j++){
		if(array[j]==val){
			res=j;
			print(array[j]+"!="+val+"  ->"+res);
		}
	}
*/
	//print(res + " " +val);


	rand=Random.Range(0,array.Length);

	while (array[rand]!=val){
		rand=Random.Range(0,array.Length);
	}	


	return rand;
}



function Isvalid(i:int,j:int,matrix:int[,]):boolean{
	var res:boolean;
	//if(dimensioni==1){
		if(matrix[0,j]==0){
			res=true;
		}else{
			res=false;
		}
	//}	
	
	return res;
}

function Isvalid2(i:int,j:int,matrix:int[,]):boolean{
	var res:boolean;
	if(dimensioni==1){
		if(matrix[1,j]==0){
			res=true;
		}else{
			res=false;
		}
	}	
	
	return res;
}

function Isfull(matrix:int[,]):boolean{
	var res:boolean=true;
	var j:int; 
	
	/*
	var output:String;
	for(j=0;j<colonne;j++){
		output+=matrix[0,j]+" ";
	}
	print(output);print("-----------------");
	*/
	
	
	//if(dimensioni==1){
		for(j=0;j<colonne;j++){
			if(matrix[0,j]==0){
				res=false;
			}
		}
	//}
		//print("full: "+res);

	return res;
}

function Check(p:int,q:int,matrix_temp:int[,],max:int,player_temp:int):boolean{
	var count:int=0;
	var m:int;
	var n:int;
	var cond:boolean=false;

	
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





function Add(m:int,n:int,matrix:int[,],player:int):int[,]{

	var matrix_temp:int[,];
	matrix_temp = new int[righe,colonne];
	System.Array.Copy (matrix, matrix_temp, matrix.GetLength(0)*matrix_temp.GetLength(1));
	
	if(dimensioni==1){
		for(m=righe-1;m>=0;m--){
			if(matrix_temp[m,n]==0){
				matrix_temp[m,n]=player;			add_i=m; add_j=n;
				m=-1;
			}
		}
	}
	
	if(dimensioni==2){
		if(m+1>righe/2){
			for(m=righe-1;m>=0;m--){
				if(matrix_temp[m,n]==0){
					matrix_temp[m,n]=player;		add_i=m; add_j=n;
					m=-1;
				}
			}
		}else{
		
			for(m=0;m<righe;m++){
				if(matrix_temp[m,n]==0){
					matrix_temp[m,n]=player;		add_i=m; add_j=n;
					m=righe;
				}
			}		
		
		}
	}		
	
	
	return matrix_temp;
}







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



