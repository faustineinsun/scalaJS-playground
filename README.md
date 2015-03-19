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

```
$ git push origin master --> push to Github Master branch
$ git push heroku master --> push to Heroku
$ heroku open
$ heroku logs --> tail
Procfile can set background worker process
$ heroku ps  --> check how many dynos are running
$ heroku ps:scale web=2 --> can reduce delay but it's expensive
$ npm install
$ foreman start web --> run app locally, use `curl` to test
```
    
