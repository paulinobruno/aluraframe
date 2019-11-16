#!/bin/zsh
JAVA=$HOME/.sdkman/candidates/java/8.0.232-zulu/bin/java
DIR=server

docker-compose -f $DIR/docker-compose.yml up & sleep 5
$JAVA -jar $DIR/instalura.jar & sleep 10

echo "(Press Enter to interrupt...)"
read

PID=`ps | grep java | grep instalura.jar | cut -c 1-5`
echo "Matando processo $PID"
kill -9 $PID

docker-compose -f $DIR/docker-compose.yml down
