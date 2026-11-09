#!/bin/sh

# Gradle start up script for POSIX-compatible shells

DIRNAME=""
case "$0" in
  /*) DIRNAME=`dirname "$0"` ;;
  *)  DIRNAME=`dirname "./$0"` ;;
esac

APP_BASE_NAME=`basename "$0"`
APP_HOME="`cd "$DIRNAME" >/dev/null 2>&1 && pwd`"

CLASSPATH=$APP_HOME/gradle/wrapper/gradle-wrapper.jar

if [ -n "$JAVA_HOME" ] ; then
    JAVACMD="$JAVA_HOME/bin/java"
else
    JAVACMD="java"
fi

exec "$JAVACMD" -jar "$CLASSPATH" "$@"
