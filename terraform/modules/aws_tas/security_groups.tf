resource "aws_security_group" "default" {
  name        = "${var.application_name}-security-group"
  description = "Default security group for the ${var.application_name} server."
  vpc_id      = aws_vpc.default.id 

  ingress {
    description = "ssh access for jess house"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["120.88.116.211/32"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}