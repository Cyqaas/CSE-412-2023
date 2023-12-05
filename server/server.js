require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const db = require("./db");
const morgan = require("morgan");
const { log } = require("console");

const app = express();

// Create multer object
const imageUpload = multer({
    storage:multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'images/');
        },
        filename: function(req, file, cb) {
            cb(null, new Date().valueOf() + '_' + file.originalname);
        }
    })
});

app.use(cors());
app.use(express.json());


// Image upload
app.put('/posts/image/:postid', imageUpload.single('image'), async (req, res) => {
    try {
        const filepath = req.file.path;
        const result = await db.query("UPDATE posts SET image_path = $1 WHERE pid = $2 returning *", [filepath, req.params.postid]);
        res.status(200).json({
            status:"/image api",
            data: {
                post: result.rows[0]
            }
        });
    } catch(err) {
        console.log(err);
    }
});

// Image get
app.get('/posts/image/:postid', async (req, res) => {
    try {
        const dirname = path.resolve();
        const filepath = await db.query("SELECT image_path FROM posts WHERE pid = $1", [req.params.postid]);
        const fullfilepath = path.join(dirname, '/' + filepath.rows[0].image_path);
        console.log(fullfilepath);
        return res.sendFile(fullfilepath);
    } catch(err) {
        console.log(err);
    }
});

// Create comment
app.post('/posts/:postid/addcomment', async (req, res) => {
    try {
        const results = await db.query("INSERT INTO comments (pid, name, text, comment_date) VALUES ($1, $2, $3, $4) returning *;", [req.params.postid, req.body.name, req.body.text, req.body.comment_date]);
        res.status(201).json({
            status:"sucess",
            data: {
                comment:results.rows[0]
            }
        });
    } catch(err){console.log(err);}
});

// Get all posts
app.get("/posts", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM posts left join (SELECT pid as post_id, count(cid) FROM comments GROUP BY post_id) total on posts.pid = total.post_id ORDER BY pid DESC;");
        res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
                posts: results.rows
            }, 
        });
    } catch(err) {
        console.log(err);
    }
});

// Get a post
app.get("/posts/:postid", async (req, res) => {
    try {
        const post = await db.query("SELECT * FROM posts WHERE pid = $1;", [req.params.postid]);
        const comments = await db.query("SELECT * FROM comments WHERE pid = $1 ORDER BY cid DESC", [req.params.postid]);
        res.status(200).json({
            status: "sucess",
            data: {
                post: post.rows[0],
                comments: comments.rows
            },
        });
    } catch(err) {
        console.log(err);
    }
});

// Create a post
app.post("/posts", async (req, res) => {
    try {
        const result = await db.query("INSERT INTO posts (caption, post_date) VALUES ($1, $2) returning *", [req.body.caption, req.body.post_date]);

        res.status(201).json({
            status: "succes",
            data: {
                post: result.rows[0]
            }
        });
    } catch(err) {
        console.log(err);
    }
});

// Update a post
app.put("/posts/:postid", async (req, res) => {
    try {
        const result = await db.query("UPDATE posts SET caption = $1, post_date = $2 WHERE pid = $3 returning *",
         [req.body.caption, req.body.post_date, req.params.postid]);
        res.status(200).json({
            status: "succes",
            data: {
                post: result.rows[0]
            }
        });
    } catch(err) {
        console.log(err);
    }
});

// Delete a Post
app.delete("/posts/:postid", async (req, res) => {
    try {
        await db.query("DELETE FROM comments WHERE pid = $1", [req.params.postid]);
        await db.query("DELETE FROM posts WHERE pid = $1", [req.params.postid]);
        res.status(204).json({
            status: "sucess"
        });
    } catch(err) {
        console.log(err);
    }
})



/* JESSE JIMENEZ'S API  */

// Routes 

/*
    GET request to check if user has an account return true if so otherwise
    return false. Use this for the login page.  
*/  
app.get("/login/:email/:password", async (req, res) => 
{
    try
    {
        // object to email and password 
        const {email , password  }  = req.params;  
        const login = await db.query(`SELECT * FROM person WHERE email = '${email}' AND password = '${password}' `);
        console.log(email + " " + password);
        // Check if we get result
       
        if(login.rowCount != 0 )
        {
            console.log("Login success"); 
            res.json(true); 
            return true; 
        } 
        else
        {
            console.log("Login not succesful");
            res.json(false); 
        }
    }
    catch(err)
    {
        console.log(err.message); 
        res.json(false ); 

    }
    
    return false; 
}); 

