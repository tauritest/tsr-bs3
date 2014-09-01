module.exports = {
	files: ['Gruntfile.js','app/assets/bootstrap-tsr/javascripts/{,*/}*.js'],
	options: {
	    globals: {
	    	jQuery: true,
	    	console: true,
	    	module: true
	    }
	}
}