require 'sinatra/base'

class App < Sinatra::Base
  get '/' do
    haml :index
  end 
  
  get '/edit' do
    erb :edit
  end

  get '/test_storage' do
    erb :test_storage
  end
end
