class StatesGamesController < ApplicationController
    def index
        states_games = StatesGame.all
        render json: states_games, only: [:id, :difficulty]
    end

    def create
        render json: StatesGame.create(states_games_params)
    end

    private 

    def states_games_params
        params.require(:states_game).permit(:difficulty)
    end
end
