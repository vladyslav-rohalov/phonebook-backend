<h1>Phonebook APP.</h1>
<h2>Backend</h2>
<h2> <a href="https://github.com/vladyslav-rohalov/phonebook-frontend/">Frontend</a></h2>
<p>This repository is the backend part of my project and is a simple phonebook web
application. <a href="https://vladyslav-rohalov.github.io/phonebook-frontend/">Phonebook</a>
</p>
<h3>Languages and Tools</h3>
<ul>
    <li>
        <span><a href="https://nodejs.org/" target="_blank" rel="noreferrer">NodeJS</a>, environment was used</span>
    </li>
    <li>
        <span><a href="https://expressjs.com/" target="_blank" rel="noreferrer">ExpressJS</a>, this framework was used to create the app's backend</span>
    </li>
    <li>
        <span><a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">MongoDB</a>, to store data. </span>
    </li>
    <li>
        <span><a href="https://mongoosejs.com/" target="_blank" rel="noreferrer">Mongoosejs</a>, to work with the database on the server. </span>
    </li>
    <li>
        <span><a href="https://aws.amazon.com/ru/ec2/" target="_blank" rel="noreferrer">AWS EC2</a>, used to deploy the backend. </span>
    </li>
    <li>
        <span><a href="https://www.docker.com/" target="_blank" rel="noreferrer">Docker</a>, was used to create a container. </span>
    </li>
    <li>
        <span><a href="https://aws.amazon.com/ru/s3/" target="_blank" rel="noreferrer">AWS S3</a>, to store images from the phonebook. </span>
    </li>
    <li>
        <span><a href="https://github.com/expressjs/multer" target="_blank" rel="noreferrer">Multer</a>, was used to upload images to the server. </span>
    </li>
    <li>
        <span><a href="https://github.com/kelektiv/node.bcrypt.js" target="_blank" rel="noreferrer">Bcrypt</a>, used to hash passwords</span>
    </li>
    <li>
        <span><a href="https://github.com/expressjs/cors" target="_blank" rel="noreferrer">CORS</a>, middleware used to provide access to the backend</span>
    </li>
    <li>
        <span><a href="https://github.com/hapijs/joi" target="_blank" rel="noreferrer">Joi</a>, used to describe schemas and validate data </span>
    </li>
    <li>
        <span><a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank" rel="noreferrer">Jsonwebtoken</a>, this package is used to create tokens.         </span>
    </li>
     <li>
        <span><a href=" https://nodemailer.com/" target="_blank" rel="noreferrer">Nodemailer</a>, This package was used to send letters to email.</span>
    </li>
   
</ul>

<h3>Description</h3>
<p>In writing the backend I used the MVC model.</p>
 <ul>
        <li>For contacts and users we created a model that consists of schemas.</li>
        <li>For the processing of all methods for contacts and users there are controllers.</li>
        <li>For the processing of requests created routes, also for contacts and users.</li>
 </ul>
<p>Middlewares</p>
 <ul>
        <li>Authenticate - checks the user's bearer token. </li>
        <li>Validate ID - checks if there is such an ID.</li>
        <li>Upload, using the package Multer uploads image files, the number of images - 1, the maximum size - 5MB</li>
        <li>Validation of the request body - checking for scheme consistency</li>
 </ul>
<p>Helpers</p>
 <ul>
        <li>Controller wrapper - reused for all controllers.</li>
        <li>Mongoose error handler - used to change the error code.</li>
        <li>HTTP ERROR - used to handle client errors.</li>
        <li>S3 service - used to work with AWS</li>
        <li>Send mail - used to send a verification code to the mail when registering.</li>
 </ul>



<h4>Authentication controllers</h4>
   <ul>
        <li>Registration, method: post</li>
        <li>Log In, method: post</li>
        <li>Log Out, method: post</li>
        <li>Send verification token, method: post</li>
        <li>Resend verification token, method: post</li>
        <li>Get current User, method: get</li>
   </ul>

<h4>Contacts controllers</h4>
   <ul>
        <li>Get all contacts, method: get</li>
        <li>Get contact by ID, method: get</li>
        <li>Add a new contact, method: post</li>
        <li>Update an existing contact, method: patch</li>
        <li>Update a contact's status (Favorites), method: patch</li>
        <li>Delete contact, method: delete</li>
   </ul>   

<h4>Error handling </h4>
   <ul>
        <li>400: Bad Request</li>
        <li>401: Unauthorized</li>
        <li>402: Forbidden</li>
        <li>404: Not found</li>
        <li>409: Conflict</li>
   </ul>  

  
  
  

  
 

