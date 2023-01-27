class UsersController < ApplicationController
    def create
        user = User.create(username: params[:username], avatar: params[:file])
        puts params
        url = url_for(user.avatar)
        render json: {user: user, url: url}
    end

    def index
        render json: {message: "connected"}
    end

end
