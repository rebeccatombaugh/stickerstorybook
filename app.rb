require 'sinatra/base'

class App < Sinatra::Base
  get '/' do
    haml :edit
  end 
  
  get '/edit' do
    erb :edit
  end
end
