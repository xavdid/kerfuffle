require 'sinatra'
require 'sinatra/flash'
require 'sass'
require 'haml'
require 'json'

require 'pp'
require 'time'

configure do 

  # set :variable, 'value'

  if settings.development?
    # this is so we can test on multiple local devices
    set :bind, '0.0.0.0'
  end
end

# helpers

# before each route is run
before do

end

get '/' do
  # needs to pass explicit symbol because of root url
  haml :index
end

get '/search' do 
  haml :search
end

get '/show/?*?' do 
  haml :show
end

# renders css
get '/styles.css' do
  scss :the
end
