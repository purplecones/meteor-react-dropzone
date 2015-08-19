Meteor.startup(function () {
  if (Meteor.isServer) {

    // create an array of directive objects
    var directives = [];
    directives.push({
      name: 'image_upload_settings',
      settings: {
        allowedFileTypes: [
          'image/png', 'image/jpeg', 'image/gif'
        ]
      }
    });
    directives.push({
      name: 'all_upload_settings',
      settings: {
        allowedFileTypes: null
      }
    });

    // have slingshot create the directives
    MeteorReactDropzone.createSlingshotDirectives(directives);
  }

  if (Meteor.isClient) {
      React.render(<MeteorReactDropzoneComponent dropzoneId="DealDocumentDropzone"
              url="https://xxx.s3.amazonaws.com"
              identifier="1234"
              filePath="myFolder/"
              directiveName="all_upload_settings"
              meteorAddMethodName="addDocument"
               />,  document.getElementById("meteor-react-dropzone"));
  }
});

Meteor.methods({
  addDocument: function(identifier, fileMetadata) {
    // add to collection logic here
    console.log("identifier:", identifier);
    console.log("fileMetadata:", fileMetadata);
    console.log("document added...");
    return "documentId";
  }
});
