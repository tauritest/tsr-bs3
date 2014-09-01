module.exports = {
  	//https://github.com/dciccale/grunt-processhtml
    dev: {
    	options: {
            recursive: true,
            process: true,
	    	data: {
	        	message: 'Elion development!'
	      	}
	    },
        files: {
            'dev-build/index.html': ['app/index.html']
        }
    },

    dist: {
      options: {
        process: true,
        data: {
          message: 'This is production distribution'
        }
      },
      files: {
        'public-build/index.html': ['app/index.html']
      }
    }

};