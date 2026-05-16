# ROUTES

Base Url: https://nutech-test-api.up.railway.app

Version: /api/v1

Example: https://nutech-test-api.up.railway.app/api/v1/membership/registration

### Membership Endpoint

[POST] /membership/registration

[POST] /membership/login

[GET] /membership/profile

[PUT] /membership/profile/update

[PUT] /membership/profile/image

### Information Endpoint

[GET] /information/banner

[GET] /information/service

### Transaction Endpoint

[GET] /transaction/balance

[POST] /transaction/topup

[POST] /transaction/transaction

[GET] /transaction/transaction/history

# DDL

### nutech.users definition

CREATE TABLE "users" (
  "id" smallint NOT NULL AUTO_INCREMENT,
  "email" varchar(50) NOT NULL,
  "password" varchar(100) NOT NULL,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "image_path" varchar(300) DEFAULT NULL,
  "created_on" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_on" datetime DEFAULT NULL,
  "deleted_on" datetime DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "idx_email" ("email"),
  KEY "idx_deleted_on" ("deleted_on")
);

### nutech.banners definition

CREATE TABLE "banners" (
  "id" smallint NOT NULL AUTO_INCREMENT,
  "name" varchar(100) NOT NULL,
  "description" text NOT NULL,
  "image_path" varchar(300) NOT NULL,
  "created_on" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" smallint NOT NULL,
  "updated_on" datetime DEFAULT NULL,
  "updated_by" smallint DEFAULT NULL,
  "deleted_on" datetime DEFAULT NULL,
  "deleted_by" smallint DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "idx_name" ("name"),
  KEY "idx_deleted_on" ("deleted_on"),
  KEY "idx_created_by" ("created_by"),
  KEY "idx_updated_by" ("updated_by"),
  KEY "idx_deleted_by" ("deleted_by"),
  CONSTRAINT "banners_ibfk_1" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON UPDATE CASCADE,
  CONSTRAINT "banners_ibfk_2" FOREIGN KEY ("updated_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "banners_ibfk_3" FOREIGN KEY ("deleted_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

### nutech.services definition

CREATE TABLE "services" (
  "id" smallint NOT NULL AUTO_INCREMENT,
  "code" varchar(50) NOT NULL,
  "name" varchar(100) NOT NULL,
  "icon_path" varchar(300) NOT NULL,
  "tariff" decimal(15,0) NOT NULL,
  "created_on" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" smallint NOT NULL,
  "updated_on" datetime DEFAULT NULL,
  "updated_by" smallint DEFAULT NULL,
  "deleted_on" datetime DEFAULT NULL,
  "deleted_by" smallint DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "idx_code" ("code"),
  KEY "idx_name" ("name"),
  KEY "idx_deleted_on" ("deleted_on"),
  KEY "idx_created_by" ("created_by"),
  KEY "idx_updated_by" ("updated_by"),
  KEY "idx_deleted_by" ("deleted_by"),
  CONSTRAINT "services_ibfk_1" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON UPDATE CASCADE,
  CONSTRAINT "services_ibfk_2" FOREIGN KEY ("updated_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "services_ibfk_3" FOREIGN KEY ("deleted_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

### nutech.user_balances definition

CREATE TABLE "user_balances" (
  "id" smallint NOT NULL AUTO_INCREMENT,
  "user_id" smallint NOT NULL,
  "balance" decimal(15,0) NOT NULL,
  "created_on" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" smallint NOT NULL,
  "updated_on" datetime DEFAULT NULL,
  "updated_by" smallint DEFAULT NULL,
  "deleted_on" datetime DEFAULT NULL,
  "deleted_by" smallint DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "idx_user_id" ("user_id"),
  KEY "idx_created_by" ("created_by"),
  KEY "idx_updated_by" ("updated_by"),
  KEY "idx_deleted_on" ("deleted_on"),
  KEY "idx_deleted_by" ("deleted_by"),
  CONSTRAINT "user_balances_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE CASCADE,
  CONSTRAINT "user_balances_ibfk_2" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON UPDATE CASCADE,
  CONSTRAINT "user_balances_ibfk_3" FOREIGN KEY ("updated_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "user_balances_ibfk_4" FOREIGN KEY ("deleted_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

### nutech.user_transactions definition

CREATE TABLE "user_transactions" (
  "id" smallint NOT NULL AUTO_INCREMENT,
  "code" varchar(50) NOT NULL,
  "user_id" smallint NOT NULL,
  "service_code" varchar(50) DEFAULT NULL,
  "service_name" varchar(100) DEFAULT NULL,
  "type" enum('TOPUP','PAYMENT') NOT NULL,
  "description" varchar(100) NOT NULL,
  "total_amount" decimal(15,0) NOT NULL,
  "created_on" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" smallint NOT NULL,
  "updated_on" datetime DEFAULT NULL,
  "updated_by" smallint DEFAULT NULL,
  "deleted_on" datetime DEFAULT NULL,
  "deleted_by" smallint DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "idx_code" ("code"),
  KEY "idx_user_id" ("user_id"),
  KEY "idx_service_code" ("service_code"),
  KEY "idx_service_name" ("service_name"),
  KEY "idx_type" ("type"),
  KEY "idx_created_by" ("created_by"),
  KEY "idx_updated_by" ("updated_by"),
  KEY "idx_deleted_on" ("deleted_on"),
  KEY "idx_deleted_by" ("deleted_by"),
  CONSTRAINT "user_transactions_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE CASCADE,
  CONSTRAINT "user_transactions_ibfk_2" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON UPDATE CASCADE,
  CONSTRAINT "user_transactions_ibfk_3" FOREIGN KEY ("updated_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "user_transactions_ibfk_4" FOREIGN KEY ("deleted_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
