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
               ['butterfly',  'wide'],
               ['helicopter', 'wide'],
               ['spider',     'tall'],
               ['curly',      'tall'],
               ['tallguy',    'tall'],
               ['wand',       'tall'],
               ['popsicle',   'tall'],
               ['dinosaur',   'tall'],
               ['ghost',      'tall'],
               ['house',      'tall'],
               ['lightning',  'tall'],
               ['fish',       'tall'],
               ['fish-purple','tall'],
               ['boat',       'tall'],
               ['hat',        'tall'],
               ['balloon',    'tall'],
               ['octo',       'tall'],
               ['cake',       'tall'],
               ['cat',        'tall'],
               ['pineapple',  'tall'],
               ['car',        'tall'],
               ['teddy',      'tall'],
               ['dolly',      'tall'],
               ['ralph',      'tall'],
               ['rapper',     'tall'],
               ['banana',     'tall'],
               ['kite',       'tall'],
               ['ashley',     'tall'],
               ['basketball', 'tall'],
               ['cone',       'tall'],
               ['curly-2',    'tall'],
               ['sunflower',  'tall'],
               ['flower-blue','tall'],
               ['bed',        'tall'],
               ['pizza',      'tall'],
               ['computer',   'tall'],
               ['iphone',     'tall'],
               ['pond',       'tall'],
               ['train-boxcar',   'tall'],
               ['train-red',      'tall'],
               ['christmas-tree', 'tall'],
               ['carrot',         'tall'],
               ['yellow-present', 'tall'],
               ['blue-present',   'tall'],
               ['giraffe',        'tall'],
               ['starfish',       'tall'],
               ['grandma',        'tall'],
               ['amoeba',         'tall'],
               ['saturn',         'tall'],
               ['red-present',    'tall'],
               ['mouse',          'tall'],
               ['ladder',         'tall'],
               ['popsicle',       'tall']
              ]}
    @backgrounds = [
                     'plains',
                     'jungle',
                     'ocean'
                   ] 
  end

  get '/' do
    erb :edit
  end 
  
  get '/edit' do
    erb :edit
  end
end
