require 'subtle'
require 'sinatra/base'

class App < Sinatra::Base

  before do
    @images = [:name, :type].to_objects {[
               ['elephant',   'wide'],
               ['apple',      'tall'],
               ['tree',       'tall'],
               ['shark',      'wide'],
               ['pig',        'wide'],
               ['butterfly',  'tall'],
               ['helicopter', 'wide'],
               ['spider',     'wide'],
               ['curly',      'tall'],
               ['tallguy',    'tall'],
               ['wand',       'tall'],
               ['popsicle',   'tall'],
               ['dinosaur',   'tall']
              ]}
    @backgrounds = [
                     'plains',
                     'jungle',
                   ] 
  end

  get '/' do
    erb :edit
  end 
  
  get '/edit' do
    erb :edit
  end
end
