class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users, only: :username
    end

    def show
        user = User.find(params['id'])
        
        user_games = user.states_games 
        user_results_obj = {}
        
        user_games.each do |i|
            user_results_obj[i.difficulty] = i.scores[0]
        end 
        render json: user_results_obj
    end 

    def create
        user = User.find_or_create_by(username: user_params["username"])
        render json: user    
    end

    private 

    def user_params
        params.require(:user).permit(:username)
    end
    
end
