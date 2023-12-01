require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const db = require("./db");
const morgan = require("morgan");

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


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});