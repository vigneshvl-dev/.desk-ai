@echo off
title D.esk AI Deployment Script
echo ======================================================
echo 🚀 DEPLOYING D.ESK AI TO GITHUB
echo ======================================================
echo.

:: 1. Copy files to the repository folder
echo [1/4] Syncing files to repository...
xcopy /E /I /Y "c:\Users\DELL\Documents\D.esk Ai\*" "c:\Users\DELL\Documents\CampusD.esk\"

:: 2. Navigate to repo
cd /d "c:\Users\DELL\Documents\CampusD.esk"

:: 3. Git Operations
echo [2/4] Staging changes...
git add .

echo [3/4] Committing...
git commit -m "Update D.esk AI High-Fidelity Platform (By SMCE Students)"

echo [4/4] Pushing to GitHub...
git push origin main --force

echo.
echo ======================================================
echo ✅ DEPLOYMENT COMPLETE!
echo ======================================================
echo Your live link: tphts:/vigneshvl-dev.github.io/chatbot-smce/
echo Press any key to finish...
pause >nul
