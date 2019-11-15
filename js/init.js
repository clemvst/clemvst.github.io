String.prototype.capitalize = function( ) {
  return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
}

$.url_param = function( name ){
  var results = new RegExp( "[\?&]" + name + "=([^&#]*)").exec( window.location.href );
  if ( results == null ) {
     return null;
  }
  return decodeURI( results[1] ) || 0;
}

function generate_random_color( ) {
  var letters = "0123456789ABCDEF";
  var color = '#';
  for ( var i = 0; i < 6; ++i ) {
    color += letters[ Math.floor( Math.random() * 16 ) ];
  }
  return color;
}

function update_upper_menu_style_onscroll( ) {
  var __offset = 105;
  $( window ).scroll( function() {
    if ( $( window ).scrollTop() < ( Math.round( $( "#education" ).offset().top ) - __offset )) {
      document.getElementById( "navigation" ).style.backgroundColor = "#4F8BFF";
    }
    else if ( $( window ).scrollTop() > ( Math.round( $( "#education").offset().top ) - __offset ) && $( window ).scrollTop() < ( Math.round( $( "#workexperience" ).offset().top ) - __offset )) {
      document.getElementById( "navigation" ).style.backgroundColor = "#48A9E8";
    }
    else if ( $( window ).scrollTop() > ( Math.round( $( "#workexperience" ).offset().top ) - __offset ) && $( window ).scrollTop() < ( Math.round( $( "#skills" ).offset().top ) - __offset )) {
      document.getElementById( "navigation" ).style.backgroundColor = "#5CE9FF";
    }
    else if ( $( window ).scrollTop() > ( Math.round( $( "#skills" ).offset().top ) - __offset )) {
      document.getElementById( "navigation" ).style.backgroundColor = "#48E8D2";
    }
  });
}

function update_upper_menu_style_onclick( ) {
  $( ".smooth" ).on( "click" , function() {
    var page = $( this ).attr( "href" );
    switch ( $(page)[0].id ) {
            case "home":
              document.getElementById( "navigation" ).style.backgroundColor = "#4F8BFF";
              break;
            case "education":
              document.getElementById( "navigation" ).style.backgroundColor = "#48A9E8";
              break;
            case "workexperience":
              document.getElementById( "navigation" ).style.backgroundColor = "#5CE9FF";
              break;
            case "skills":
              document.getElementById( "navigation" ).style.backgroundColor = "#48E8D2";
              break;
            default:
              document.getElementById( "navigation" ).style.backgroundColor = "#4FFFB5";
              break;
          }
    $( "html, body" ).animate( { scrollTop: $( page ).offset().top - 100 }, "slow" );
    return false;
  });
}

function load_lang_from_json( lang ) {
  $.getJSON( "data/language.json" , function( data ) {
      $( "#email_desc_txt" ).text(data[lang].email_desc_txt);
      $( "#lang_txt" ).text(data[lang].lang_txt);
      $( "#interest_txt" ).text(data[lang].interest_txt);
      $( "#education_txt" ).text(data[lang].education_txt);
      $( "#work_experience_txt" ).text(data[lang].work_experience_txt);
      $( "#skills_txt" ).text(data[lang].skills_txt);
  });
}

function load_data_from_json( lang ) {
  $.getJSON( "data/resume.json" , function( data ) {

    //INFO
    $( "#name" ).text( data.info.firstname + " " + data.info.lastname );
    $( "#age" ).text( data.info.age );
    $( "#address" ).text( data.info.address );
    $( "#country" ).text( data.info.country );
    $( "#email" ).text( data.info.email );
    $( "#email" ).attr( "mailto:" + data.info.email );
    $( "#profil_picture" ).attr( "src", data.info.picture );
    $( "#info_description" ).text( data.info.description );


    //INTEREST
    interests_items = [];
    $.each( data.interests , function( key, val ) {
      interests_items.push( "<i title=\"" + key.capitalize() + "\" style=\"margin: 10%\" class=\"fa " + val + " fa-2x\"></i>" );
    });
    $( "<h4/>", {
      html: interests_items.join( "" )
    }).appendTo( "#interests_container" );

    // EDUCATION
    var education_items = [];
    $.each( data.education, function( key, val ) {
      education_items.push( "<li><div><h4>" + val.title + "</h4><p class=\"date\">" + val.date + "</p><p class=\"desc\">" + val.school + ", " + val.location + "</p></div></li><br/>" );
    });
    $( "<ul/>", {
      html: education_items.join( "" )
    }).appendTo( "#education_container" );

    //WORK EXPERIENCE
    var workexperience_items = [];
    $.each( data.work_experience, function( key, val ) {
      workexperience_items.push( "<li><div><span class=\"flag\"></span><h4>" + val.job_title + " @" + val.company + ", " + val.location + "</h4><p class=\"date\">" + val.date + ", " + val.type_of_contract + "</p><p class=\"desc\">" + val.description + "</p></div></li><br/>" );
    });
    $( "<ul/>", {
      "class": "timeline",
      html: workexperience_items.join( "" )
    }).appendTo( "#workexperience_container" );

    //SKILLS
    skills_categories = Object.keys( data.skills );
    var skills_items = [];
    var index = 0;
    $.each( skills_categories, function( key_0, val_0 ) {
      if ( ( key_0 % 2 ) == 0 && skills_items.length != 0 ) {
        $( "<div/>", {
          "style": "flex: 1; padding: 2%; flex-direction: row; display: flex;",
          html: skills_items.join( "" )
        }).appendTo( "#skills_container" );
        skills_items = [];
      }
      skills_items.push( "<div style=\"flex: 1;\"><h4>" + val_0.capitalize().replace(/_/g, " ") + "</h4><div style=\"padding: 2%;\">" );
      $.each( data.skills[val_0], function( key_1, val_1) {
        if ( val_1.includes( '%' ) ) {
          color = generate_random_color();
          skills_items.push( "<div class=\"skillbar clearfix\"><div class=\"skillbar-title\" style=\"background: " + color + ";\"><span>" + key_1 + "</span></div><div class=\"skillbar-bar\" style=\"background: " + color + "; width: " + val_1 + ";\"></div><div class=\"skill-bar-percent\">" + val_1 + "</div></div>" );
        }
        else {
          tmp_str = "<span class=\"desc\" style=\"color: #4F8BFF; font-family: Lato;\">" + val_1;
          if ( key_1 == data.skills[val_0].length - 1 ) {
            tmp_str += "</span>";
          } else {
            tmp_str += ", </span>";
          }
          skills_items.push( tmp_str );
        }
      });
      skills_items.push("</div></div>");
    });
    $( "<div/>", {
      "style": "flex: 1; padding: 2%;",
      html: skills_items.join( "" )
    }).appendTo( "#skills_container" );
  });
}

$( document ).ready( function() {
  load_lang_from_json("en")
  load_data_from_json("en");
  update_upper_menu_style_onclick();
  update_upper_menu_style_onscroll();
});

/*
Copyright © 2019 Clémence Vast.
*/
