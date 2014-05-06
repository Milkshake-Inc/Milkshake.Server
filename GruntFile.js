module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-nodemon');

    grunt.initConfig({
        nodemon: {
                dev: {
                    script: 'app.js',
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