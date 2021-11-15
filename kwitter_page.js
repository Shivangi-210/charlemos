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
    room_name = localStorage.getItem("roomname");
    
    function Send(){
          msg = document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
                name : username , 
                message : msg ,
                like : 0 
          });
          document.getElementById("msg").value = ""; 
    }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         console.log(firebase_message_id);
          console.log(message_data);
          name = message_data['name'];
          message = message_data['message'];
          like = message_data['like']; 

          name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'>";

          message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";

          like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      
          span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
          
          row = name_with_tag + message_with_tag +like_button + span_with_tag;
          document.getElementById("output").innerHTML += row;

      } });  }); }
getData();

function updateLike(message_id) { console.log("clicked on like button - " + message_id);
         button_id = message_id; likes = document.getElementById(button_id).value;
         updated_likes = Number(likes) + 1; console.log(updated_likes);
         firebase.database().ref(room_name).child(message_id).update({ like : updated_likes }); }
function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location.replace("index.html");
}