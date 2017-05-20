
$(document).ready(function(){
    $("#userAttacking").hide();
    $("#enemyAttacking").hide();
    $(".panel").hide();
    $(".progress").hide();
    $("#btnAttack").hide();
    $("#btnRestart").hide();
    charsToChoose();
    var userChar={id:"",name:"undefine",hp:0,attack:0,initialhp:0,createMe:function(myid,myname,myhp,myattack){
        this.id=myid,this.name=myname;this.hp=myhp;this.attack=myattack,this.initialhp=myhp;
    }};

    var enemy1={id:"",name:"undefine",hp:0,counterAttack:0,initialhp:0,createMe:function(myid,myname,myhp,mycounterattack){
        this.id=myid,this.name=myname;this.hp=myhp;this.counterAttack=mycounterattack,this.initialhp=myhp;
    }};

    var enemy2={id:"",name:"undefine",hp:0,counterAttack:0,initialhp:0,createMe:function(myid,myname,myhp,mycounterattack){
        this.id=myid,this.name=myname;this.hp=myhp;this.counterAttack=mycounterattack,this.initialhp=myhp;
    }};

    var enemy3={id:"",name:"undefine",hp:0,counterAttack:0,initialhp:0,createMe:function(myid,myname,myhp,mycounterattack){
        this.id=myid,this.name=myname;this.hp=myhp;this.counterAttack=mycounterattack,this.initialhp=myhp;
    }};
    var activeEnemyID="";


//=====================characters are being chosen
$(document).on("click",".charProfile",function(){
    $(".panel").show();
    $("#alertbar").html("From enemies panel, select one to fight with...")
    $("#userChar").html(this.innerHTML);
    userChar.createMe(this.id,$("#"+this.id).find("h4").html(),$("#"+this.id).find(".hp").html(),$("#"+this.id).find(".attack").html())
    setAttackerImg(userChar.name);
    $("#attackerHP").parent().show().show();
    $(this).remove();


    var enemies,enemiesID;
   for(i=0;i<3;i++){
        enemies=randomEnemyID();
        enemiesID="enemyChar"+(i+1).toString();
        $("#"+enemiesID).append(enemies.html());
        createEnemy(enemiesID);
        enemies.remove();
    }
  $("#characterOptions").empty();
});

//==============================Enemy chosen to fight with
$("#enemiesPanel .panelProfile").on("click",function(){
    if(userChar.hp>0){
    $("#alertbar").html("Click on the attack button to fight");
      activeEnemyID=this.id;
      $(".progress").show();
      $("#enemyHpIcon").show()
      switch(this.id){
          case "enemyChar1": defenderLifeBar(enemy1.initialhp,enemy1.hp,enemy1.name);setDefenderImg(enemy1.name);break;
          case "enemyChar2": defenderLifeBar(enemy2.initialhp,enemy2.hp,enemy2.name);setDefenderImg(enemy2.name);break;
          case "enemyChar3": defenderLifeBar(enemy3.initialhp,enemy3.hp,enemy3.name);setDefenderImg(enemy3.name);break;
      }

        $("#btnAttack").show();
    }
});


$("#btnAttack").on("click",function(){

    if($("#attacker").queue().length==0 && $("#defender").queue().length==0 ){
        $("#attacker").animate({left: '25%'},function(){
            $("#userWaiting").hide();
            $("#userAttacking").show();
        });
        $("#attacker").animate({left: '0px'},function(){
            $("#userAttacking").hide();
            $("#userWaiting").show();
        });
            $("#defender").animate({right: '25%'},function(){
            $("#enemyWaiting").hide();
            $("#enemyAttacking").show();
        });
        $("#defender").animate({right: '0px'},function(){
            $("#enemyAttacking").hide();
            $("#enemyWaiting").show();
        });

   damagesResult();
    }
});


//=======================================General Functions
function randomEnemyID(){
    var randid=Math.floor(Math.random()*$("#characterOptions").children().length);
    return $("#characterOptions").children().eq(randid);
}
function setAttackerImg(attackerName){
   $("#userWaiting").show();
   $("#userWaiting").attr("src","assets/images/"+attackerName.toLowerCase()+"_left.png");
   $("#userAttacking").attr("src","assets/images/"+attackerName.toLowerCase()+"_left_attack.png");
   AttackerLifeBar(userChar.hp,userChar.hp,attackerName);
}
function AttackerLifeBar(initialHp,hpNow,Name){

    var newVal=parseInt((hpNow*100)/initialHp);
    $("#attackerHP").attr("aria-valuenow",newVal).css("width",newVal.toString()+"%");
    $("#attackerHP").html(hpNow)
    if(Name!=""){
    $("#userHpIcon").show();
    $("#userHpIcon").attr("src","assets/images/"+Name.toLowerCase()+".jpg")
    }
}


function createEnemy(enemyid){
        if(enemyid=="enemyChar1")
        enemy1.createMe(enemyid,$("#"+enemyid).find("h4").html(),$("#"+enemyid).find(".hp").html(),$("#"+enemyid).find(".counter-attack").html())
        if(enemyid=="enemyChar2")
        enemy2.createMe(enemyid,$("#"+enemyid).find("h4").html(),$("#"+enemyid).find(".hp").html(),$("#"+enemyid).find(".counter-attack").html())
        if(enemyid=="enemyChar3")
        enemy3.createMe(enemyid,$("#"+enemyid).find("h4").html(),$("#"+enemyid).find(".hp").html(),$("#"+enemyid).find(".counter-attack").html())
}

function setDefenderImg(defenderName){
   $("#enemyWaiting").attr("src","assets/images/"+defenderName.toLowerCase()+"_right.png");
   $("#enemyAttacking").attr("src","assets/images/"+defenderName.toLowerCase()+"_right_attack.png");
}

function defenderLifeBar(initialHp,hpNow,Name){
     var newVal=parseInt((hpNow*100)/initialHp);
    $("#defenderHP").attr("aria-valuenow",newVal).css("width",newVal.toString()+"%");
    $("#defenderHP").html(hpNow)
    if(Name!="")
    $("#enemyHpIcon").attr("src","assets/images/"+Name.toLowerCase()+".jpg")
}

function damagesResult(){
    var mutObj;
          switch(activeEnemyID){
          case "enemyChar1": mutObj=enemy1; break;
          case "enemyChar2": mutObj=enemy2;break;
          case "enemyChar3": mutObj=enemy3;break;
      }
      userChar.attack=parseInt(userChar.attack)+parseInt($("#userChar").find(".attack").text());
      mutObj.hp-=parseInt(userChar.attack);
      defenderLifeBar(mutObj.initialhp,mutObj.hp,"");
      if (mutObj.hp<=0){
          //reset
              $("#enemyHpIcon").hide();
              $("#enemyWaiting").attr("src","");
              $("#enemyAttacking").attr("src","");
              $("#defenderHP").parent().hide();
              $("#"+activeEnemyID).empty().hide();
              activeEnemyID="";

              if($("#enemyChar1").is(":visible") || $("#enemyChar2").is(":visible") || $("#enemyChar3").is(":visible")){
              $("#btnAttack").hide();
              $("#alertbar").html("Choose a new enemy to fight with");
              }
              else{
              $("#btnAttack").hide();
              $("#btnRestart").show();
              $("#alertbar").html("<div class=\"alert alert-success\">You won!</div>") 
              }
             return;
          }
          
    userChar.hp-=parseInt(mutObj.counterAttack);
     if(userChar.hp<=0){
             $("#alertbar").html("<div class=\"alert alert-danger\">Game Over!</div>")
             $("#userWaiting").attr("src","");
             $("#userAttacking").attr("src","");
             $("#btnAttack").hide();
             $("#btnRestart").show(); 

     }
     AttackerLifeBar(userChar.initialhp,userChar.hp,"");
}



//---restart button
$("#btnRestart").on("click",function(){
      $("#enemyWaiting").attr("src","");
      $("#enemyAttacking").attr("src","");
      $("#userWaiting").attr("src","").hide();
      $("#userAttacking").attr("src","");
      $("#userHpIcon").hide();
      $("#enemyHpIcon").hide();
      $("#userAttacking").hide();
      $("#enemyAttacking").hide();
      $("#userChar").empty();
      $("#enemyChar1").empty().show();
      $("#enemyChar2").empty().show();
      $("#enemyChar3").empty().show();
      $(".panel").hide();
      $(".progress").hide();
      $("#btnAttack").hide();
      $("#btnRestart").hide();
      $("#alertbar").html("Choose a Character from above")
      charsToChoose();
});
//===========================Create All Characters
function charsToChoose(){
    var charid=0;
    var nameTitle,profileimg,HP,profilediv;

    //======================================:
    nameTitle=document.createElement("h4");
    profileimg=document.createElement("img");
    HP=document.createElement("h6");
    profilediv=$("<div></div>").addClass("thumbnail charProfile");
    nameTitle.innerHTML="Viking";
    profileimg.src="assets/images/viking.jpg";
    profileimg.alt="Viking";
    HP.innerHTML="HP:<span class=\"hp\"> 120</span>";
    profilediv.attr("id","char"+charid).append(nameTitle).append(profileimg).append(HP);
    profilediv.append("<span class=\"attack\">8</span><span class=\"counter-attack\">10</span>");
    $("#characterOptions").append(profilediv);

    
    charid++;//==============================:
    nameTitle=document.createElement("h4");
    profileimg=document.createElement("img");
    HP=document.createElement("h6");
    profilediv=$("<div></div>").addClass("thumbnail charProfile");
    nameTitle.innerHTML="Demontroll";
    profileimg.src="assets/images/demontroll.jpg";
    profileimg.alt="Troll"
    HP.innerHTML="HP: <span class=\"hp\">170</span>";
    profilediv.attr("id","char"+charid).append(nameTitle).append(profileimg).append(HP);
    profilediv.append("<span class=\"attack\">9</span><span class=\"counter-attack\">18</span>");
    $("#characterOptions").append(profilediv);

    
    charid++;//============================:
    nameTitle=document.createElement("h4");
    profileimg=document.createElement("img");
    HP=document.createElement("h6");
    profilediv=$("<div></div>").addClass("thumbnail charProfile");
    nameTitle.innerHTML="Dragon";
    profileimg.src="assets/images/dragon.jpg";
    profileimg.alt="Dragon"
    HP.innerHTML="HP: <span class=\"hp\">150</span>";
    profilediv.attr("id","char"+charid).append(nameTitle).append(profileimg).append(HP);
    profilediv.append("<span class=\"attack\">7</span><span class=\"counter-attack\">11</span>");
    $("#characterOptions").append(profilediv);

    
    charid++;//===============================:
    nameTitle=document.createElement("h4");
    profileimg=document.createElement("img");
    HP=document.createElement("h6");
    profilediv=$("<div></div>").addClass("thumbnail charProfile");
    nameTitle.innerHTML="polar";
    profileimg.src="assets/images/polar.jpg";
    profileimg.alt="Polar"
    HP.innerHTML="HP: <span class=\"hp\">115</span>";
    profilediv.attr("id","char"+charid).append(nameTitle).append(profileimg).append(HP);
    profilediv.append("<span class=\"attack\">5</span><span class=\"counter-attack\">5</span>");
    $("#characterOptions").append(profilediv);

    charid++;//==============================:
    nameTitle=document.createElement("h4");
    profileimg=document.createElement("img");
    HP=document.createElement("h6");
    profilediv=$("<div></div>").addClass("thumbnail charProfile");
    nameTitle.innerHTML="Troll";
    profileimg.src="assets/images/troll.jpg";
    profileimg.alt="Troll"
    HP.innerHTML="HP: <span class=\"hp\">130</span>";
    profilediv.attr("id","char"+charid).append(nameTitle).append(profileimg).append(HP);
    profilediv.append("<span class=\"attack\">6</span><span class=\"counter-attack\">9</span>");
    $("#characterOptions").append(profilediv);

    charid++;//==============================:
    nameTitle=document.createElement("h4");
    profileimg=document.createElement("img");
    HP=document.createElement("h6");
    profilediv=$("<div></div>").addClass("thumbnail charProfile");
    nameTitle.innerHTML="Vailin";
    profileimg.src="assets/images/vailin.jpg";
    profileimg.alt="Vailin"
    HP.innerHTML="HP: <span class=\"hp\">180</span>";
    profilediv.attr("id","char"+charid).append(nameTitle).append(profileimg).append(HP);
    profilediv.append("<span class=\"attack\">10</span><span class=\"counter-attack\">25</span>");
    $("#characterOptions").append(profilediv);
}
});