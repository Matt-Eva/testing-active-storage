# Using Active Storage

This will serve as a brief guide for implementing and using ActiveStorage with a rails API and a JavaScript frontend. This walkthrough only covers implementing ActiveStorage locally, and does not include information on how to integrate it with Amazon S3, Azure Storage, or Google Cloud Storage, although all three of those are addressed in some capacity by <a href="https://edgeguides.rubyonrails.org/active_storage_overview.html">rails docs</a>.

## Setting Up Rails API

This walkthrough uses ruby 2.7.6, rails 7.0.4, and the postgres gem - `pg` - 1.1.

To set up a new rails app, run this command from within the directory where you want your rails api to live - `rails new my_api_name --api --database=postgresql` - where `my_api_name` is the name you want to give this repository.

Once this is set up, cd into the directory and run `rails db:create` to create your local development database.

## Adding ActiveStorage

To set up active storage, make sure you're in the root directory of your project, then run `bin/rails active_storage:install`. This should set up a new migration that will add active storage to your database. If the migration is created successfully, you can run `bin/rails db:migrate` to add all of the tables ActiveStorage will be using to your database.

After migrating, you should see several ActiveStorage tables added to your database.

## Configuring CORS

This doesn't have to do with implementing ActiveRecord, but if you are going to be running your development server (or production frontend) on a different server than your backend, you'll likely want to configure cors in your application.

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
