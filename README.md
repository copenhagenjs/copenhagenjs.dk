This is a Jekyll based website for CopenhagenJS.

See http://copenhagenjs.dk


Installation
============
```
sudo aptitude install rubygems bundler
cd copenhagenjs.dk
bundle install
rake
```

Serving the page
----------------

This will start up a web server on `localhost:4000`, include drafts and rebuild the page on every update:

```
jekyll serve -w -D
```
