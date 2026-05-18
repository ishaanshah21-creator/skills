# Deployment Guide

Complete guide to deploy SkillSync to production

## Deployment Platforms

### Frontend Deployment Options

#### Option 1: Vercel (Recommended for React)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

4. **Configure Environment Variables**
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add: `VITE_API_URL=<backend-url>/api`

#### Option 2: Netlify

1. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy**
   - Drag and drop `dist` folder to Netlify
   - Or connect GitHub repository

3. **Set Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add: `VITE_API_URL=<backend-url>/api`

#### Option 3: GitHub Pages

1. **Build project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Update package.json**
   ```json
   {
     "homepage": "https://username.github.io/skillsync",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

---

### Backend Deployment Options

#### Option 1: Heroku

1. **Install Heroku CLI**
   - Download from: https://devcenter.heroku.com/articles/heroku-cli

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create skillsync-app
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=<mongodb-atlas-uri>
   heroku config:set JWT_SECRET=<your-secret-key>
   heroku config:set NODE_ENV=production
   heroku config:set FRONTEND_URL=<frontend-url>
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **View logs**
   ```bash
   heroku logs --tail
   ```

#### Option 2: Railway

1. **Login to Railway**
   - Go to: https://railway.app/

2. **Connect GitHub Repository**
   - New Project → Deploy from GitHub repo

3. **Set Environment Variables**
   - Project settings → Variables
   - Add all required variables

4. **Deploy**
   - Push to main branch (auto-deploys)

#### Option 3: Render

1. **Go to Render.com**
   - https://render.com/

2. **Create New Web Service**
   - Connect GitHub repository
   - Select branch (main)

3. **Configure**
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`

4. **Environment Variables**
   - Add all required environment variables

5. **Deploy**
   - Click "Create Web Service"

#### Option 4: AWS EC2

1. **Launch EC2 Instance**
   - Ubuntu 20.04 LTS
   - t2.micro (free tier eligible)

2. **Connect and Setup**
   ```bash
   ssh -i "key.pem" ubuntu@instance-ip

   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs

   # Install MongoDB (or use Atlas)
   sudo apt install -y mongodb

   # Install PM2 (process manager)
   sudo npm install -g pm2
   ```

3. **Deploy Application**
   ```bash
   git clone <repo-url>
   cd skillsync/backend
   npm install
   pm2 start server.js --name "skillsync-api"
   pm2 startup
   pm2 save
   ```

4. **Setup Nginx Reverse Proxy**
   ```bash
   sudo apt install nginx

   # Create config
   sudo nano /etc/nginx/sites-available/skillsync

   # Add configuration (see below)
   sudo ln -s /etc/nginx/sites-available/skillsync /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

**Nginx Configuration**:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Database Deployment

### MongoDB Atlas (Recommended)

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas

2. **Create Cluster**
   - Free tier available
   - Choose region close to backend

3. **Create Database User**
   - Database Access → Add Database User
   - Save username and password

4. **Get Connection String**
   - Cluster → Connect → Connect your application
   - Copy URI and add to backend `.env`

5. **Setup IP Whitelist**
   - Network Access → Add IP Address
   - For production: Add your server's IP
   - For development: Allow All

### Self-Hosted MongoDB

1. **Install MongoDB on Server**
   ```bash
   sudo apt install mongodb-org
   sudo systemctl start mongod
   ```

2. **Backup & Restore**
   ```bash
   # Backup
   mongodump --out /backup/

   # Restore
   mongorestore /backup/
   ```

---

## Environment Variables

### Backend Production .env

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/skillsync
JWT_SECRET=your_very_secure_secret_key_min_32_chars
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### Frontend Production .env

```env
VITE_API_URL=https://api.yourdomain.com/api
```

---

## Security Checklist

- [ ] Use HTTPS for all communications
- [ ] Set strong JWT_SECRET (minimum 32 characters)
- [ ] Use environment variables for all secrets
- [ ] Enable CORS only for your frontend domain
- [ ] Set secure MongoDB credentials
- [ ] Use firewall rules to restrict access
- [ ] Enable rate limiting on backend
- [ ] Setup SSL/TLS certificates
- [ ] Enable HTTPS redirect
- [ ] Setup automated backups
- [ ] Monitor logs and errors
- [ ] Use password manager for credentials
- [ ] Regularly update dependencies
- [ ] Setup security headers (HSTS, CSP, etc.)

---

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          cd backend
          npm install
          npm test
          # Deploy to production
      
      - name: Deploy Frontend
        run: |
          cd frontend
          npm install
          npm run build
          # Deploy to production
```

---

## Performance Optimization

### Backend
- Enable gzip compression
- Use caching headers
- Implement database indexing
- Use CDN for static files
- Monitor performance metrics

### Frontend
- Minify and bundle with Vite
- Enable gzip compression
- Use lazy loading for routes
- Optimize images
- Use service workers for caching

---

## Monitoring & Logging

### Error Tracking
- Use Sentry for error monitoring
- Setup log aggregation (ELK, Datadog)
- Monitor API response times
- Track user sessions

### Uptime Monitoring
- Use UptimeRobot
- Setup health checks
- Get alerts for downtime
- Track SLA metrics

---

## Backup & Recovery

### Database Backups
```bash
# Automated daily backups
# Setup MongoDB Atlas automated backups

# Manual backup
mongodump --uri "mongodb+srv://..." --out ./backup
```

### Application Backups
- Push code to GitHub
- Auto-backup through deployment platform
- Keep versioned releases

---

## Domain & DNS

1. **Register Domain**
   - Namecheap, GoDaddy, Vercel, etc.

2. **Configure DNS**
   ```
   skillsync.com A record → <backend-server-ip>
   api.skillsync.com A record → <backend-server-ip>
   www.skillsync.com CNAME → skillsync.com
   ```

3. **SSL Certificate**
   - Use Let's Encrypt (free)
   - Or purchase commercial certificate

---

## Cost Estimation

### Monthly Costs (Rough)
- Frontend (Vercel): Free to $20
- Backend (Railway/Heroku): $5 to $50
- Database (MongoDB Atlas): Free to $50
- Domain: $10 to $15
- **Total**: $15 to $135

---

## Troubleshooting Production Issues

### Backend Not Starting
```bash
# Check logs
pm2 logs skillsync-api

# Restart
pm2 restart skillsync-api

# Check environment variables
printenv | grep NODE_ENV
```

### API Errors
- Check network connectivity
- Verify MongoDB connection
- Check firewall rules
- Review error logs

### Frontend Issues
- Clear browser cache
- Check API URL configuration
- Verify CORS settings
- Check console for errors

---

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify authentication flow
- [ ] Test user registration
- [ ] Check email notifications (if any)
- [ ] Monitor error rates
- [ ] Setup automated backups
- [ ] Configure monitoring
- [ ] Setup CI/CD pipeline
- [ ] Document deployment process
- [ ] Create runbook for incidents

---

## Scaling Considerations

As user base grows:

1. **Database**
   - Setup replication
   - Use sharding for large datasets
   - Optimize queries with indexes

2. **Backend**
   - Use load balancing
   - Implement caching (Redis)
   - Use message queues (RabbitMQ)
   - Setup auto-scaling

3. **Frontend**
   - Use CDN for global distribution
   - Implement code splitting
   - Use service workers
   - Optimize bundle size

---

**Deployment Date**: _______________

**Last Update**: January 2026
