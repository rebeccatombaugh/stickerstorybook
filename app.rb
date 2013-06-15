require 'subtle'
require 'sinatra/base'

class App < Sinatra::Base

  before do
    @images = [:name, :type].to_objects {[
               ['elephant', 'wide'],
               ['apple',    'tall']
              ]}
  end

  get '/' do
    erb :edit
  end 
  
  get '/edit' do
    erb :edit
  end
end
