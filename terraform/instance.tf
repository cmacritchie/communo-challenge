resource "aws_instance" "webserver-ec2" {
  ami = "ami-0c4f7023847b90238"
  instance_type = "t2.micro"
  key_name = aws_key_pair.deploy_react_key.key_name
  security_groups = ["webserver-ssh-terraform-sg"]
  tags = {
    Name = "Terraform_web_server"
  }
}