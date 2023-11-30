import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
} from "@aws-sdk/client-s3"; // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html

export function connectS3Client(accessKeyId, secretAccessKey, region) {
  // connect to s3 instance
  const s3Client = new S3Client({
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
    region: region,
  });
  return s3Client;
}

export function putS3(s3Client, bucketName, key, pdfBuffer) {
  // Put an object into an Amazon S3 bucket.
  const response = s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: pdfBuffer,
      ContentType: "application/pdf",
    })
  );
  return response;
}

export default async function uploadPDF2S3(
  accessKeyId,
  secretAccessKey,
  region,
  bucketName,
  pdfKey,
  pdfBuffer
) {
  try {
    const s3Client = connectS3Client(accessKeyId, secretAccessKey, region);
    const putS3Response = await putS3(s3Client, bucketName, pdfKey, pdfBuffer);
    return putS3Response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
