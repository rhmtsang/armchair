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
      commentsFeed : commentsFeed
    },
    footer : {},
    scripts : {},
    pageTitle : doc ? "Edit: "+doc.title : "Create a new post",
    assets : path.asset()
  };
  
  if (doc) {
    data.doc = JSON.stringify(doc);
    data.title = doc.title;
    data._rev = doc._rev;
    data.mass = doc.mass;
    data.vendor = doc.vendor;
    data.batch_number = doc.batch_number;
    data.description = doc.description;
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
