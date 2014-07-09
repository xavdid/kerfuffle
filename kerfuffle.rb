require 'sinatra'
require 'sinatra/flash'
require 'sass'
require 'haml'
require 'json'

require 'pp'
require 'time'

require 'httparty'

configure do 

  # set :variable, 'value'

  if settings.development?
    # this is so we can test on multiple local devices
    set :bind, '0.0.0.0'
  end
end

# helpers
# so that the double routing doesn't totally fail
not_found do
  haml :index
end

# before each route is run
before do

end

get '/' do
  # needs to pass explicit symbol because of root url
  haml :index
end

get '/find_show/:query' do
  response = HTTParty.get("http://api.trakt.tv/search/shows.json/2fda7d38904aefdeb7da3222131906ad?query=#{params[:query]}&seasons=1")[0]

  if response
    response[:status] = 200
    return response.to_json
  else
    {status: 404, message: "not found"}.to_json
  end
end

post '/random' do
  # this is because sinatra doesn't take json input, apparently
  show = JSON.parse(request.env["rack.input"].read)

  episode = show['seasons'].reject{|hsh| hsh['season'] == 0}.sample['episodes'].sample
  
  response = HTTParty.get("http://api.trakt.tv/show/episode/summary.json/2fda7d38904aefdeb7da3222131906ad/#{show['show_id']}/#{episode['season']}/#{episode['number']}")['episode']
  response.to_json
end

get '/render_search' do 
  haml :search
end

get '/render_show/?*?' do 
  haml :show
end

# renders css
get '/styles.css' do
  scss :the
end
