# Web Push setup — no email fallback

The package includes browser subscription, service-worker notification handling, and Apps Script storage in a `Push_Subscriptions` sheet.

## Apps Script properties

In Apps Script, open **Project Settings → Script properties** and add:

```text
VAPID_PUBLIC_KEY=your-public-vapid-key
PUSH_RELAY_URL=https://your-push-relay.example.com/send
```

Keep the private VAPID key only on the push relay server. Do not put it in GitHub or in `Code.gs`.

## Push relay contract

The relay receives JSON like this:

```json
{"title":"Kibidula KTC announcement","body":"Message","username":"ALL","tag":"announcement"}
```

It uses the stored subscription endpoint, `p256dh`, and `auth` values to deliver the Web Push notification. A small Node service using the `web-push` package can implement this relay.

Apps Script stores subscriptions and calls the relay, but it should not perform the Web Push ECDH/AES encryption itself.

## User flow

1. Host the frontend on HTTPS/GitHub Pages.
2. User signs in.
3. User opens the notification bell.
4. User taps **Enable phone notifications**.
5. User allows browser notifications.
6. The subscription is saved in `Push_Subscriptions`.

The in-app notification panel works even before the relay is configured.
