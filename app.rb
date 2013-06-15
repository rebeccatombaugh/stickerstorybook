require 'sinatra/base'

class App < Sinatra::Base
  get '/' do
    erb :edit
  end 
  
  get '/edit' do
    erb :edit
  end
end
