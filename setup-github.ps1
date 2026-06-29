# ToolAI — GitHub + Cloudflare Deploy Script
# Run this AFTER installing Git from https://git-scm.com

param(
    [Parameter(Mandatory=$false)]
    [string]$RepoName = "toolai"
)

Write-Host "=== ToolAI GitHub Setup ===" -ForegroundColor Green
Write-Host ""

# Check git
try {
    git --version | Out-Null
} catch {
    Write-Host "ERROR: Git not found. Install from https://git-scm.com first." -ForegroundColor Red
    exit 1
}

# Check gh
try {
    gh --version | Out-Null
} catch {
    Write-Host "WARNING: GitHub CLI not found. Will use manual setup." -ForegroundColor Yellow
    $useGh = $false
}

# Init git
Write-Host "1. Initializing git repo..." -ForegroundColor Cyan
git init
git add -A
git commit -m "Initial commit — ToolAI"

# Create GitHub repo
Write-Host "2. Creating GitHub repo '$RepoName'..." -ForegroundColor Cyan
gh repo create $RepoName --public --push --source=. --remote=origin

if ($LASTEXITCODE -eq 0) {
    Write-Host "3. Pushed to GitHub successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "=== NEXT: Deploy to Cloudflare Pages ===" -ForegroundColor Yellow
    Write-Host "1. Go to https://dash.cloudflare.com -> Pages -> Create"
    Write-Host "2. Connect your GitHub repo: hardcorewarrior1000-source/$RepoName"
    Write-Host "3. Build command: npm run build"
    Write-Host "4. Build output: out"
    Write-Host "5. Deploy!"
} else {
    Write-Host ""
    Write-Host "=== MANUAL GITHUB SETUP ===" -ForegroundColor Yellow
    Write-Host "1. Create repo at: https://github.com/new"
    Write-Host "2. Name: $RepoName"
    Write-Host "3. Run these commands:"
    Write-Host "   git remote add origin https://github.com/hardcorewarrior1000-source/$RepoName.git"
    Write-Host "   git branch -M main"
    Write-Host "   git push -u origin main"
}
