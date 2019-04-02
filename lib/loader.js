exports.loader = function () {
    require('async').series({
        controllers: function loadControllers(cb) {
            let controllers = require('include-all')({
                dirname: require('path').join(__basedir, 'controllers'),
                filter: /(.+Controller)\.js$/,
                excludeDirs: /^\.(git|svn)$/
            });
            return cb(null, controllers);
        },
        models: function loadModels(cb) {
            let models = require('include-all')({
                dirname: require('path').join(__basedir, 'db', 'models'),
                filter: /(.+Model)\.js$/,
                excludeDirs: /^\.(git|svn)$/
            });
            return cb(null, models);
        },
        repositories: function loadRepositories(cb) {
            let repos = require('include-all')({
                dirname: require('path').join(__basedir, 'repositories'),
                filter: /(.+Repository)\.js$/,
                excludeDirs: /^\.(git|svn)$/
            });
            return cb(null, repos);
        },
        services: function loadServices(cb) {
            let service = require('include-all')({
                dirname: require('path').join(__basedir, 'services'),
                filter: /(.+Service)\.js$/,
                excludeDirs: /^\.(git|svn)$/
            });
            return cb(null, service);
        }
    }, function (err, files) {
        if (err) {
            console.error(' FAILED TO LOAD ALL THE FILES');
            process.exit(1);
        } else {
            global.nf = files;
        }
    });
}