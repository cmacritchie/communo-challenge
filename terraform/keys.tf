resource "aws_key_pair" "deploy_react_key" {
  key_name = "terraform_web_key"
  public_key = file("../ansible/web-server-v2.pub")
}