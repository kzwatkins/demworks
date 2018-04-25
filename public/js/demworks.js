$(document).ready(function(){
  $(".fadeOut").fadeOut(3000, "swing");
});

function createSupportGroup(title, imgUrl, text){
  return {
      title: title,
      imgUrl: imgUrl,
      text: text
  };
}
