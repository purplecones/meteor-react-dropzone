if (Meteor.isServer) {
	MeteorReactDropzone = {};
	MeteorReactDropzone.createSlingshotDirectives = function (directives) {
    var settings = Meteor.settings.aws.s3,
      s3_upload_settings = {
        maxSize: settings.maxSize,
        bucket: settings.bucket,
        region: settings.region,
        AWSAccessKeyId: settings.client.id,
        AWSSecretAccessKey: settings.client.secret,
        acl: settings.acl,
        key: function (file, metaContext) {
          return metaContext.filePath + metaContext.id + "/" + file.name
        },
        authorize: function () {
          if (!this.userId) {
            var message = "Please login before posting files"
            throw new Meteor.Error("Login Required", message)
          }
          return true
        }
      }

		_.each(directives, function (directive) {
			_.defaults(directive.settings, s3_upload_settings);
			Slingshot.createDirective(directive.name, Slingshot.S3Storage, directive.settings);
		});
	};
}
