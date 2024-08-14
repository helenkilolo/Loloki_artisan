#!/bin/bash

# Start MongoDB
echo "Starting MongoDB..."
sudo docker start mongo-loloki

# Wait for MongoDB to fully start
sleep 5

# Start Backend Server
echo "Starting Backend Server..."
cd backend
PORT=5000 nodemon server.js &

# Wait for Backend Server to start
sleep 5

# Start Frontend Application
echo "Starting Frontend Application..."
cd ../
npm run dev
