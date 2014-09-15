module.exports = {
    copy_bootstrap_fonts_to_dev: {
        expand:true,
        cwd:'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/',
        src:'**',
        dest:'dev-build/assets/fonts/bootstrap/',
        flatten:false,
        filter:'isFile'
    },
    copy_bootstrap_tsr_fonts_to_dev: {
        expand:true,
        cwd:'app/assets/fonts/',
        src:'**',
        dest:'dev-build/assets/fonts/',
        flatten:false,
        filter:'isFile'
    },
    copy_bootstrap_tsr_icons_to_dev: {
        expand:true,
        cwd:'app/assets/ico/',
        src:'**',
        dest:'dev-build/assets/ico/',
        flatten:false,
        filter:'isFile'
    }
};