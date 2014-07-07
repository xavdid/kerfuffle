ENV['RACK_ENV'] = 'test'
require 'minitest/autorun'
require 'rack/test'

require_relative '../sinatra-rocket.rb'
include Rack::Test::Methods

class SinatraRocketTest < MiniTest::Test
  def app
    Sinatra::Application
  end

  def test_loads
    get '/'
    assert last_response.ok?
  end

  def test_it_says_hello_world
    get '/'
    assert last_response.body.include? 'Hello, World!'
  end

  def test_it_renders_header
    get '/'
    assert last_response.body.include? 'Header'
  end

  def test_display_doesnt_show_header
    get '/naked'
    refute last_response.body.include? 'Header'
  end

end