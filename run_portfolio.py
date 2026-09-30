"""
PORTFOLIO LOCAL SERVER LAUNCHER - NGUYEN TUAN DAT
Starts a local web server on port 8080 and automatically opens the browser.
Ensures YouTube embedded videos play 100% smoothly without Error 153.
"""

import http.server
import socketserver
import webbrowser
import threading
import time
import os
import sys

# Change directory to script folder
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORTS_TO_TRY = [8080, 8000, 5500, 8888]

selected_port = None
httpd = None

Handler = http.server.SimpleHTTPRequestHandler
# Add proper mime types if needed
Handler.extensions_map.update({
    '.webp': 'image/webp',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html'
})

socketserver.TCPServer.allow_reuse_address = True

for p in PORTS_TO_TRY:
    try:
        httpd = socketserver.TCPServer(("", p), Handler)
        selected_port = p
        break
    except OSError:
        continue

if not selected_port:
    print("[Error] Khong the mo cong 8080/8000. Mo truc tiep index.html...")
    webbrowser.open("index.html")
    sys.exit(0)

print("=" * 66)
print("  🚀 PORTFOLIO NGUYEN TUAN DAT - HE THONG 43+ VIDEO TRUC TIEP")
print("=" * 66)
print(f"\n[OK] May chu noi bo da khoi dong thanh cong tai: http://localhost:{selected_port}")
print("[OK] Dang tu dong mo trinh duyet...")
print("\n" + "-" * 66)
print("  👉 Vui long GIU CUA SO NAY trong khi ban xem Portfolio va Video.")
print("  👉 Khi muon dung, ban chi can bam dau [X] de dong cua so nay.")
print("-" * 66 + "\n")

# Start server in thread
server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
server_thread.start()

# Wait 0.5s for socket to be ready, then open browser
time.sleep(0.5)
webbrowser.open(f"http://localhost:{selected_port}")

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\nDang tat may chu...")
    httpd.shutdown()
    sys.exit(0)
