# MESS-Service

To start the server run the following commands:
1. `python service.py`
1. `./ngrok http 5000`

## Endpoints

> Get & Post: Receive image and text from client, classify image and perform sentiment analysis on text, including extract location and update data
- `/sms`

> Get: return JSON of all disaster data
- `/getJSON/`

> Post: Send a message back to the client
- `/send`



## To Do
1. identify phrases including: location, image, name and make sure the pipeline doesn't break
	- My name is Matthew and there's a flood in chestnut Street, PA
	- I'm Varun in Chinatown, Philadelphia PA PLEASE HELP
	- There's a fire on Walnut st, PA  NEED HELP ASAP
	- Help I'm samay I'm stuck in a flood in the Philadelphia Zoo
1. exceptions & error handling
	- [ ] use python debugger
	- [ ] where user does not send image or does not send text
	- [x] catch exception where wit.AI identifies a location but Google maps does not
	- [ ] if image classification does not happen, do not delete image link
1. [ ] `utils.py` for wit.ai portion of service? https://www.reddit.com/r/flask/comments/21tve1/flask_app_design_where_to_put_helper_functions/


### Working with REST APIs (HTTP requests)
1. [request library](https://stackoverflow.com/questions/10434599/how-to-get-data-received-in-flask-request)
1. [requests library](http://docs.python-requests.org/en/master/user/quickstart/)
1. [python requests post](https://stackoverflow.com/questions/15900338/python-request-post-with-param-data)
	- params is for GET-style URL parameters, data is for POST-style body information. It is perfectly legal to provide both types of information in a request, and your request does so too, but you encoded the URL parameters into the URL already

### Flask
1. [intro to flask](https://pythonspot.com/flask-web-app-with-python/)
	- http://flask.pocoo.org/docs/0.12/quickstart/
1. Run Flask in [debugging mode](https://stackoverflow.com/questions/17309889/how-to-debug-a-flask-app)
```
export FLASK_APP=service.py
export FLASK_ENV=development
flask run
```

### Disaster identification via

1. NLP https://wit.ai/mdong127/natural_disaster_classification/
1. Image classification & object identification
	- [cloud vision](https://cloud.google.com/vision/docs/libraries#client-libraries-usage-python)

## Completed
1. [x] get latitude and longitude data using [maps API](https://gist.github.com/pnavarrc/5379521)
	- https://maps.googleapis.com/maps/api/geocode/json?address=chestnut%20Street,%20PA&key=AIzaSyD9YlYJ8l_JpfSAHa0P-hwz6sB-1HQXFoY
1. [x] [build web API using flask app](https://www.twilio.com/docs/sms/quickstart/python)
1. [x] [retrieve images using twilio API](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-download-images-incoming-mms-python-django#save-the-media-urls)
	- Save the Media URLs/. Depending on your use case, storing the URLs of the images (or videos or whatever) may be all you need. They are publicly accessible without any need for authentication which makes sharing easy.  They are permanent (unless you explicitly delete the media).  For example, if you are building a browser-based app that needs to display the images, all you need to do is drop an <img src="twilio url to your image"> tag into the page. If this works for you, then perhaps all you need is to store the URL in a database character field.  There are two key features to these URLs that make them very pliable for your use in your apps:
	- `https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json`
	- hitting twilio API: `https://api.twilio.com/2010-04-01/Accounts/AC556491a3374d129f1b275ae5df8e5030/Messages/MM0322b8cac483e5d4de9f4901aff5f458/Media/MEce57545917d402820b6c00acc3513760.json`
	- Your AccountSid and AuthToken are the "master keys" to your account. To authenticate using these "master keys," use HTTP basic auth with the username set to your AccountSid and the password set to your AuthToken. Your AccountSid and AuthToken can be found on your Account Dashboard.
	- https://www.twilio.com/docs/sms/api/media#instance
1. [x] virtual env necessary? - No
