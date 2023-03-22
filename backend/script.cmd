npx sequelize-cli model:generate --name users --attributes username:string,password_hash:string,email:string,first_name:string,last_name:string,telephone:string,priv:string

npx sequelize model:generate --name card --attributes user_id:integer,card_network:string,card_holder_name:string,card_number:string,card_expiry:string,card_cvv:string
  
npx sequelize model:generate --name discount --attributes discount_name:string,discount_description:string,discount_percentage:integer

npx sequelize model:generate --name category --attributes category_name:string,category_description:string

npx sequelize model:generate --name product --attributes product_name:string,product_description:string,category_id:integer,discount_id:integer

npx sequelize model:generate --name product_variant --attributes product_id:integer,variant_attribute:string,variant_level:string,variant_price:integer,variant_quantity:integer

npx sequelize model:generate --name cart_session --attributes user_id:integer,cart_session_total:decimal

npx sequelize model:generate --name cart_item --attributes session_id:integer,product_variant_id:integer,quantity:integer

npx sequelize model:generate --name delivery_address --attributes user_id:integer,address_line_1:string,address_line_2:string,city:string,country:string,postal_code:string

npx sequelize model:generate --name payment --attributes user_id:integer,card_network:string,card_holder_name:string,card_number:string,card_expiry:string,card_cvv:string

npx sequelize model:generate --name order_details --attributes user_id:integer,total:decimal,delivery_address_id:integer,payment_method:string,payment_id:integer,order_status:string

npx sequelize model:generate --name order_item --attributes order_id:integer,product_variant_id:integer,quantity:integer

npx sequelize model:generate --name review --attributes user_id:integer,product_id:integer,comment:string,rating:integer
