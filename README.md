## Image Search Abstraction Layer
<b><i>Objective:</i></b> Build a full stack JavaScript app that is functionally similar to 
[this](https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10)
and and browse recent search queries like 
[this]( https://cryptic-ridge-9197.herokuapp.com/api/latest/imagesearch/).
 Then deploy it to Glitch.<br>
Note that for each project, you should create a new GitHub repository and a new Glitch 
project. If you can't remember how to do this, revisit 
[this](https://freecodecamp.org/challenges/get-set-for-our-api-development-projects).<br>
<br>
Here are the specific <b><i>user stories</i></b> you should implement for this project:
<br>
 - I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
 - I can paginate through the responses by adding a ?offset=2 parameter to the URL <b>(i)</b>.
 - I can get a list of the most recently submitted search strings.
<br><br>
<b>(i)</b><i>pagination changed to page={number} & limit={quantity} according to used in Flickr API scheme.
<p><i>FCC-backend-ImageSearchAbstractionLayer/npm start</i>
<br>
<i>https://vivid-jacket.glitch.me/</i>