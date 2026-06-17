output "vpc_id" {
  description = "ID of the thoughtFull VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value = [
    aws_subnet.public_1.id,
    aws_subnet.public_2.id
  ]
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value = [
    aws_subnet.private_1.id,
    aws_subnet.private_2.id
  ]
}

output "ec2_security_group_id" {
  description = "EC2 security group ID"
  value       = aws_security_group.ec2_sg.id
}

output "rds_security_group_id" {
  description = "RDS security group ID"
  value       = aws_security_group.rds_sg.id
}

output "backend_instance_id" {
  description = "EC2 instance ID for backend"
  value       = aws_instance.backend.id
}

output "backend_public_ip" {
  description = "Public IP address of backend EC2"
  value       = aws_instance.backend.public_ip
}

output "rds_endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = aws_db_instance.postgres.endpoint
}

output "frontend_bucket_name" {
  description = "S3 bucket name for frontend"
  value       = aws_s3_bucket.frontend.bucket
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name for frontend"
  value       = aws_cloudfront_distribution.frontend.domain_name
}