## RamJet - A Server Side Catchinng System 
### About 
 Ram jet is a server side catching system , that was built to reduce queries to the database and also improve read performance 

 ### API docs 
 
#### POST /login 
Request : ```
   {
   email:"John@gmaial.com",
   password:"12345"
   } ```

   Response : ``` 
  {
    "message": "Login successful",
    "status_code": 200,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUz"
} ```


 ### POST /register
 Request : ```
   {
   email:"John@gmaial.com",
   password:"12345",
   name:"jonny"
   } ```

   Response : ``` 
  {
    "message": "Login successful",
    "status_code": 200,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUz"
} ```
 

 
