terraform {
    required_version = ">= 0.14.5"
}

provider "aws" {
    profile = var.aws_profile
    region = var.aws_default_region
}