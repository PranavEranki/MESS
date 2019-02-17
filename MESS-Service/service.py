# /usr/bin/env python
from flask import Flask, request, redirect, jsonify, render_template
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client
from wit import Wit
import pandas as pd
from datetime import datetime
import base64
import requests
import json
import ast
pd.set_option('display.max_colwidth', -1)

account_sid = 'AC556491a3374d129f1b275ae5df8e5030'
auth_token = '6056896333a4a5b2624bb97341220451'
wit_access_token = 'Q4VPDZLG2MRBMEOSXSTIZDY3QIROYCRP'
disaster_df = pd.DataFrame(columns=['date', 'time', 'name', 'from', 'text', 'disaster', 'severity', 'location', 'lat', 'lng', 'address', 'image'])
disaster_list = []
twilio_client = Client(account_sid, auth_token)
wit_client = Wit(wit_access_token)
GOOGLE_MAPS_API_URL = 'http://maps.googleapis.com/maps/api/geocode/json'

app = Flask(__name__)

@app.route('/viewTable', methods = ['GET'])
def viewTable():
	return render_template('table.html', data=disaster_df.to_html())

@app.route("/getJSON", methods=['GET'])
def getJSON():

	print(('[INFO] current data:\n', disaster_df))
	# return disaster_df.to_json()
	return jsonify(disaster_list)

@app.route("/sms", methods=['GET', 'POST'])
def collect_and_respond():
	"""
	Respond to incoming data and collect text info
	"""
	# print(request.form)
	sent_text = request.form['Body']
	model_classification = wit_client.message(sent_text)
	data_row = dict()

	date_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
	data_row['date'] = date_time.split()[0]
	data_row['time'] = date_time.split()[1]
	data_row['from'] = request.form['From']

	for x in model_classification:
		if x == '_text':
			data_row['text'] = model_classification[x]
		if x == 'entities':
			entities_dict = model_classification[x]
			# print('[INFO] entities dictionary:', entities_dict)
	for x in entities_dict:
		# print('[TESTING]: ', 'wit_disaster' in entities_dict.keys())
		data_row['disaster'] = entities_dict['wit_disaster'][0]['value'] if 'wit_disaster' in list(entities_dict.keys()) \
								else ''
		data_row['location'] = entities_dict['location'][0]['value'] if 'location' in list(entities_dict.keys()) \
								else ''
		data_row['severity'] = entities_dict['sentiment'][0]['value'] if 'sentiment' in list(entities_dict.keys()) \
								else 'neutral'
		data_row['name'] = entities_dict['name'][0]['value'] if 'name' in list(entities_dict.keys()) \
								else ''


	if 'location' in list(entities_dict.keys()):
		params = {
		    'address': data_row['location']
		}
		# Do the request and get the response data
		req = requests.get(GOOGLE_MAPS_API_URL, params=params)
		res = req.json()
		# Use the first result
		if (res['results']):
			result = res['results'][0]

			# print('[DEBUGGING]: ', result)
			# print('[DEBUGGING]: ', result['geometry']['bounds']['northeast']['lat'])
			try:
				data_row['lat'] = result['geometry']['location']['lat']
				data_row['lng'] = result['geometry']['location']['lng']
			except:
				data_row['lat'] = result['geometry']['bounds']['northeast']['lat']
				data_row['lng'] = result['geometry']['bounds']['northeast']['lng']
				

			data_row['address'] = result['formatted_address']
		# print('{address}. (lat, lng) = ({lat}, {lng})'.format(**geodata))
	else:
		data_row['lat'] = '39.952313'
		data_row['lng'] = '-75.163557'
		data_row['address'] = ''

	# ML
	try:
		data_row['image'] = request.form['MediaUrl0']
		image_64 = base64.b64encode(requests.get(request.form['MediaUrl0']).content)
		# url = "http://localhost:3000/api/image"
		url = 'https://cold-insect-12.localtunnel.me/api/image'
		data = {"base64": image_64}
		ml_request = requests.post(url, data=data,  headers={'Content-Type': 'application/x-www-form-urlencoded'})
		print('[INFO] image classifications: ', ml_request.content)
		x = ml_request.content
		x = ast.literal_eval(x)
		x = [n.strip() for n in x]
		data_row['labels'] = x
	except:
		print('[INFO] Error in getting classification labels')
		data_row['image'] = 'Not Available'

	global disaster_df
	global disaster_list

	disaster_df = disaster_df.append(data_row, ignore_index = True)
	disaster_list.append(data_row)

	print('[INFO] row to insert', data_row)
	print('[INFO] current data:\n', disaster_df)
	# print('[INFO] current list:\n', disaster_list)

	response = MessagingResponse()
	response.message("Hold tight, Help is on the way")
	return str(response)

@app.route("/send", methods=['GET', 'POST'])
def send_message():
	response_from_dashboard = request.get_json()['message']
	number_from_dashboard = request.get_json()['recipient']
	message = twilio_client.messages \
	            .create(
	                 body=response_from_dashboard,
	                 from_='+17178961221',
	                 to=number_from_dashboard
	             )
	return str(message)


if __name__ == "__main__":
	# global disaster_df
	app.run(debug=True)
