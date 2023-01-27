we need a form input of type file - <input type="file"/>.
In order to access this file within our javascript, we need to access this input field - let's assume we save it in a variable called input - then extract the file from that input field - input.files[0]
Now, we need to create a new piece of formData - const fd = new FormData()
Once we have that, we want to append our file to our form data and give it a key name as well - fd.append("avatar", input.files[0])
From here, we're ready to send our post. The only difference is, we won't have content type headers here, and we won't be stringifying our body, since files don't convert to json. So our configuration object will look like:
{
method: "POST",
body: fd
} 
Ok, on to the backend.
Whatever route you're posting to, you should be able to access this file from within that route using params  and whatever key you put in your form data. As long as you have your has_one_attached macro on your model, you can basically include the file like a regular attribute of that model:
Ex: user = User.create(username: params[:username], avatar: params[:avatar])
Then, in order to get the url we want to use, we can pass user.avatar to the url_for method: img_url = url_for(user.avatar)
This should generate the appropriate image url, which you can then send back to your frontend and use as the src for an img tag.
You could also potentially store this url in its own field within the user itself, although I haven't explored doing that
