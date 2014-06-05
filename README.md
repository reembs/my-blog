my-blog
=======

Just a very simple blog in AngularJS, Node.js and MongoDB. Demonstrates use of Mocha for server testing and Karma for AngularJS testing.

Prerequisites: install npm (```sudo apt-get install npm```)

Prepare:
```npm install``` and ```./node_modules/bower/bin/bower install```

Test server:
```./node_modules/mocha/bin/mocha test/server```

Test client (requires Firefox, can be changed in karma.config.js):
```./node_modules/karma/bin/karma start karma.config.js```

Run:
```node bin/www```

