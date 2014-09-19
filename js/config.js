define(function(){
	var config = {};
	config.jqueryVersion="1.7.1.min";

	
	config.app = 'blog';             ////////////////////** Required//////////////////////////
	
	config.version = '2.0';
	config.build = '2001';
	config.debug = false; // kills cache of js/css files if true
	config.jqueryMobileEnable = false;
	config.extraScripts = []; // set to empty array if app does not require login
	
	config.offline = false;
	return config;
});