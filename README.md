Example Chat app  
================  

Using latest express (4.x) and socket.io (1.0),  
and written with my latest best practices.  
 
Dependencies:  
mongodb -- developed using v2.6.1  
node.js -- developed using v0.10.25  
  
To install:  
npm install  

To run:  
node app.js  

Then open browser and navigate to http://0.0.0.0:3000/  
  

Initially displays active users and lets you join by providing a username  
  
Once joining, displays active users and messages logged by the group  

Exists as a single open chat room  

Private messages can be sent by clicking a user on the connected user list, and then sending a message  

Minor annoyances:  
    alerting when a user joins / leaves ( to disable: comment out client/client.js lines 55 and 64 )  
    needing to click the send button, rather than just pressing enter ( this is because I use a text area and not a form )  
  
Currently, mongodb empties the 'messages' collection whenever app.js is restarted. To disable this, comment out db.js lines 16,17 and 36  