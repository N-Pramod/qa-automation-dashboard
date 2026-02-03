# 🧪 QA Automation Dashboard

## 📌 Overview
The **QA Automation Dashboard** is an end-to-end platform designed to centralize automation test execution results, CI pipeline data, and quality metrics into a single, easy-to-understand dashboard.

It eliminates the need to manually inspect Jenkins logs or raw test reports by providing real-time analytics, trends, and visual insights for QA teams.

---

## 🎯 Problem Statement
In many QA projects:
- Automation results are scattered across Jenkins logs and reports
- QA leads lack a centralized view of test health
- Identifying trends and recurring failures is time-consuming

This project solves that by:
- Automatically collecting test execution data
- Persisting results in a database
- Visualizing metrics through a dashboard

---

## 🏗️ High-Level Architecture

Selenium + TestNG
↓
Jenkins
↓
Spring Boot Backend
↓
PostgreSQL Database
↓
React Dashboard


---

## 🚀 Version 1 – Smart Test Automation Dashboard (CORE)

### ✅ Features Implemented

### 🔹 Automation Execution Ingestion
- Accepts test execution data via REST APIs
- Supports TestNG XML report parsing (`testng-results.xml`)
- Automatically determines PASS / FAIL status

### 🔹 Jenkins CI Integration
- Jenkins job runs automation tests
- Posts execution results to backend APIs
- Dashboard updates automatically after each CI run
- Handles failed builds gracefully

### 🔹 Backend (Spring Boot)
- REST APIs for executions and analytics
- Spring Data JPA for persistence
- PostgreSQL database integration
- Auto schema generation using Hibernate

### 🔹 Analytics & Metrics
- Total runs
- Passed runs
- Failed runs
- Pass percentage
- Failure rate
- Execution trend over time
- Project-wise pass percentage

### 🔹 Frontend Dashboard (React)
- Summary cards for key metrics
- Execution trend chart
- Project-wise analytics chart
- Clean and responsive UI
- Color-coded pass/fail indicators

---

## 🧰 Tech Stack

### 🔹 Automation & CI
- Selenium
- TestNG
- Jenkins
- Maven

### 🔹 Backend
- Java
- Spring Boot
- Spring Data JPA
- PostgreSQL

### 🔹 Frontend
- React
- Axios
- Chart.js

---

## ⚙️ Setup Instructions (Local)

### 🗄️ Database Setup
```sql
CREATE DATABASE qa_dashboard;
Configure application.properties:
spring.datasource.url=jdbc:postgresql://localhost:5432/qa_dashboard
spring.datasource.username=postgres
spring.datasource.password=postgres

Run backend using mvn spring-boot:run
Run frontend using npm install and npm run dev

Status:
Version 1 completed and interview-ready

Author
Pramod N – QA Engineer | Automation | CI/CD | Test Analytics