const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/screams', (req, res) => {
    admin
    .firestore()
    .collection('screams')
    .orderBy('createdAt', )
    .get()
    .then((data) => {
          let screams = [];
          data.forEach((doc) => {
              screams.push({
                  screamId: doc.id,
                  body: doc.data().body,
                  userHandle: doc.data().userHandle,
                  createdAt: doc.data().createdAt
              });
          });
          return res.json(screams);
      })
      .catch((err) => console.error(err));
})

app.post('/scream', (req, res) => {
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    admin.firestore()
    .collection('screams')
    .add(newScream)
    .then((doc) => {
        res.json({ message: `document ${doc.id} created suxsessfully`});
    })
    .catch((err) => {
        res.status(500).json({error: 'Something is broke my dude'});
        console.error(err);
    });
});

// https://baseurl.com/api/screams is best practice some cases api will start baseurl.com
exports.api = functions.https.onRequest(app);