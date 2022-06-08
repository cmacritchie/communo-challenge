resource "local_file" "inventory" {
    content  = "ubuntu@${aws_instance.webserver-ec2.public_ip}"
    filename = "../ansible/inventory"
}