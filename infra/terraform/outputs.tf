output "artifact_bucket_name" {
  value = aws_s3_bucket.artifacts.bucket
}

output "api_log_group" {
  value = aws_cloudwatch_log_group.api.name
}
