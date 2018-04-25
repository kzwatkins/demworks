var groups = [createSupportGroup("Montgomery County Children Services", "...", "Lorem 1"),
              createSupportGroup("Birth Families", "...", "Lorem 2"),
              createSupportGroup("Judicial & Legal", "...", "Lorem 3"),
              createSupportGroup("Health Services", "...", "Lorem 4")];

$(document).ready(function(){
  $(".fadeOut").fadeOut(5000, "swing");
});

function createSupportGroup(title, imgUrl, text){
  return {
      title: title,
      imgUrl: imgUrl,
      text: text
  };
}
