const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

async function main() {
  const bucketName = 'sam-testing-presigned-put-test';
  const key = 'foo/bar/messi.png';

  const s3 = new S3Client();

  const command = new PutObjectCommand({ Bucket: bucketName, Key: key });
  const preSignedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  return {
    url: preSignedUrl,
  };
}

main().then((url) => {
  console.debug('Program finished, url = ');
  console.debug(url);
});
