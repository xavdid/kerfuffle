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

# strips out arguments, perfect if your 
# route root matches your haml filename
def display(path = request.path_info[1..-1], layout = true)
  if layout
    haml "#{path}".to_sym
  else
    haml "#{path}".to_sym, layout: false
  end
end

# before each route is run
before do

end

get '/' do
  # needs to pass explicit symbol because of root url
  # display :index
  redirect '/search'
end

get '/search' do 
  display :index
end

get '/show' do 
  display :show
end

# renders css
get '/styles.css' do
  scss :the
end
