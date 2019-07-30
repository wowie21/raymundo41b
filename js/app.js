

$(function(){
    //Cached selectors
    var jokeButton = $('#joke-button');
    var jokeResetButton = $('#joke-reset-button');
    var jokesList = $('#jokes-list');
    var reaction = $('#reaction');
    var jokeLoader = $('#joke-loader');

    var jokeCount =0;
    var yesCount = 0;
    var noCount = 0;

    jokeLoader.hide();
    jokeResetButton.hide();
  
    //Events
    jokeButton.on('click',async function(e){
      //Do the magic here
       $('.imahe').remove();
        await generateJoke();
        
        
      
    });
  


    
    jokeResetButton.on('click',async function(){
     await $('.content').remove();
      await $('.imahe').remove();
      await $('h4').remove();
      await $('p').remove();
      jokeCount = 0;
      yesCount = 0;
      noCount = 0;
      $('#joke-button').prop('disabled', false);
      jokeResetButton.hide();
    });

      function generateJoke(){
       var joke ;
       var ansimage;
       var answer;
       
        JOKE_SERVICE.get()
                    
                    .then(function(res){

                       joke = res;
                      
                  
                })
       JOKE_SERVICE.answer() 
                .then(function(res){

                   ansimage = res.image;
                  answer = res.answer;
                  var li=
                      
                  `
                  <div class="content">
                  <li >
                    <div>
                      <h2> ${joke}  </h2>
                      <img class="jokeimage" src="${ansimage}" alt="">
                      
                     </div> 
                  </li>
                  </div>
                  `
                  jokesList.append(li);
                })
                  .then(function(){
                    jokeCount++;

                    if(answer === "yes"){
                      yesCount++;
    
                    }else
                    if(answer === "no"){
                      noCount++;
                    }

                    if(jokeCount === 5){
                      $('#joke-button').prop('disabled', true);
                      jokeResetButton.show();
                      generateAnswer();
                        
                    }else{
                     // $('.finalmes').remove();
                     
                    }


                })
      }

      function generateAnswer(){
              JOKE_SERVICE.answer()
              .then(function(res){
                var ansimage = res.image;
                var ansans = res.forced;
                var answer = res.answer;
                
                if(yesCount>=3){
                  var li=
                  `
                  <div>
                  <img class="imahe" src="${ansimage}" alt="">
                  <p>CONGRATS</p>
                  </div>
                  `
                }
                  else
                  if(noCount>=3){
                    var li=
                  `
                  <div>
                  <img class="imahe" src="${ansimage}" alt="">
                  <p>Try Again</p>
                  </div>
                  `

                  }
                reaction.append(li);
               
                console.log(yesCount);
                console.log(noCount);

              })
      }
  })