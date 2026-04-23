variable "project_name" {
  type        = string
  description = "Project name prefix"
  default     = "kujua-time"
}

variable "environment" {
  type        = string
  description = "Deployment environment"
  default     = "staging"
}

variable "aws_region" {
  type        = string
  description = "AWS region"
  default     = "eu-west-1"
}

variable "domain_name" {
  type        = string
  description = "Primary domain name"
  default     = "example.com"
}
