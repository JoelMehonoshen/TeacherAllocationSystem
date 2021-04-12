
resource "aws_default_vpc" "default" {}
data "aws_subnet_ids" "example" {
  vpc_id = aws_default_vpc.default.id
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  key_name = "" //TODO: update key resource
  security_groups = [aws_security_group.default.id]
  tags = {
    Name = var.application_name
  }
}