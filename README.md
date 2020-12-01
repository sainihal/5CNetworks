# 5CNetworks
# Prolem Statment for Assignment
Following is an API which gives Github data

Request Type: GET
https://api.github.com/users/mralexgray/repos

The data received will have following keys:

{
	id: <>,
	name: <>,
	html_url: <>,
	description: <>,
	created_at: <>,
	open_issues: <>,
	watchers: <>,
	owner:{
		id: <>,
		avatar_url: <>,
		html_url: <>
		type: <>, 
		site_admin: <>
	}
}

You need to make 2 APIs

First API will take an endpoint in payload and fetch this data from that endpoint and save it into Postgres database (you can use locally hosted db)
Get the saved data by passing the “id”

Example: 
API 1: 
Method: POST,
URI: http://localhost:8000/github
Payload: { url: https://api.github.com/users/mralexgray/repos }
API 2:
Method: GET
URI: http://localhost:8000/github/<id>

Note (Important):
Saving in postgres should be a create or update method (i.e calling API 1 multiple times should not create more rows if there is already a row present with same “id”)
Use async await and loops to add the rows one by one (do not use bulk create methods)
