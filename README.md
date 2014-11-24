# Turtle JS

A Javascript port of Turtle Roy

Try it online: [turtle-js.heroku.com/](http://turtle-js.heroku.com/)

# TurtleAPI

Command                     | Result
----------------------------|-------------------------------------------
fd(100)                     | moves 100 pixels forward
lt(45)                      | turns left 45 degrees
rt(90)                      | turns right 90 degrees
penup()                     | lifts the pen, no trace left when moving
pendown()                   | lowers the pen again for drawing
setshape("rocket-large")    | changes the cursor. available (with and without -large): butterfly, car, fairy, formula, princess, rocket, turtle
clear()                     | clear the paper and reset turtle to center
home()                      | reset the turtle to center
login("raimo")              | login as "raimo" (this is the author name in your saved work)
save("asdf")                | save current work as "asdf"
open("asdf")                | open saved work "asdf" (presuming you've saved with this name and current author name)
whoami()                    | show the author name of the logged-in user (this is just saved in a cookie)
ls()                        | list your saved works
bg("red")                   | change background color (red, rgb(255,0,0), #FF0000)
color("red")                | change pen color (red, rgb(255,0,0), #FF0000)
text("HELLO")               | draw the text "HELLO" beside the turtle
font("40px Arial")          | changes to the 40px Arial font
font(100)                   | changes to the 100px Courier font

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

See origins of the cursor images from src/main/webapp/images/image-sources.txt
