# =====================================================
# 웹 서버 설정 파일
# =====================================================
# 이 파일은 수정하지 않아도 됩니다!
#
# 실행 방법:
#   uvicorn main:app --reload --port 8000
#
# 실행 후 브라우저에서:
#   http://localhost:8000
# =====================================================

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# ___여기에 프로젝트 이름___ 을 입력하세요
app = FastAPI(title="My Project")

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
