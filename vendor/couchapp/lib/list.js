// Helpers for writing server-side _list functions in CouchDB
exports.withRows = function(fun) {
 var f = function() {
    var result = [];
    var row;
    while(row = getRow()){
      result.push(fun(row));
    }
    return result;
  };
  f.iterator = true;
  return f;
}

exports.send = function(chunk) {
  send(chunk + "\n")
}
