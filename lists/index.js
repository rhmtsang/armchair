function(head, req) {
  var ddoc = this;
  var Mustache = require("lib/mustache");
  var List = require("vendor/couchapp/lib/list");
  var path = require("vendor/couchapp/lib/path").init(req);
  var Atom = require("vendor/couchapp/lib/atom");

  var indexPath = path.list('index','recent-posts',{descending:true, limit:10});
  var feedPath = path.list('index','recent-posts',{descending:true, limit:10, format:"atom"});
  var commentsFeed = path.list('comments','comments',{descending:true, limit:10, format:"atom"});

  var path_parts = req.path;
  // The provides function serves the format the client requests.
  // The first matching format is sent, so reordering functions changes 
  // thier priority. In this case HTML is the preferred format, so it comes first.

  provides("html", function() {
    var key = '';
    // render the html head using a template
    var stash = {	
      header : {
        index : indexPath,
        blogName : ddoc.elog.title,
        feedPath : feedPath,
        commentsFeed : commentsFeed,
        doctypes : Object.keys(ddoc.doctypes),
        doctype_name : function(){
          return ddoc.doctypes[this].name;
        },
        doctype_link : function(){
          return path.list('index','doctypes', { startkey : [this,{}], 
                                                 endkey : [this],
                                                 limit : 10,
                                                 descending : true, 
                                                 reduce : false});
        }
      },
      footer : {},
      scripts : {},
      db : req.path[0],
      design : req.path[2],
      feedPath : feedPath,
      newPostPath : path.show("edit"),
      assets : path.asset(),
      posts : List.withRows(function(row) {
        var post = row.value;
        key = row.key;
        //log("XXXXXXXXXXXXXXXX key:"+key);
        //log("req"+req.query.limit);
        return {
          title : post.title,// || "<i> &lt;Untitled&gt; </i>",
          author : post.author,
          date : post.created_at,
          doctype_name : ddoc.doctypes[post.doctype].name,
          link : path.list('post','post-page', {startkey : [row.id]}),
          has_tags : post.tags.length ? true : false,
          tags : post.tags && post.tags.map ? post.tags.map(function(tag) {
            var t = tag.toLowerCase();
            return {
              tag : tag,
              link : path.list("index", "tags", {
                descending : true, 
                reduce : false, 
                startkey : [t, {}], 
                endkey : [t]
              })
            }
          }) : []
        };
      }),
      /*page_skip : function(){
        var result = [];
        //log("this.posts.length:"+this.posts.length);
        for(var i = 0; i < this.posts.length/req.query.limit; i++){
          result.push(i*req.query.limit)
        }
        //log("result:"+result);
        return result;
      },*/
      older : function(nextkey) {
        //log("older key: "+key+","+nextkey);
        return path.older(key);
      },
      newer : function(key) {
        //log("newer key");
        return path.newer(key);
      },
      "5" : path.limit(5),
      "10" : path.limit(10),
      "25" : path.limit(25)
    };
    return Mustache.to_html(ddoc.templates.index, stash, ddoc.templates.partials, List.send);
  });
}; 
