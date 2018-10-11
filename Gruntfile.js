module.exports = function(grunt){
    
    //configuration
    grunt.initConfig({
        //pass in option to plugins, references to files 
        
        less: {
            development: {
                option: {
                    paths : ["less/"]
                },
                files: {
                    "style/css/style.css":"style/less/style.less"
                }
            }
        },
        babel: {
            files: {
                expand: true,
                src: ['src/Root.js'],
                dist:['style'],
                ext: '-compiled.js'
            },
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            }
        }

    });
    
    grunt.loadNpmTasks('grunt-contrib-less');

    
};