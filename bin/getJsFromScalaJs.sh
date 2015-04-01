#! /bin/bash

_PROJECT_HOME="/Users/feiyu/workspace/scalaJS-playground/"
cd ${_PROJECT_HOME}libs/scalaJsHub
sbt fullOptJS
echo --getJsFromScalaJs.sh: generated example-opt.js* files


cp ${_PROJECT_HOME}libs/scalaJsHub/target/scala-2.11/example-opt.js* ${_PROJECT_HOME}public/js/scalaJS/
echo --getJsFromScalaJs.sh: copied files form ${_PROJECT_HOME}libs/scalaJsHub/target/scala-2.11/example-opt.js* to ${_PROJECT_HOME}public/js/scalaJS/
