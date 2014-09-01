module.exports = {

	livereload: {

		options: {
		  livereload: 35729
		},

		files: [
		  	'dev-build/{,*/}{,*/}*'
		]

    },

    js: {
		files: ['app/assets/scripts/{,*/}*.js'],
	    tasks: ['jshint','concat:js']// copy js to dev-build
	},

	sass:{
		files: ['app/assets/styles/{,*/}*.{scss,sass}'],
		tasks: ['sass:dev']
	},

	html: {
		files: ['app/*.html','app/pages/*.html','app/partials{,*/}*.html'],
		tasks: ['mustatic']
	}
};