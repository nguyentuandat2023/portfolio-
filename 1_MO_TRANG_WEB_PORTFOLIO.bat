@echo off
chcp 65001 >nul
title PORTFOLIO NGUYỄN TUẤN ĐẠT - XEM VIDEO TRỰC TIẾP
cd /d "%~dp0"

cls
echo ====================================================================
echo   🚀 DANG KHOI DONG TRANG WEB PORTFOLIO NGUYEN TUAN DAT
echo   🎬 HE THONG XEM TRUC TIEP 43+ VIDEO (KHONG CAN MO TAB KHAC)
echo ====================================================================
echo.
python run_portfolio.py
if %errorlevel% neq 0 (
    echo [Luu y] Python chua khoi dong duoc, dang mo du phong index.html...
    start "" "index.html"
)
pause
