6/15 3:00

login (using name)

global chatroom - list of names

private message directly to user, else global msg

persist messages:
    schema Chat: (username, socket, message, datetime, to (optional) )

using jade / express to serve up the prior chatroom (loses precision when same username leaves then re-joins (doesnt display to-messages) )

join / leave notifications

http://0.0.0.0:3000/ leads to portal
