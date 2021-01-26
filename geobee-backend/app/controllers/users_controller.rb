class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users, only: :username
    end

    def create
        render json: User.create(user_params)
    end

    private 

    def user_params
        params.require(:user).permit(:username)
    end
    
end