// Get a uid of the user after succesful login/sign up
app.get("/loginUid/:email/:password", async (req, res) => 
{
    try
    {
        // object to email and password 
        const {email , password  }  = req.params;  
        console.log(email + " " + password);
        const login = await db.query(`SELECT uid FROM person WHERE email = '${email}' AND password = '${password}' `);
        console.log(email + " " + password);
        // Check if we get result
        let uid = login.rows[0].uid; 
        if(login.rowCount !== 0)
        {
            console.log("Login success got uid" + uid); 
            res.json({uid:uid}); 
            return {uid:uid}; 
        } 
        else
        {
            console.log("Login not succesful");
            res.json({uid:null}); 
        }
    }
    catch(err)
    {
        console.log(err.message); 
        res.json({uid:null}); 

    }
    
    return {uid:null}; 
}); 

/* 
    GET request to get the user information from the database for the profile page
*/
app.get("/profileGetInfo/:email/:password", async(req, res) => 
{
    try 
    {
        //email and password objects 
        const {email, password} = req.params; 
        const profileInfo = await db.query(`SELECT * FROM person WHERE email = '${email}' AND password = '${password}' `);
        res.json(profileInfo.rows[0]);
        console.log("visibility", profileInfo.rows[0].visibility);
    }
    catch (err) 
    {
        console.error(err.message);
    }
});

/* 
    PUT request to change the users name
*/
app.put("/profileEditName/:email/:password", async(req, res) => 
{
    try 
    {
        const {email, password} = req.params;
        const {name} = req.body;
        const updateName = await db.query(`UPDATE person SET name = '${name}' WHERE email = '${email}' AND password = '${password}' `);
        res.json("Name was updated!");
    }
    catch (err) 
    {
        console.error(err.message);
    }
});

/* 
    PUT  request to change the users bio
*/
app.put("/profileEditBiography/:email/:password", async(req, res) => 
{
    try 
    {
        const {email, password} = req.params;
        const {bio} = req.body;
        const updateName = await db.query(`UPDATE person SET biography = '${bio}' WHERE email = '${email}' AND password = '${password}' `);
        res.json("Biography was updated!");
    }
    catch (err) 
    {
        console.error(err.message);
    }
});

/* 
    PUT  request to change the users details
*/
app.put("/profileEditEmail/:uid", async(req, res) => 
{
    try 
    {
        const {uid} = req.params;
        console.log(uid); 
        const {email} = req.body;
        console.log(email); 
        const updateEmail = await db.query(`UPDATE person SET email = '${email}' WHERE uid = ${uid} `);
        res.json(true);
        return true; 
    }
    catch (err) 
    {
        console.error(err.message);
        res.json(false);
        return false; 
    }
});

/* 
    PUT  request to change the users details
*/
app.put("/profileEditVisibility/:uid", async(req, res) => 
{
    try 
    {
        const {uid} = req.params;
        const {option} = req.body;
        let vs = null; 
        console.log("option:" + option);
        if(option === true)
        {
            vs = 'true';
        }
        else
        {
            vs = 'false'; 
        }

        console.log(vs); 
        const updateVisibility = await db.query(`UPDATE person SET visibility = $1 WHERE uid = ${uid} `,[vs]);
        res.json(updateVisibility);
    }
    catch (err) 
    {
        console.error(err.message);
    }
});

/*
    POST request, create a new account and insert it into the database
*/ 
app.post("/signup",async (req, res)=> 
{
    try
    {
        // Get info 
        const {email, password, name, date_of_birth } = req.body;
        
        console.log(date_of_birth); 
     
        const signUp = await db.query(`INSERT INTO person(uid, email, password , name , date_of_birth, biography, post_count, friend_count, profile_picture, visibility ) 
        VALUES (DEFAULT,'${email}', '${password}', '${name}', '${date_of_birth}'  , DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT)`);

      
        res.json(true); 
        return true;
    }
    catch(err)
    {
        console.log(err.message);
        res.json(false); 
        return false; 
    }
    

}); 

// get a person 



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});