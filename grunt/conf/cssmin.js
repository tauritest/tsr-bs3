module.exports = {
  	//https://github.com/gruntjs/grunt-contrib-cssmin
    minify: {
	    expand: true,
	    cwd: '.temp/stylesheets/',
	    //src: ['*.css', '!*.min.css'],
	    src: ['styles.css'],
	    dest: 'public-build/styles/',
	    ext: '.min.css'
	}
};