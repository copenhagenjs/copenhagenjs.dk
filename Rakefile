# Taken from http://blog.karlswedberg.com/Rakefile/
# Adapted from Scott Kyle's Rakefile
# http://github.com/appden/appden.github.com/blob/master/Rakefile

task :default => :server

desc 'Build site with Jekyll'
task :build do
  jekyll '--no-server --no-auto'
end

desc 'Build and start server with --auto'
task :server do
  jekyll '--server --auto'
end

desc 'Build and deploy'
task :deploy => [:build] do
  sh 'rsync -avz -e ssh --progress _site/ morgan@roderick.dk:/dana/data/www.copenhagenjs.dk/docs/'
end

def jekyll(opts = '')
  sh 'rm -rf _site'
  sh 'jekyll ' + opts
end