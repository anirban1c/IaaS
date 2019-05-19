# devops

IaaS consists of 
    an ECS container run via Fargate
    2 pods in eu-west-1 & 2
    2 autoscale groups for scaling up and down
    APi or web ingressed to a public subnet
    RDS created on a private subnet
    ALB to expose via cleverops.eu  
    postgres DB in RDS (minor change in the app to take in database _url)
    codepipline to pull in from github repo and deploy
    