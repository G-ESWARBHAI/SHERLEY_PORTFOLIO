# Gallery API Documentation

## Base URL
```
http://localhost:5000/api/gallery
```

## Endpoints

### 1. Get All Gallery Images
**GET** `/api/gallery`

Get all gallery images with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category (Business, Networking, Recognition, Events, Awards, Other)
- `active` (optional): Filter by active status (true/false)

**Example Requests:**
```bash
# Get all images
GET /api/gallery

# Get active images only
GET /api/gallery?active=true

# Get images by category
GET /api/gallery?category=Business

# Get active Business images
GET /api/gallery?category=Business&active=true
```

**Response:**
```json
{
  "success": true,
  "fromCache": false,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Professional Event",
      "category": "Business",
      "imageUrl": "https://res.cloudinary.com/...",
      "cloudinaryPublicId": "entrepreneur-portfolio/gallery/...",
      "cloudinaryUrl": "https://res.cloudinary.com/...",
      "thumbnailUrl": "https://res.cloudinary.com/...",
      "description": "Event description",
      "displayOrder": 0,
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

---

### 2. Get Single Image by ID
**GET** `/api/gallery/:id`

Get a specific image by its ID.

**Example Request:**
```bash
GET /api/gallery/65a1b2c3d4e5f6g7h8i9j0k1
```

**Response:**
```json
{
  "success": true,
  "fromCache": false,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Professional Event",
    "category": "Business",
    "imageUrl": "https://res.cloudinary.com/...",
    "cloudinaryPublicId": "entrepreneur-portfolio/gallery/...",
    "cloudinaryUrl": "https://res.cloudinary.com/...",
    "thumbnailUrl": "https://res.cloudinary.com/...",
    "description": "Event description",
    "displayOrder": 0,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 3. Get Categories
**GET** `/api/gallery/categories`

Get all unique categories from active images.

**Example Request:**
```bash
GET /api/gallery/categories
```

**Response:**
```json
{
  "success": true,
  "fromCache": false,
  "data": ["Business", "Networking", "Recognition", "Events", "Awards"]
}
```

---

### 4. Add New Image
**POST** `/api/gallery`

Add a new image to the gallery. (Will require admin authentication later)

**Content-Type:** `multipart/form-data`

**Form Data:**
- `image` (required): Image file (max 10MB)
- `title` (required): Image title
- `category` (required): Image category (Business, Networking, Recognition, Events, Awards, Other)
- `description` (optional): Image description
- `displayOrder` (optional): Display order (default: 0)

**Example Request (using curl):**
```bash
curl -X POST http://localhost:5000/api/gallery \
  -F "image=@/path/to/image.jpg" \
  -F "title=Professional Event" \
  -F "category=Business" \
  -F "description=Annual business conference" \
  -F "displayOrder=0"
```

**Example Request (using JavaScript FormData):**
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('title', 'Professional Event');
formData.append('category', 'Business');
formData.append('description', 'Annual business conference');
formData.append('displayOrder', '0');

fetch('http://localhost:5000/api/gallery', {
  method: 'POST',
  body: formData
});
```

**Response:**
```json
{
  "success": true,
  "message": "Image added successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Professional Event",
    "category": "Business",
    "imageUrl": "https://res.cloudinary.com/...",
    "cloudinaryPublicId": "entrepreneur-portfolio/gallery/...",
    "cloudinaryUrl": "https://res.cloudinary.com/...",
    "thumbnailUrl": "https://res.cloudinary.com/...",
    "description": "Annual business conference",
    "displayOrder": 0,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 5. Update Image
**PUT** `/api/gallery/:id`

Update an existing image. (Will require admin authentication later)

**Content-Type:** `multipart/form-data` (if uploading new image) or `application/json` (if only updating metadata)

**Form Data (all optional):**
- `image`: New image file (optional, max 10MB)
- `title`: New title
- `category`: New category
- `description`: New description
- `displayOrder`: New display order
- `isActive`: Active status (true/false)

**Example Request:**
```bash
curl -X PUT http://localhost:5000/api/gallery/65a1b2c3d4e5f6g7h8i9j0k1 \
  -F "title=Updated Title" \
  -F "category=Networking" \
  -F "isActive=true"
```

**Response:**
```json
{
  "success": true,
  "message": "Image updated successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Updated Title",
    "category": "Networking",
    ...
  }
}
```

---

### 6. Delete Image
**DELETE** `/api/gallery/:id`

Delete an image from the gallery. (Will require admin authentication later)

**Example Request:**
```bash
DELETE /api/gallery/65a1b2c3d4e5f6g7h8i9j0k1
```

**Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

## Caching

All GET endpoints use Redis caching with a TTL of 1 hour. The cache is automatically cleared when images are added, updated, or deleted.

**Cache Keys:**
- `gallery:all` - All images
- `gallery:active` - Active images only
- `gallery:category:{category}` - Images by category
- `gallery:image:{id}` - Single image by ID
- `gallery:categories` - List of categories

---

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error message"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created (for POST)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

---

## Image Categories

Valid categories:
- `Business`
- `Networking`
- `Recognition`
- `Events`
- `Awards`
- `Other`

---

## Notes

- Images are automatically optimized and resized by Cloudinary
- Thumbnail URLs are automatically generated (400x300px)
- Original images are stored at 1200x800px max resolution
- All images are stored in the `entrepreneur-portfolio/gallery` folder on Cloudinary
- Maximum file size: 10MB
- Supported formats: All image formats supported by Cloudinary
