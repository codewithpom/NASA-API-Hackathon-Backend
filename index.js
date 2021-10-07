const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 5050

app = express();

app.post('/create_account', function(req, res){
    let data = JSON.parse(fs.readFileSync("data/accounts.json").toString());
    
})


app.listen(PORT, ()=>{
    console.log('listening on port ' +PORT);
})