Some of the examples are from [hands-on scala.js](http://lihaoyi.github.io/hands-on-scala-js) (DOM) and [Scala.js Tutorial](http://www.scala-js.org/doc/tutorial.html) (jQuery in detail), 
some of them are written by myself.

```
$ sbt ~fastOptJS
$ sbt ~fullOptJS // the output js file is much more compact than `fastOptJS`
$ sbt compile
$ sbt package   // to .jar file
$ sbt run
$ sbt test
```

* [run examples on local](http://localhost:12345/target/scala-2.11/classes/index-dev.html)
* Publishing -> target/scala-2.11

