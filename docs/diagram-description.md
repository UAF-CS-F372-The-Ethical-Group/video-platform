## Architecture Diagram

![architechture diagram](./architechture-diagram.svg)

Our architecture diagram contains three layers, the Web Browser,
Application Backend, and Database. The Web Browser layer handles the
display of information via HTML, as well as serves the purpose of
handling user interaction. The Web Browser communicated with the
Application Backend using HTTP requests and HTML Web Pages. The
application Backend consists of a Deno application running an Express
server, that serves data and facilitates communication between the Web
Browser and the Database. Using a MongoDB Client, the Application
Backend communicates with the Database, which is a MongoDB instance.
The Database handles storage and querying of all persistent data for
the application.

## Activity Diagram

![activity diagram](./activity-diagram.svg)

This diagram shows the flow of user interactions throughout the app.
Viewers sign in and watch videos that content editors have uploaded.
Viewers like and dislike videos according to their preference. The
likes and dislikes on videos from viewers are reviewed by marketing
managers, who can leave comments on videos. Based on the comments on
videos, content editors can choose how to manage the video library.

## Class Diagram

![class diagram](./class-diagram.svg)

This diagram shows the structure of the database classes, and how
users and movies relate to likes. The ID of a movie and user are used
to construct its associated like.

## Sequence Diagram

![sequence diagram](./sequence-diagram.svg)

This diagram shows the flow of information between the different
stages of the architecture as the Gallery page is loaded.

## Use Case Diagram

![use case diagram](./use-case-diagram.svg)

This diagram shows the different actors and the associated use cases
that they would desire from the video platform.
