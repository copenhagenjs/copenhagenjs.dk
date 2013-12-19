# Taken from http://blog.karlswedberg.com/Rakefile/
# Adapted from Scott Kyle's Rakefile
# http://github.com/appden/appden.github.com/blob/master/Rakefile

task :default => :server

desc 'Build site with Jekyll'
task :build do
  jekyll 'build'
end

desc 'Build and start server with --auto'
task :server do
  jekyll 'build'
  jekyll 'serve'
end

def jekyll(opts = '')
  sh 'rm -rf _site'
  sh 'jekyll ' + opts
end
