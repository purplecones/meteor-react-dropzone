Package.describe({
	name: 'purplecones:meteor-react-dropzone',
	version: '0.0.1',
	summary: 'React component that uses DropzoneJS and Slingshot',
	git: 'https://github.com/purplecones/meteor-react-dropzone.git',
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.1.0.2');

	api.use('react');
	api.use('edgee:slingshot');
	api.use('dbarrett:dropzonejs');

	api.addFiles('meteor-react-dropzone-settings.jsx', 'server');
	api.addFiles('meteor-react-dropzone.jsx');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('purplecones:meteor-react-dropzone');
	api.addFiles('meteor-react-dropzone-tests.js');
});
