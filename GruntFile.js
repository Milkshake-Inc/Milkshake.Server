module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-open');

    grunt.initConfig({
        nodemon: {
                dev: {
                    script: 'bin/App.js',
                    options: {
                        args: ['dev'],
                        nodeArgs: ['--debug'],
                        callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    },
                    env: {
                        PORT: '8181'
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['nodemon']);
}