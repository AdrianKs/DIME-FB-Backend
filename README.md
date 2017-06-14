"# DIME-FB-Backend"

Pushproblems

branch: ionicPush
plugins: phonegap-plugin-push
		 @ionic-native/push (hab hier auch schon ein anderes probiert (angular/push oder sowas...)

links:
	https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/PAYLOAD.md#notification-vs-data-payloads
	https://ionicframework.com/docs/native/push/

code zu finden in app.componenent.ts in initializeApp()
	allerdings nur code zum empfangen von pushbenachrichtigungen

Senden hab ich bisher über das firebase-Backend gemacht
	Doku: https://firebase.google.com/docs/functions/get-started
	Code: https://github.com/AdrianKs/DIME-FB-Backend.git

Empfäger ist bisher mein handy hardgecodet, aber da könnt ihr ja einfach euren pushtoken einfügen (der wird auf der console ausgegeben, wenn man die app öffnet)
Wenn der firebase code geänder wird, kann er über "firebase deploy --only functions" hochgeladen werden.
FIrebase führt auch ein logfile.
Über folgenden link werden pushbenachrichtigungen versendet:
	https://us-central1-dime-ce246.cloudfunctions.net/addMessage?text=hierTextEinfuegen



Man kann aber auch über andere Plugins senden.

Normale Pushbenachrichtungen werden verarbeitet, wenn die app geöffnet wird, allerdings wird der eventhandler nicht angeworfen, wenn die app geschlossen ist...


