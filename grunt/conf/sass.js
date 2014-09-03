module.exports = {
  	//https://github.com/sindresorhus/grunt-sass
    dev: {
	    options: {                      // Dictionary of render options
	      	outputStyle: 'nested',
	      	sourceComments: 'normal',
	      	sourceMap:true
	    },
	    files: {
	      /*'dev-build/assets/styles/bootstrap.css': 'bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap.scss',
	      'dev-build/assets/styles/bootstrap-tsr.css': 'app/assets/styles/bootstrap.scss',*/
	      'dev-build/assets/styles/bootstrap.merged.css': 'app/assets/styles/bootstrap.scss'
	    }
	},

	dist: {                             // Target
	    options: {                      // Dictionary of render options
	    	outputStyle: 'compressed',
	      	sourceComments: 'none'
	    },
	    files: {
	      /*'public-build/assets/styles/bootstrap.css': 'bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap.scss',
	      'public-build/assets/styles/bootstrap-tsr.css': 'app/assets/styles/bootstrap.scss',*/
           'public-build/assets/styles/styles.css':['bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap.scss','app/assets/styles/bootstrap.scss']
	    }
	},
};