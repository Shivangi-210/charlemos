var firebaseConfig = {
      apiKey: "AIzaSyAaMg8JErta1mPC4bFPf2LnnIERY63fQ4E",
      authDomain: "kwitter-f2bfc.firebaseapp.com",
      databaseURL: "https://kwitter-f2bfc-default-rtdb.firebaseio.com",
      projectId: "kwitter-f2bfc",
      storageBucket: "kwitter-f2bfc.appspot.com",
      messagingSenderId: "739520358430",
      appId: "1:739520358430:web:dcf1ce89b2f8655ffe260f",
      measurementId: "G-8WR5F0YK2H"
    };
    
    firebase.initializeApp(firebaseConfig);
 
username = localStorage.getItem("username");
document.getElementById("username").innerHTML = "Welcome " + username ;

function addroom(){
      roomname = document.getElementById("roomname").value;
      firebase.database().ref("/").child(roomname).update({
            purpose : "addingroomname"
      });
      localStorage.setItem("roomname",roomname);
      window.location = "kwitter_page.html";
}




function getData() 
   {firebase.database().ref("/").on('value', function(snapshot)
     {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot)
        {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
   console.log("Room name is" + Room_names);
   row = "<div class = 'roomname' id = "+ Room_names + " onclick = 'redirectToRoomname(this.id)'>#" + Room_names +" </div>";
   document.getElementById("output").innerHTML += row;
    //End code
      });});}
getData();

function redirectToRoomname(name){
      console.log(name);
      localStorage.setItem("roomname",name);
      window.location = "kwitter_page.html"
}
function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location = "index.html";
}