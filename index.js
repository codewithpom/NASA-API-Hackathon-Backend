const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 5050;
const bodyParser = require('body-parser');
const cors = require("cors");

app = express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

app.post('/create_account', async (req, res) => {
    const payload = req.body.payload;
    if (payload === undefined) {
        res.json({
            "Error": "Wrong Body"
        });
        return;
    }

    let data = JSON.parse(fs.readFileSync("data/bookmarks.json").toString());

    if (Object.keys(data).includes(payload["user_id"])) {
        res.json({ "Error": "Account already exists" });
        return;
    } else {
        data[payload["user_id"].toString()] = [];
        fs.writeFileSync("data/bookmarks.json", JSON.stringify(data));
        res.json({
            "Sucess": "Account Made Sucessfully"
        })
    }

})

app.post("/add_bookmark", async (req, res) => {
    const payload = req.body.payload;
    if (payload === undefined) {
        res.json({
            "Error": "Wrong Body"
        });
        return;
    }

    let data = JSON.parse(fs.readFileSync("data/bookmarks.json").toString());
    if (!Object.keys(data).includes(payload['user-id'])) {
        res.json({
            "Error": "Account does not exist"
        });
        return;
    }

    if (data[payload['user-id']].includes(payload.url)) {
        res.json({
            "Error": "Already Bookmarked it"
        });
        return;
    }

    data[payload['user-id']].push(payload.url);
    fs.writeFileSync("data/bookmarks.json", JSON.stringify(data));
    res.json({
        "Sucess": "Sucessfully Added bookmark"
    })
})

app.post("/bookmarks", async (req, res) => {
    const payload = req.body.payload;
    if (payload === undefined) {
        res.json({
            "Error": "Wrong Body"
        });
        return;
    }

    let data = JSON.parse(fs.readFileSync("data/bookmarks.json").toString());
    if (!Object.keys(data).includes(payload['user-id'])) {
        res.json({
            "Error": "Account does not exist"
        });
        return;
    }

    res.json(data[payload['user-id']])
    return;
})

app.post("/delete_bookmark", async (req, res) => {
    const payload = req.body.payload;
    if (payload === undefined) {
        res.json({
            "Error": "Wrong Body"
        });
        return;
    }

    let data = JSON.parse(fs.readFileSync("data/bookmarks.json").toString());
    if (!Object.keys(data).includes(payload['user-id'])) {
        res.json({
            "Error": "Account does not exist"
        });
        return;
    }

    if (!data[payload['user-id']].includes(payload.url)) {
        res.json({
            "Error": "Not Bookmarked"
        });
        return;
    }

    const index = data[payload['user-id']].indexOf(payload.url);
    data[payload['user-id']].splice(index, 1)
    fs.writeFileSync("data/bookmarks.json", JSON.stringify(data));
    res.json({
        "Done": "Removed the bookmark"
    })
})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})