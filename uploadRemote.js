var express = require('express'),
    aws = require('aws-sdk'),
    bodyParser = require('body-parser');

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var app = express(),
    s3 = new aws.S3();

app.use(bodyParser.json());

app.post('/upload', function (req, res, next) {
    //console.log(req);
    //console.log(req.file);
    
    var base64 = req.body.image;
    const base64Data = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    // Remove header
    //var base64Data = base64.split(';base64,').pop();

    // Getting the file type, ie: jpeg, png or gif
    
    const type = base64.split(';')[0].split('/')[1];
    var time = Date.now(); 
    let imageName = `${time}.${type}`;
    const params = {
        Bucket: 'signalong-dev', // pass your bucket name
        //Key: 'contacts.csv', // file will be saved as testBucket/contacts.csv
        Key: imageName, // file will be saved as testBucket/contacts.csv
        Body: base64Data,
        ContentEncoding: 'base64', // required
        ContentType: `image/${type}`
        //ACL: 'public-read'
    };
    s3.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err
        console.log(`File uploaded successfully at ${data.Location}`)
        res.send("uploaded");
    });
    
    //res.send("Uploaded!");
});

app.listen(3001, function () {
    console.log(Date.now());
    console.log('Example app listening on port 3001!');
});

