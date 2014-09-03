module.exports = function (grunt) {
  // load all configuration files
  var configuration = require("require-grunt-configs")(grunt, "grunt/conf");
  grunt.initConfig(configuration);

  // load custom tasks
  //grunt.loadTasks("grunt/task");

  // load installed npm tasks
  require("load-grunt-tasks")(grunt);

  // load mustatic modul
    grunt.loadNpmTasks('dbushell-grunt-mustatic');

  // Register the default tasks
  //grunt.registerTask('default', ['jshint']);

  // #1 init project
  grunt.registerTask('init-project', [
      'copy:copy_bootstrap_fonts_to_dev',
      'copy:copy_bootstrap_tsr_fonts_to_dev',
      'copy:copy_bootstrap_tsr_icons_to_dev',
      'sass:dev',
      'concat:js',
      'mustatic'
  ]);

  // #2 run project
  grunt.registerTask('serve', function (target) {
      grunt.task.run(['connect:livereload','watch','mustatic']);
  });

  // build project : make public version (copy all necessary files to public directory), merge all css and minimize it; merge all javascript and uglify it
  grunt.registerTask('build-project', ['sass:dist','concat:js','concat:css','processhtml:dist','cssmin','_uglify']);

  // DEV TASK
  grunt.registerTask('reset-project',['clean:resetProject']);
  grunt.registerTask('uninstall-project',['clean:uninstallProject']);

  // TEST
  grunt.registerTask('create-default-files', 'task', function (){
    //
    grunt.file.write('app/assets/testDelete/test.js',' // put here your code');
    grunt.log.writeln('Project created! ');
  });

};