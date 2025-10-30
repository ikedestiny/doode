# Makefile for Spring Boot + Gradle + Docker Compose project
# Author: Holy Ike
# Description:
#   Automates building a Spring Boot app and managing Docker containers safely.

# Commands
GRADLE = ./gradlew
DOCKER_COMPOSE = docker-compose
DC_FILE = compose.yaml

# Default target
all: up

# Helper: check if docker-compose.yml exists
check-docker:
	@if [ ! -f $(DC_FILE) ]; then \
		echo "❌ Error: $(DC_FILE) not found in the current directory."; \
		echo "   Please make sure Docker Compose configuration exists."; \
		exit 1; \
	fi

# 🧩 Build Spring Boot app and rebuild/start Docker containers
up: check-docker
	@echo "🚀 Building Spring Boot app and restarting Docker containers..."
	$(GRADLE) build -x test && $(DOCKER_COMPOSE) down && $(DOCKER_COMPOSE) up --build -d
	@echo "✅ Application built and containers are running."

# 🧱 Build the app (no Docker)
build:
	@echo "🔧 Building Spring Boot app..."
	$(GRADLE) clean build -x test
	@echo "✅ Build complete."

# 🐳 Start containers (no rebuild)
start: check-docker
	@echo "▶️ Starting Docker containers..."
	$(DOCKER_COMPOSE) up -d
	@echo "✅ Containers started."

# 🛑 Stop containers
stop: check-docker
	@echo "⏹️ Stopping Docker containers..."
	$(DOCKER_COMPOSE) down
	@echo "✅ Containers stopped."

# 🧼 Clean Gradle build artifacts
clean:
	@echo "🧹 Cleaning build files..."
	$(GRADLE) clean
	@echo "✅ Clean complete."

# 🧭 Show Docker container status
status: check-docker
	@$(DOCKER_COMPOSE) ps
