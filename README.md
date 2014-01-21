# Armchair: Standalone CouchDB E-Log

Armchair began as a clone of Sofa [a potential of pure CouchDB applications](http://jchris.mfdz.com/code/2008/10/standalone_applications_with_co). It should provide an easy way for scientists to put thier work online, anywhere there's a running Couch. It's just HTML, JavaScript and the magic of CouchDB. The goal is more accountability (delete is discouraged, if not outright not supported). Requires valid user to view, and post. All entires signed by user/time. 


## Current News


## Install CouchDB

You'll also need CouchDB (verion 0.11 or newer). Once you have that installed and the tests passing, you can install CouchApp
and the blog software. 

## Install CouchApp

CouchApp makes it easy to edit application that are hosted in CouchDB, by keeping a correspondence between a set of files, and a CouchDB design document. You'll use CouchApp to install Sofa in your CouchDB instance.

    sudo easy_install couchapp

CouchApp is a set of utilities for developing standalone CouchDB applications You can [learn more about the CouchApp project here](http://github.com/couchapp/couchapp/). Also, [`easy_install` has an unpleasant bug on OSX](http://mail.python.org/pipermail/pythonmac-sig/2008-October/020567.html), so you might end up having to work from git source.


### Setup Admin Access

* curl -X PUT $HOST/_config/admins/<user> -d '"<pass>"'
* curl -X PUT http://<admin>:<adminpass>@localhost:5984/_users/org.couchdb.user:<user> -H "Accept: application/json" -H "Content-Type: application/json" -d '{"name": "<user>", "password":"<userpass>","roles":[],"type":"user"}'
* In config, enable couch_httpd_auth/require_valid_user = True

## Install Armchair

    git clone https://github.com/bungernut/armchair.git
    cd armchair
    couchapp push . http://user:pass@127.0.0.1:5984/elog 
  
You'll want to edit the HTML and CSS to personalize your site. Don't worry, the markup is pretty basic, so it's easy to rework. Adding new features is just a few lines of JavaScript away.

Anytime you make edits to the on-disk version of Armchair, and want to see them in your browser, just run `couchapp push . http://127.0.0.1:5984/elog` again. **You probably want to setup your `.couchapprc` file.** You should read the CouchApp readme to learn about that.

You can customize the blog title and other stuff in the `elog.json` file.

# Relax

[Visit your new elog.](http://127.0.0.1:5984/elog/_design/armchair/_list/index/recent-posts?descending=true&limit=5)

## License

Licensed under Apache 2.0: http://www.apache.org/licenses/LICENSE-2.0

