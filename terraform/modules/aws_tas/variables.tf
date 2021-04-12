variable "application_name" {
    type = string
    description = "The application name."
}

variable "instance_type" {
  type = string
  description = "Size of Instance in AWS"
  default = "t2.micro"
}