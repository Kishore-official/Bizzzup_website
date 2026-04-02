@echo off
set PROJECT_ID=legel-assistent-466812
set REPOSITORY_NAME=bizzzup
set REGION=asia-south1
set IMAGE_NAME=bizzzup-site
set IMAGE_TAG=v10
set SERVICE_NAME=bizzzup-site

REM Authenticate with Google Cloud
echo Authenticating with Google Cloud...
gcloud auth configure-docker %REGION%-docker.pkg.dev --quiet

REM Set the project
gcloud config set project %PROJECT_ID%

REM Create artifacts repository if it doesn't exist (uncomment first time)
REM gcloud artifacts repositories create %REPOSITORY_NAME% --repository-format=docker --location=%REGION%

REM Build the Docker image
echo Building Docker image...
docker build --no-cache -t %IMAGE_NAME%:%IMAGE_TAG% .

REM Tag the image for Artifact Registry
docker tag %IMAGE_NAME%:%IMAGE_TAG% %REGION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY_NAME%/%IMAGE_NAME%:%IMAGE_TAG%

REM Push the image to Artifact Registry
echo Pushing image to Artifact Registry...
docker push %REGION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY_NAME%/%IMAGE_NAME%:%IMAGE_TAG%

REM Deploy to Cloud Run
echo Deploying to Cloud Run...
gcloud run deploy %SERVICE_NAME% ^
  --image %REGION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY_NAME%/%IMAGE_NAME%:%IMAGE_TAG% ^
  --platform managed ^
  --region %REGION% ^
  --allow-unauthenticated ^
  --timeout=60s ^
  --min-instances=0 ^
  --max-instances=10 ^
  --memory=512Mi ^
  --cpu=1 ^
  --port=3000 ^
  --set-env-vars "NODE_ENV=production" ^
  --set-env-vars "GEMINI_API_KEY="

echo.
echo Deployment complete!
echo.
echo Get your live URL:
echo   gcloud run services describe %SERVICE_NAME% --region %REGION% --format="value(status.url)"
echo.
