// Function for generating one input field
function generateInput(app,field){
  var html = '';
  // Skip the field if field type is not defined
  if(!field.type[0]){
    return html;
  }
  
  // Text and date
  if(field.type[0] == "text" || field.type[0] == "date"){
    html +='<input type="'+ field.type[0] +'" size="35" name="'+field.label+'" value="">';//</div></div></div>';

  // Document
  }else if(field.type[0] == "document"){
    html +='<input type="'+ field.type[0] +'" size="35" name="'+field.label+'" value="'+'">';//+
                             //'<div name="'+ field.label +'-button"></div>';//</div></div></div>';

    // Enable auto complete
    app.db.query(function(doc){ 
                    //log('type:'+field.type[1])
                      emit(doc.doctype,doc.title);
                  }, null, "javascript",{   
                    label : field.label,
                    startkey : field.type[1],
                    endkey : field.type[1],
                    success : function(data){
                      //console.log(JSON.stringify(data));
                      var autocompleteList = [];
                      for(var j = 0; j < data.rows.length; j++){
                        autocompleteList.push({label: data.rows[j].value, value: data.rows[j].id});
                      }
                      //console.log(JSON.stringify(autocompleteList));
                      //console.log('f='+fields);
                      //console.log('i='+i);
                      //$('input[name="'+field.label+'"]').autocomplete({ 
                      $('input[name="'+this.label+'"]').autocomplete({ 
                        source: autocompleteList,
                        messages: {
                                    noResults: '',
                                    results: function() {}
                                  }
                      });
                    }
                  });

  // Textarea
  }else if(field.type[0] == "textarea"){
    html +='<textarea name="' + field.label + '" rows="10" cols="80"></textarea>';

  // Checkbox and radio
  }else if(field.type[0] == "checkbox" || field.type[0] == "radio"){
    //fieldsHtml += '<div class="btn-group" data-toggle="buttons">';  //cannot set to active programmatically
    fieldHtml = '';
      for(var j = 0; j < field.options.length; j++){
        fieldHtml +='<label class="btn btn-default">';
        if(field.type[0] == "radio"){
          fieldHtml +='<input type="'+ field.type[0] +'" name="'+field.label+'" id="'+field.label+'-'+field.options[j]+'" value="'+j+'"> '+
                                    field.options[j];
          //console.log( '<input type="'+ field.type[0] +'" name="'+field.label+'" id="'+field.label+'-'+field.options[j]+'" value="'+j+'"> ');
        }else if(field.type[0] == "checkbox"){
          fieldHtml +='<input type="'+ field.type[0] +'" name="'+field.label+'-'+field.options[j]+'"> '+ field.options[j];
        }
        fieldHtml +='</label>';
      };
      //fieldsHtml += '</div></div></div></div>';
      //fieldHtml +='</div></div></div>';
      html +=fieldHtml;
  }else if(field.type[0] == "subform"){
    fields = field.fields;
    html += '&nbsp;</dd>';
    for(var i = 0; i < fields.length; i++){
      html += generateFieldHtml(app,fields[i]);
    }
  }
  return html;
}

// Function for generating one field in the form
function generateFieldHtml(app,field){
  var html = '';

  // Skip the field if field type is not defined
  if(!field.type[0]){
    return html;
  }

  // Generate label
  html += //'<div class="row">' + 
                  '<div class="form-group">'+
                    //'<div class="col-sm-12"> <label class="text-right">' + field.label + '</label> </div>' + 
                    //'<div class="col-sm-12">';
                    '<dt>' + field.label + '</dt><dd>'+ 
                    '<div id="'+field.label+ '-main">';

  // Generate input
  html += generateInput(app,field);
  //console.log(generateInput(field));

  // Add array button
  if(field.array){
    html += '<button type="button" class="btn btn-xs btn-default" id="'+field.label+'-array-add"><span class="glyphicon glyphicon-plus"></span></button>'
  }

  html += '</div></dd></div>';
  return html;
} // end function: generate field html
