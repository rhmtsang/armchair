function writeFieldToDoc(field,values){
  if(field.type[0] == 'radio'){
    values[field.label] = -1;
    for(var j = 0; j < field.options.length; j++){
      values[field.label] = $('input[id="'+field.label+'-'+field.options[j]+'"]:checked').val() ? j : values[field.label];
    }
  }else if (field.type[0] == 'checkbox'){
    values[field.label] = [];
    for(var j = 0; j < field.options.length; j++){
      values[field.label].push($('input[name="'+field.label+'-'+field.options[j]+'"]:checked').val() ? true : false);
    }
  }else if (field.type[0] == 'textarea'){
    values[field.label] = $('textarea[name="'+ field.label +'"]').val();
  }else if (field.type[0] == 'subform'){
    values[field.label] = {};
    for(var i = 0; i < field.fields.length; i++){
      writeFieldToDoc(field.fields[i],values[field.label]);
    }
  }else{
    var inputs = $('input[name="'+field.label+'"]')
    //console.log(inputs);
    if(field.array){
      values[field.label] = [];
      for(var i = 0; i < inputs.length; i++){
        if(inputs[i].value){
          values[field.label].push(inputs[i].value);
        }
      }
    }else{
      values[field.label] = $('input[name="'+field.label+'"]').val();
    }
  }
}

function readFieldFromDoc(field,values){
  if(field.type == 'radio'){
    $('input[id="'+ field.label +'-'+ field.options[values[field.label]] +'"]').prop('checked',true);
  }else if (field.type == 'checkbox'){
    for(var j = 0; j < field.options.length; j++){
      $('input[name="'+field.label+'-'+field.options[j]+'"]').prop('checked',values[field.labal][j]);
    }
  }else if (field.type == 'textarea'){
    $('textarea[name="'+ field.label +'"]').val(values[field.label]);
  }else if (field.type == 'subform'){
    for(var i = 0; i < field.fields.length; i++){
      readFieldFromDoc(field.fields[i],values[field.label]);
    }
  }else{
    if(field.array){
      var savedData = values[field.label]; // data in DB, which should be an array
      for(var i = 0; i < savedData.length; i++){
        $('button[id="'+field.label+'-array-add"]').click();
      }
      var inputs = $('input[name="'+field.label+'"]');
      for(var i = 0; i < savedData.length; i++){
        inputs[i].value = values[field.label][i];
      }
    }else{
      //console.log(values);
      //console.log(field.label);
      $('input[name="'+field.label+'"]').val(values[field.label]);
    }
  }
}


