scalaJS-playground
===========================

- [http://www.scala-js-fiddle.com/](http://www.scala-js-fiddle.com/)  
- [http://lihaoyi.github.io/hands-on-scala-js/](http://lihaoyi.github.io/hands-on-scala-js/)
- [http://www.scala-js.org/doc/tutorial.html](http://www.scala-js.org/doc/tutorial.html)

---

```
$ sbt
> // set scalaJSStage in Global := FastOptStage // has been set in `local.sbt`, run code with Node.js
> run
> last
> reload // reload the build file if sbt is still running
> fastOptJS
> ~fastOptJS
> fullOptJS // takes tens of seconds, but can compress the compiled code
```

---

- $ `git rm -r --cached .idea`

---

## [Node Modules](https://github.com/joyent/node/wiki/modules)   

* template engine
    * [gaikan](https://github.com/Deathspike/gaikan) the fastest
    * [Jade](http://jade-lang.com/)
* [Bootstrap layoutit](http://www.layoutit.com/)
    * [Bootstrap Components](http://getbootstrap.com/components/#glyphicons) 

---

## [Heroku](https://devcenter.heroku.com/articles/how-heroku-works)

#### Scalability

```
Procfile can set background worker process
$ heroku ps  --> check how many dynos are running
$ heroku ps:scale web=2 --> can reduce delay but it's expensive
```

#### Run on local and remote machines

```
$ npm install
$ foreman start web --> run app locally, use `curl` to test
git commit and push
$ git push origin master --> push to Github Master branch
$ git push heroku master --> push to Heroku
$ heroku open --> run on heroku
```

#### Modify environment variable

```
local (Foreman)
$ bin/loadEnv4Foreman.sh --> load `.env` from backup dir (Foreman needs `.env`)  
$ vim .env
echo .env >> .gitignore  --> sensitive configuration values should not be committed to source-control
$ foreman start

remote (Heroku)
$ heroku config:set TIMES=2
$ heroku config
$ bin/beforeCommit.sh --> backup and delete .env in current folder
git commit and push
$ heroku open
```

#### [ClearDB MySQL](https://www.cleardb.com/developers/connect/paas/heroku/nodejs)

```
$ heroku addons:add cleardb:ignite
$ heroku config
$ heroku config:add DATABASE_URL=(the_copied_value_of_CLEARDB_DATABASE_URL)
$ heroku config -s | grep CLEARDB_DATABASE_URL >> .env
$ more .env
$ echo .env >> .gitignore --> sensitive configuration values should not be committed to source-control
$ bin/beforeCommit.sh --> backup `.env`
```

- [Setup Heroku MySQL credentials on node.js](http://stackoverflow.com/questions/18408012/connection-to-mysql-from-nodejs-on-heroku-server)  
    - [install mysql on node.js](https://www.npmjs.com/package/mysql) `$ npm install`
    - credential info are saved to `.env` and `heroku config:set`
    - add new connection on local MySQL with Heroku MySQL credentials -> create table, insert a record to mysql on local machine 
    - modify `index.js` and `package.json` 

#### [Memcached Cloud](https://devcenter.heroku.com/articles/memcachedcloud)

```
$ heroku addons:add memcachedcloud:25
$ heroku config
set Memcached Cloud credentials both through `.env` and `heroku config:set`
```

* [https://www.npmjs.com/package/memjs](https://www.npmjs.com/package/memjs)
    * include `memjs` into `package.json`, and then `$ npm install`

* [node-memcached](https://github.com/3rd-Eden/node-memcached) 

#### Console

```
$ heroku run node
$ heroku run bash
```

#### AddOn + logs

```
$ heroku logs --> tail
$ heroku addons:add papertrail --> logging add-on
$ heroku addons:open papertrail
$ heroku addons:docs papertrail
$ heroku addons
```
    
---

## Spray
- [http://spray.io/](http://spray.io/)  
- [https://github.com/wandoulabs/spray-socketio](https://github.com/wandoulabs/spray-socketio)  
- [http://ibruce.info/2014/04/06/hello-spray/](http://ibruce.info/2014/04/06/hello-spray/)  

