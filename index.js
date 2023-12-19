const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const s3 = new AWS.S3();

async function main() {
  const bucketName = 'sam-testing-presigned-put-test';

  const key = 'test-upload-put-file.jpg';

  const s3Params = {
    Bucket: bucketName,
    Key: key,
    Expires: 300, // seconds
    ContentType: 'image/jpeg',
  };

  return await s3.getSignedUrlPromise('putObject', s3Params);
}

main().then((url) => {
  console.debug('Program finished, url = ');
  console.debug(url);
});
