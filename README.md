# Turtle JS

Education focused version of Turtle for Javascript

# TurtleAPI

Command                     | Result
----------------------------|-------------------------------------------
fd(Number                   | moves (Number) pixels forward
bk(Number)                  | moves (Number pixels backward
lt(Number)                  | turns left (Number) degrees
rt(Number)                  | turns right (Number) degrees
pen(true/false/Number)      | lowers pen if 'true', lifts if 'false', changes width otherwise
home()                      | reset the turtle to center
clear()                     | clear the paper
reset()                     | resets the paper and the turtle to center
bg(String/rgb/#000000)      | change background color (red, rgb(255,0,0), #FF0000)
color(String/rgb/#000000)   | change pen color e.g. red, rgb(255,0,0), #FF0000
text(String)                | draw the String beside the turtle
font(String)                | changes font, e.g. "40px Arial" for 40px Arial font
font(Number)                | changes to the (Number)px Courier font

# Building and running

Build (and rebuild on javascript changes)

    npm install
    grunt

Run the server (node.js / express)

    ./server

And

    open http://localhost:8070

Optionally also start the mongo db

    ./runmongo

# Credits

Branched from original at github.com/raimohanska/turtle-js
See origins of the cursor images from src/main/webapp/images/image-sources.txt
