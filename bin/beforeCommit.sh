#! /bin/bash

# backup .env file
_WSPC_HOME="/Users/feiyu/workspace/"
cp ${_WSPC_HOME}scalaJS-playground/.env ${_WSPC_HOME}scalaJS-playground-backup/.env 
rm ${_WSPC_HOME}scalaJS-playground/.env
