const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 5050;
const bodyParser = require('body-parser');
app = express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


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

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})