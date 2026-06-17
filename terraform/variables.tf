variable "aws_region" {
  description = "AWS region for thoughtFull infrastructure"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "thoughtfull"
}

variable "vpc_cidr" {
  description = "CIDR block for the thoughtFull VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# RDS PostgreSQL
variable "db_password" {
  description = "Password for the PostgreSQL database"
  type        = string
  sensitive   = true
}

