# Simple Registration Form Web Application

This is a simple Node.js web application using Express and Mongoose. Below are the instructions to set up and run the application.

## Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or later)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

---

## Installation and Setup

### 1. Clone or Download the Project

Download or clone the project repository to your local machine.

---

### 2. Navigate to the Project Directory

Open your terminal or command prompt and navigate to the project directory:

```

cd your-project-directory

```

### 3. Initialize npm (If Not Already Initialized)

If the project does not already have a package.json file, initialize it:

```

npm init --yes

```
This will create a basic `package.json` file.

### 4. Install Required Dependencies

Install the required Node.js packages for the project:

```

npm install express mongoose path nodemon

```

Installed Packages:

• `express` - For creating the web server

• `mongoose` - For interacting with MongoDB.

• `path` - For handling file and directory paths.

• `nodemon` - For automatically restarting the server during development.

### 5. Install Nodemon Globally (Optional)

To use `nodemon` as a global tool:
```

npm install -g nodemon

```
You can check the installed version:
```

nodemon -v

```

### 5. Create the `server.js` File

Ensure you have a `server.js` file in the project directory with the following content:

```javascript

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express();
app.use(express.static(path.join(__dirname, 'app')))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/students')
const db =mongoose.connection
db.once('open',()=>{
    console.log("connected to database")
})

const userSchema = new mongoose.Schema({
    name:String,
    age:String,
    program:String,
    yearsection:String
})

const Users = mongoose.model("data", userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'app/form.html'))
})

app.post('/post',async(req,res)=>{
    const {name,age,program,yearsection} = req.body
    const user = new Users ({
        name,
        age,
        program,
        yearsection
    })
    await user.save()
    console.log(user)
    res.send("Form Submitted")
})

app.listen(port,()=>{
    console.log("server is running on port")
})

```

### 7. Run the Application

Start the server using one of the following commands:

• Using Node.js:
```

node server.js

````

• Using Nodemon (for automatic restarts):
```

nodemon server.js

````

### 8. Access the Application

Open your web browser and go to:

```

http://localhost:3019

```

# Notes

• Ensure MongoDB is running before starting the server.

• You can customize the `PORT` variable in `server.js` as per your preference.
