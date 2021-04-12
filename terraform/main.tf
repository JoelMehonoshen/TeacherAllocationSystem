module "tas_ec2" {
  source = "./modules/aws_tas"
  providers = {
    aws = aws
   }   
   name = "tas"
}
