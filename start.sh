#!/bin/bash

# Start MongoDB
echo "Starting MongoDB..."
sudo docker start mongo-loloki

# Start Backend Server
echo "Starting Backend Server..."
cd backend
PORT=5000 nodemon server.js &

# Start Frontend Application
echo "Starting Frontend Application..."
cd ../
npm run dev