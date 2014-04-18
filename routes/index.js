exports.index = function(req, res){
	res.render("index", {
        io_script:'/socket.io/socket.io.js',
        script:'/index.js',
        class_name:'index'
    });
};