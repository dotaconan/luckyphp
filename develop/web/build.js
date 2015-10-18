({
	appDir: './',
	baseUrl: 'static/scripts',
	dir: '../../release/web',
	paths: {
		jquery: 'empty:',
		sn: 'empty:',
		qrcode: 'empty:',
		validate:'empty:'
	},
	preserveLicenseComments: false,
	fileExclusionRegExp: /^(test|r\.js|build|output|node_modules|todo|WEB-INF|ocx|.*\.bat$|.*\.less$|.*\.map$|.*\.psd$)/,
	optimizeCss: 'standard',
	modules: [
		{
			name: "home/page-home-index"
		}
	]
})