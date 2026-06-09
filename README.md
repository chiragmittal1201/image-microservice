# Image Processing Microservice

A full-stack image processing application that supports image uploads, compression, watermarking, duplicate detection, metadata tracking, analytics, and AWS S3 cloud storage integration.

## Features

* Single and multiple image uploads
* Drag-and-drop upload interface
* Image compression using Sharp
* Automatic watermarking
* Duplicate image detection using SHA-256 hashing
* Metadata and upload history tracking
* Analytics dashboard for upload statistics
* AWS S3 integration for processed image storage
* Public image access through S3 URLs

## Tech Stack

### Frontend

* React.js
* Axios
* Vite

### Backend

* Node.js
* Express.js
* Multer
* Sharp

### Cloud & Storage

* AWS S3
* JSON-based metadata storage

## Project Structure

```text
client/
├── src/
│   ├── components/
│   ├── services/
│   └── App.jsx

src/
├── controllers/
├── routes/
├── services/
├── middlewares/

uploads/
├── originals/
├── metadata/
```

## Environment Variables

Create a `.env` file in the project root:

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-southeast-2
AWS_BUCKET_NAME=image-microservice.dev
```

## Installation

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

## Run Backend

```bash
npm start
```

## Run Frontend

```bash
cd client
npm run dev
```

## API Endpoints

### Upload Single Image

```http
POST /api/upload
```

### Upload Multiple Images

```http
POST /api/upload-multiple
```

### Get Upload History

```http
GET /api/history
```

## Key Functionalities

* Compresses uploaded images into WebP format
* Applies watermark to processed images
* Stores processed files in AWS S3
* Tracks upload history and compression statistics
* Prevents duplicate uploads through hash comparison

## Future Improvements

* Database integration (MongoDB/PostgreSQL)
* User authentication
* Image preview support
* CloudFront CDN integration
* Presigned URL generation
* Docker deployment

```
```
