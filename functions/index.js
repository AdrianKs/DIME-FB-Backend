const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
      console.log('Uppercasing', event.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return event.data.ref.parent.child('uppercase').set(uppercase);
    });

exports.tryPush = functions.database.ref('/messages/{pushId}/original')
        .onWrite(event => {
        // Grab the current value of what was written to the Realtime Database.
        const original = event.data.val();
        console.log('Uppercasing', event.params.pushId, original);
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        //var registrationToken = "eDoOm2jQ8Ik:APA91bHnDGCaw0fzyo5HVu4A9SD8jvrs1iObhXHoB3Qm565x-tFVJnbjsQHFrEVQlV2LMy66gBswLNfqB0ak88RQXSNS4CvUEwnVfqHvxT5Iko-Yk6IxGYtnzcVcT-JZr-UIcgi5KBIs";
        var registrationToken = "epzU-__USXg:APA91bHP3ieifkPMJQx-VZv5EmHoN4XP08IU2dMu1J_47H-j6FE5lZJdHVmqRETZBstXAzADSgUFWwm5kQ_kCvmThUQonsQF42s97dyMxLAnC8u_k8ta3-tjWLWg9vWQwlF_iN-E5XxD";
        var payload1 = {
            notification: {
                title: "test",
                message: "test",
                payload: {
                  test: "test"
                },
                'content-available': "1"
            }
        };

        var payload2 = {
            notification: {
                title: "Urgent action needed!",
                body: "Urgent action is needed to prevent your account from being disabled!",
                'content-available': '1'
            }
        };
        // Set the message as high priority and have it expire after 24 hours.
        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };
        admin.messaging().sendToDevice(registrationToken, payload1, options)
            .then(function(response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function(error) {
                console.log("Error sending message:", error);
            });
        return admin.messaging().sendToDevice(registrationToken, payload2, options)
            .then(function(response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function(error) {
                console.log("Error sending message:", error);
            });
});