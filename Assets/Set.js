#pragma strict

var hCol:double;
var hRig:double;
var hDif:double;
var hStart:double;

var colonne:int	;
var righe:int;
var dimBut:int;
var wBox:int;
var hBox:int;
var diff:int;

function Start () {
	print(PlayerPrefs.GetInt("Colonne"));
	if(PlayerPrefs.GetInt("Colonne")>5){
		righe=PlayerPrefs.GetInt("Righe");
		colonne=PlayerPrefs.GetInt("Colonne");
		diff=PlayerPrefs.GetInt("Difficolta");
		
	}else{
		colonne=7;
		righe=7;
		diff=2;
	}
	
	hCol=Screen.height/2-150;
	hRig=Screen.height/2-50;
	hDif=Screen.height/2+50;
	hStart=Screen.height/2+150;

	dimBut=90;
	wBox=150;
	hBox=45;
}




function OnGUI () {
	
    GUI.skin.button.fontSize = 35;
    GUI.skin.box.fontSize = 25;
    	
	GUI.Box(Rect (Screen.width-wBox, Screen.height-hBox, wBox, hBox), "version 0.0.1");

	GUI.Box(Rect (Screen.width/2-wBox/2, 10, wBox, hBox), "Forza 4");

	//GUI.Box(Rect (Screen.width/2-130, 40, 260, 100), "arrow up - accelerate\narron left/right - rotate\nV - shield for 3 sec every 10\nB - bomb every 15 sec\nspace - shoot\n[no bombs for boss, u sad? :'( lol]");
	
	if (GUI.Button (Rect (Screen.width-wBox, 0, wBox, hBox), "Reset")) {			// -
		colonne=7;
		righe=7;
		diff=2;
	}	
		
			
	// Colonne
	if (GUI.Button (Rect (0, hCol, dimBut, dimBut), "-")) {			// -
		if(colonne>6){
			colonne--;
		}
	}
	GUI.Box(Rect (Screen.width/2-wBox/2, hCol+(dimBut-hBox)/2, wBox, hBox), "Colonne: "+colonne);
	if (GUI.Button (Rect (Screen.width-dimBut, hCol, dimBut, dimBut), "+")) {	// +
			colonne++;
	}
	
	
	// Righe
	if (GUI.Button (Rect (0, hRig, dimBut, dimBut), "-")) {			// -
		if(righe>6){
			righe--;
		}
	}
	GUI.Box(Rect (Screen.width/2-wBox/2, hRig+(dimBut-hBox)/2, wBox, hBox), "Righe: "+righe);
	if (GUI.Button (Rect (Screen.width-dimBut, hRig, dimBut, dimBut), "+")) {	// +
			righe++;
	}	
	
	// Difficolta'
	if (GUI.Button (Rect (0, hDif, dimBut, dimBut), "-")) {			// -
		if(diff>1){
			diff--;
		}
	}
	GUI.Box(Rect (Screen.width/2-wBox/2, hDif+(dimBut-hBox)/2, wBox, hBox), "Difficoltà: "+diff);
	if (GUI.Button (Rect (Screen.width-dimBut, hDif, dimBut, dimBut), "+")) {	// +
		if(diff<3){
			diff++;
		}	}	
	
	
	
	// Start
	if (GUI.Button (Rect (Screen.width/2-wBox/2, hStart, wBox, hBox), "Start")) {			
		PlayerPrefs.SetInt("Colonne",colonne);
		PlayerPrefs.SetInt("Righe",righe);
		PlayerPrefs.SetInt("Difficolta",diff);
		Application.LoadLevel("game");
	}	
	
	
	
	
}








