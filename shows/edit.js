function(doc, req) {  
  var ddoc = this;
  var Mustache = require("lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
 
  var indexPath = path.list('index','recent-posts',{descending:true, limit:10});
  var feedPath = path.list('index','recent-posts',{descending:true, limit:10, format:"atom"});
  var commentsFeed = path.list('comments','comments',{descending:true, limit:10, format:"atom"});

  var data = {
    header : {
      index : indexPath,
      blogName : ddoc.elog.title,
      feedPath : feedPath,
      commentsFeed : commentsFeed,
      index : indexPath,
      blogName : ddoc.elog.title,
      feedPath : feedPath,
      commentsFeed : commentsFeed,
      doctypes : Object.keys(ddoc.doctypes),
      doctype_name : function(){
        return ddoc.doctypes[this].name;
      },  
      doctype_link : function(){
        return path.list('index','doctypes', {key : this});
      } 
    },
    footer : {},
    scripts : {},
    pageTitle : doc ? "Edit: "+doc.title : "Create a new post",
    assets : path.asset(),
    fields : []
  };
  
  if (doc) {
    data.doc = JSON.stringify(doc);
    data._rev = doc._rev;
    data.fields = doc.fields;
    data.title = doc.title;
    //data.mass = doc.mass;
    //data.vendor = doc.vendor;
    //data.batch_number = doc.batch_number;
    //data.description = doc.description;

    data.tags = doc.tags.join(", ");
    // add data.doc to attachments
    
  } else {
    data.doc = JSON.stringify({
      type : "post",
      format : "markdown"
    });
  }

  return Mustache.to_html(ddoc.templates.edit, data, ddoc.templates.partials);
}
