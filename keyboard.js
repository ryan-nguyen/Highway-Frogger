var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

var keyArray = [false,false,false,false];

function initKeyboard(){
    $(document).keydown(function(e){
      var keyCode = e.which || e.keyCode;
      if(keyCode == KEY_LEFT){
        keyArray[0] = true;
      }
      if(keyCode == KEY_UP){
        keyArray[1] = true;
      }
      if(keyCode == KEY_RIGHT){
        keyArray[2] = true;
      }
      if(keyCode == KEY_DOWN){
        keyArray[3] = true;
      }
    });


/*    $(document).keyup(function(e){
      console.log(e.keyCode);
      if(e.keyCode == KEY_LEFT){
        keyArray[0] = false;
      }
      if(e.keyCode == KEY_UP){
        keyArray[1] = false;
      }
      if(e.keyCode == KEY_RIGHT){
        keyArray[2] = false;
      }
      if(e.keyCode == KEY_DOWN){
        keyArray[3] = false;
      }
    });
    */
}
