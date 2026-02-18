@echo off
title D.esk AI Deployment Script (New Repo)
echo ======================================================
echo 🚀 DEPLOYING TO https://github.com/vigneshvl-dev/D.esk-Ai
echo ======================================================
echo.

:: 1. Navigate to project folder
cd /d "c:\Users\DELL\Documents\D.esk Ai"

:: 2. Initialize Git if not exists
if not exist ".git" (
    echo [1/4] Initializing Git...
    git init
    git remote add origin https://github.com/vigneshvl-dev/D.esk-Ai.git
)

:: 3. Git Operations
echo [2/4] Staging changes...
git add .

echo [3/4] Committing...
git commit -m "Initial high-fidelity build by SMCE students"

echo [4/4] Pushing to GitHub...
:: Using -u to set upstream for the first time
git push -u origin main --force

echo.
echo ======================================================
echo ✅ DEPLOYMENT ATTEMPTED!
echo ======================================================
echo Please check: https://vigneshvl-dev.github.io/D.esk-Ai/
echo.
echo If it still doesn't work, ensure "GitHub Pages" is enabled 
echo in your repo settings on GitHub.com!
echo.
pause
