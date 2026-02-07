#!/bin/bash

# ============================================
# Space Between Studio - Workshop Deployment
# ============================================
# 使用方法: ./deploy.sh
# 前置需求: 已 clone spacebetweenstudio.site repo
# ============================================

set -e

# 配置
REPO_PATH="${REPO_PATH:-../spacebetweenstudio.site}"
BRANCH="main"

echo "🚀 Space Between Studio - Workshop v2 Deployment"
echo "================================================"
echo ""

# 檢查 repo 是否存在
if [ ! -d "$REPO_PATH" ]; then
    echo "❌ 錯誤: 找不到 repo 目錄 $REPO_PATH"
    echo "請設定 REPO_PATH 環境變數或確保目錄存在"
    echo ""
    echo "使用方法:"
    echo "  export REPO_PATH=/path/to/spacebetweenstudio.site"
    echo "  ./deploy.sh"
    exit 1
fi

echo "📁 Repo 路徑: $REPO_PATH"
echo ""

# 切換到 repo 目錄
cd "$REPO_PATH"

# 確保在正確的分支
echo "🔀 切換到 $BRANCH 分支..."
git checkout $BRANCH
git pull origin $BRANCH

# 複製文件
echo ""
echo "📄 複製文件..."

# 主要工作坊頁面
cp ../github-deploy-v2/workshop-v2.html ./workshop.html
echo "  ✓ workshop.html (互動工作坊)"

# 備份舊版本（如果存在）
if [ -f "./workshop-full.html" ]; then
    cp ./workshop-full.html ./workshop-full-backup.html
    echo "  ✓ workshop-full-backup.html (舊版本備份)"
fi

# 複製完整版（無閘門）供測試
cp ../github-deploy-v2/workshop-full.html ./workshop-full.html
echo "  ✓ workshop-full.html (測試版本，無閘門)"

# 確保 resource-hub 目錄存在
mkdir -p ./resource-hub
if [ -d "../github-deploy-v2/resource-hub" ]; then
    cp -r ../github-deploy-v2/resource-hub/* ./resource-hub/
    echo "  ✓ resource-hub/ (資源中心)"
fi

echo ""
echo "📊 Git 狀態:"
git status --short

echo ""
echo "🔍 變更文件:"
git diff --stat

# 確認部署
echo ""
read -p "確認部署以上變更？(y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # 提交變更
    echo ""
    echo "📝 提交變更..."
    git add .
    git commit -m "Deploy Workshop v2 with gate, demo mode, and HubSpot tracking

- Add email gate with passphrase validation
- Add demo mode with 2 cases (雨天咖啡, Metz 茶葉)
- Add B2B CTA with Cal.com booking
- Add HubSpot tracking via n8n webhook
- Update workshop to v2"

    # 推送
    echo ""
    echo "🚀 推送到 GitHub..."
    git push origin $BRANCH

    echo ""
    echo "✅ 部署完成！"
    echo ""
    echo "🔗 網址:"
    echo "   工作坊: https://spacebetweenstudio.site/workshop.html"
    echo "   測試版: https://spacebetweenstudio.site/workshop-full.html"
    echo ""
    echo "📋 下一步:"
    echo "   1. 匯入 n8n workflow (n8n-workshop-gate-hubspot.json)"
    echo "   2. 配置 HubSpot 自定義屬性"
    echo "   3. 測試完整流程"
else
    echo ""
    echo "❌ 部署已取消"
fi
