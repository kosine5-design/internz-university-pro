#!/bin/bash
# Internz University Pro - Automated Deployment Script
# Usage: ./deploy.sh [server-ip] [ssh-user]

set -e

IMAGE_NAME="internz-university-pro"
CONTAINER_NAME="iupro"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     INTERNZ UNIVERSITY PRO - AUTOMATED DEPLOYMENT            ║"
echo "╚══════════════════════════════════════════════════════════════╝"

# Check if deploying to remote server or locally
if [ -n "$1" ]; then
    SERVER_IP="$1"
    SSH_USER="${2:-ubuntu}"

    echo ""
    echo "→ Deploying to remote server: $SSH_USER@$SERVER_IP"
    echo ""

    # Save image locally
    echo "→ Saving Docker image..."
    docker save $IMAGE_NAME:latest | gzip > /tmp/$IMAGE_NAME.tar.gz

    # Copy to server
    echo "→ Copying image to server..."
    scp /tmp/$IMAGE_NAME.tar.gz $SSH_USER@$SERVER_IP:~/$IMAGE_NAME.tar.gz

    # Deploy on server
    echo "→ Deploying on server..."
    ssh $SSH_USER@$SERVER_IP << 'ENDSSH'
        # Install Docker if not present
        if ! command -v docker &> /dev/null; then
            echo "Installing Docker..."
            curl -fsSL https://get.docker.com | sh
            sudo usermod -aG docker $USER
        fi

        # Load image
        echo "Loading image..."
        gunzip -c ~/$IMAGE_NAME.tar.gz | docker load

        # Stop old container
        docker stop iupro 2>/dev/null || true
        docker rm iupro 2>/dev/null || true

        # Run new container
        docker run -d \
            --name iupro \
            --restart unless-stopped \
            -p 80:3000 \
            -p 443:3000 \
            internz-university-pro:latest

        # Cleanup
        rm ~/$IMAGE_NAME.tar.gz
        docker image prune -f

        echo ""
        echo "✓ Deployment complete!"
        echo "→ Site available at: http://$(curl -s ifconfig.me)"
ENDSSH

    # Cleanup local
    rm /tmp/$IMAGE_NAME.tar.gz

else
    echo ""
    echo "→ Running locally on port 3001"
    echo ""

    # Stop existing container
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true

    # Run container
    docker run -d \
        --name $CONTAINER_NAME \
        --restart unless-stopped \
        -p 3001:3000 \
        $IMAGE_NAME:latest

    echo ""
    echo "✓ Running locally!"
    echo "→ Open: http://localhost:3001"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    DEPLOYMENT COMPLETE                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
