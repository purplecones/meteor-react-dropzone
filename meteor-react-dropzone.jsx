MeteorReactDropzoneComponent = React.createClass({
  propTypes: {
// id given to the dropzone form elementdropzoneId: React.PropTypes.string.isRequired,
    dropzoneId: React.PropTypes.string.isRequired,

// url where item will be posted (AWS S3 bucket url)
    url: React.PropTypes.string.isRequired,

// id of document that file should be associated with
    identifier: React.PropTypes.string.isRequired,

// path where file should be uploaded to
    filePath: React.PropTypes.string.isRequired,

// directive name (declared below)
    directiveName: React.PropTypes.string.isRequired,

// meteor method that will add the document info to db
    meteorAddMethodName: React.PropTypes.string.isRequired,
  },
  componentDidMount () {
    $("#" + this.props.dropzoneId).dropzone({
      url: this.props.url,
      accept: (file, done) => {
        var metaContext = {
          id: this.props.identifier,
          filePath: this.props.filePath
        };

        var upload = new Slingshot.Upload(this.props.directiveName, metaContext)
        upload.file = file;
        upload.request(function (error, instructions) {
          if (error)
            done(error.message);
          else {
            file.postData = instructions.postData;
            done();
          }
        });
      },
      sending: function (file, xhr, formData) {
        _.each(file.postData, function (field) {
          formData.append(field.name, field.value);
        });
      },
      success: (result) => {
        var urlParts = result.postData[0].value.split('/');
        var props = {
          fileName: urlParts[urlParts.length - 1],
          url: result.xhr.responseURL + result.postData[0].value,
          type: result.postData[2].value,
          bucket: result.postData[1].value,
          size: result.upload.total
        }
        Meteor.call(this.props.meteorAddMethodName, this.props.identifier, props);
      }

    });
  },
  render() {
    return (
      <form action="/file-upload" className="dropzone" id={this.props.dropzoneId}></form>
    );
  }
});
