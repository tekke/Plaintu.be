source 'https://rubygems.org'

gem 'colored'

gem 'sass'
gem 'compass'

gem 'rake-pipeline', :git => 'https://github.com/livingsocial/rake-pipeline.git'
gem 'rake-pipeline-web-filters', :git => 'https://github.com/wycats/rake-pipeline-web-filters.git'

group :development do
  gem 'rack'
  gem 'rack-rewrite'
  gem 'rack-streaming-proxy'

  gem 'guard'
  gem 'guard-rake'

  gem 'rb-fsevent', :require => false
  gem 'rb-inotify', :require => false
end

group :production do
  gem 'therubyracer'
  gem 'uglifier'

  gem 'yui-compressor'
end
