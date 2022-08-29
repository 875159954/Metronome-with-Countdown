#!/bin/bash 
docker stop NextMetronome
docker-compose -f $1 build
docker-compose -f $1 up -d
