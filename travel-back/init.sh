#!/bin/bash

# Create subdirectories
mkdir -p ./config
mkdir -p ./middleware
mkdir -p ./models
mkdir -p ./routes
mkdir -p ./controllers
mkdir -p ./public/uploads

# Create files
touch ./config/db.js
touch ./middleware/auth.js
touch ./middleware/upload.js
touch ./models/admin.js
touch ./models/voyage.js
touch ./routes/admin.js
touch ./routes/voyage.js
touch ./controllers/adminController.js
touch ./controllers/voyageController.js
touch ./.env
touch ./app.js