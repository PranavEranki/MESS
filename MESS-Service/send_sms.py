# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
account_sid = 'AC556491a3374d129f1b275ae5df8e5030'
auth_token = '6056896333a4a5b2624bb97341220451'
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Testing sending to text to Twilio",
                     from_='+17178961221',
                     to='+19093482412'
                 )

print(message.sid)