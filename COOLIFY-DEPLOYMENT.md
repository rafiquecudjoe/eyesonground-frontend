# Coolify Configuration for EyesOnGround Frontend

## Deployment Settings for Coolify

### 1. Repository Settings
- **Repository**: `https://github.com/rafiquecudjoe/eyesonground-frontend`
- **Branch**: `master`
- **Build Pack**: `Docker`

### 2. Domain Configuration
- **Port**: `8080`
- **Protocol**: `HTTP`
- **Custom Domain**: Set your domain in Coolify dashboard

### 3. Environment Variables (Optional)
```env
NODE_ENV=production
VITE_API_URL=https://your-backend-api.com
```

### 4. Build Configuration
- **Dockerfile**: `./Dockerfile` (root of repository)
- **Build Context**: `.` (root directory)
- **Auto Deploy**: Enable for automatic deployments on git push

### 5. Health Check
- **Path**: `/health`
- **Port**: `8080`
- **Method**: `GET`

### 6. Resource Limits (Recommended)
- **CPU**: `0.5` cores
- **Memory**: `512MB`
- **Storage**: `1GB`

### 7. SSL/TLS
- Enable SSL in Coolify dashboard
- Automatic Let's Encrypt certificate

## Manual Deployment Steps

1. **Connect Repository**:
   - Go to Coolify dashboard
   - Click "New Resource" → "Git Repository"
   - Connect your GitHub repository

2. **Configure Build**:
   - Select "Docker" as build pack
   - Set port to `8080`
   - Enable health checks

3. **Deploy**:
   - Click "Deploy"
   - Monitor logs for successful build

4. **Set Domain**:
   - Configure your custom domain
   - Enable SSL certificate

## Deployment Commands (Alternative)

If you prefer CLI deployment:

```bash
# Build the image
docker build -t eyesonground-frontend .

# Run locally (testing)
docker run -p 8080:8080 eyesonground-frontend

# Check health
curl http://localhost:8080/health
```

## Features Included

✅ **Multi-stage Docker build** for optimized image size  
✅ **Nginx configuration** with caching and security headers  
✅ **Health check endpoint** at `/health`  
✅ **Non-root user** for security  
✅ **GZIP compression** for faster loading  
✅ **SPA routing support** for React Router  
✅ **Static asset caching** for performance  
✅ **Security headers** (HSTS, XSS protection, etc.)  
✅ **Coolify-ready** configuration  

## Troubleshooting

### Build Issues
- **"vite: not found" error**: Fixed in updated Dockerfile - now installs all dependencies including dev dependencies
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility
- Verify build script works locally: `npm run build`

### Alternative Dockerfile
If you encounter issues with the main Dockerfile, you can use the simpler version:
```bash
# Rename simple dockerfile
mv Dockerfile.simple Dockerfile

# Then deploy to Coolify
```

### Runtime Issues
- Check container logs in Coolify dashboard
- Verify health endpoint: `curl http://your-domain.com/health`
- Check nginx error logs if needed

### Performance
- Images are cached for 1 year
- HTML files have no-cache headers
- GZIP compression reduces transfer size

## Deployment Fix Applied
✅ **Fixed**: "vite: not found" error by installing all dependencies (including devDependencies) during build stage
✅ **Optimized**: Added build dependencies for native packages
✅ **Alternative**: Created Dockerfile.simple for simpler deployments
