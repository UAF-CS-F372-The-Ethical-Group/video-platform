# Architecture Diagram

![diagram](./architechture-diagram.svg)

Our architecture diagram contains three layers, the Web Browser,
Application Backend, and Database. The Web Browser layer handles the
display of information via HTML, as well as serves the purpose of
handling user interaction. The Web Browser communicated with the
Application Backend using HTTP requests and HTML Web Pages. The
application Backend consists of a Node.JS server running an Express
application, that serves data and facilitates communication between
the Web Browser and the Database. Using a MongoDB Client, the
Application Backend communicates with the Database, which is a MongoDB
instance. The Database handles storage and querying of all persistent
data for the application.
