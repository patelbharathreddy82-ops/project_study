# AWS EC2 Web Application Deployment

A cloud deployment project demonstrating how a web application can be deployed and hosted on an AWS Linux server using SSH, Security Groups , and a web server .

## 📌 Project Overview 
This project demonstrate the deployement of a web application on an Amazon EC2 Linux instance.

The application was develoed using HTML, CSS ,and JavaScript and deployed to an EC2 instance configureed as a web server .

The project covers EC2 provisioning,Linux server configuration, SSH-based administration, Security Group coonfiguration ,web server setup, application deplyment, and application testing.

## ⚙️ Project Objectives
-Deploy a application on AWS ECC2
-Understand basic cloud infrastructure
-Configure a Linux-based server
-Connect to the server using SSH 
-Install and configure a wed application
-Deploy website files
-Make the application accessible over the internet

## 🛠️ Technologies Used
-HTML
-CSS
-JavaScript
-Linux
-AWS EC2
-SSH
-Git
-Github
-Nginx
## ☁️ AWS Services Used

 ### Amazon EC2
 used  to provision a virtual Linux server for hosting the web applicaion.
 ### Security Groups
 Used to control inbound and outbound network traffic to the EC2 instance.

##
draw.io/diagrams.net   __________
                       |  USERS  |
                           │
                           │ HTTP : 80
                           ▼
                  ┌─────────────────┐
                  │     Internet    │
                  └────────┬────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │    AWS Security Group  │
              │                        │
              │  Inbound:              │
              │  HTTP  → 80            │
              │  SSH   → 22            │
              └───────────┬────────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │      Amazon EC2        │
              │                        │
              │   Linux Server         │
              │        │               │
              │        ▼               │
              │    Apache/Nginx        │
              │        │               │
              │        ▼               │
              │   Web Application      │
              │                        │
              │  HTML + CSS + JS       │
              └────────────────────────┘

## 🏗️ System Architecture

The application is hosted on an AWS EC2 Linux instance.
Users access the application through the internet using HTTP.
The EC2 Security Group controls incoming traffic, while
the web server serves the HTML, CSS, and JavaScript files.

## 🔄 Project Workflow

1. User requests the website through the browser.
2. The request reaches the EC2 instance through the internet.
3. The Security Group allows HTTP traffic on port 80.
4. The web server receives the request.
5. The web server retrieves the application files.
6. HTML, CSS, and JavaScript are returned to the user's browser.
7. The website is rendered in the browser.

  
