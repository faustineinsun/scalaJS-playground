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

Spray
- [http://spray.io/](http://spray.io/)  
- [https://github.com/wandoulabs/spray-socketio](https://github.com/wandoulabs/spray-socketio)  
- [http://ibruce.info/2014/04/06/hello-spray/](http://ibruce.info/2014/04/06/hello-spray/)  

---

- $ `git rm -r --cached .idea`

---

### Heroku

#### AddOn + logs

```
$ heroku logs --> tail
$ heroku addons:add papertrail --> logging add-on
$ heroku addons:open papertrail
$ heroku addons:docs papertrail
$ heroku addons
```

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
local
$ vim .env
$ foreman start

remote
$ heroku config:set TIMES=2
$ heroku config
$ heroku open
```

#### Console

```
$ heroku run node
$ heroku run bash
```
    
