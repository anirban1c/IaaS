region                        = "eu-west-1"
domain                        = "cleverops.eu"

/* rds */
production_database_name      = "db"
production_database_username  = "postgres"
production_database_password  = "3x4mpl3"

// generate - openssl rand -hex 64
/* secret key */
production_secret_key_base    = "4b6b809b03896b39b6741651060770a4c59d539c0c7de6e73e4c5eda985ae5c0feeaeac1a9dc4b2ff33a2b81cef4d9f8052674f607f3ccfa24799b1e92b4a29d"