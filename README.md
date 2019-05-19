# devops
## based on https://github.com/Oxalide/terraform-fargate-example.git
IaaS consists of 
   1. an ECS container run via Fargate
   2. 2 pods in eu-west-1 & 2
   3. 2 autoscale groups for scaling up and down
   4. APi or web ingressed to a public subnet
   5. RDS created on a private subnet
   6. ALB to expose via cleverops.eu  
   7. postgres DB in RDS (minor change in the app to take in database _url)
   8. codepipline to pull in from github repo and deploy
    
