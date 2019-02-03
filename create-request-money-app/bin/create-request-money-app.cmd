@echo off
setlocal enableextensions

if not "%CREATE_REQUEST_MONEY_APP_REDIRECTED%"=="1" if exist "%LOCALAPPDATA%\create-request-money-app\client\bin\create-request-money-app.cmd" (
  set CREATE_REQUEST_MONEY_APP_REDIRECTED=1
  "%LOCALAPPDATA%\create-request-money-app\client\bin\create-request-money-app.cmd" %*
  goto:EOF
)

if not defined CREATE_REQUEST_MONEY_APP_BINPATH set CREATE_REQUEST_MONEY_APP_BINPATH="%~dp0create-request-money-app.cmd"
if exist "%~dp0..\bin\node.exe" (
  "%~dp0..\bin\node.exe" "%~dp0..\bin\run" %*
) else if exist "%LOCALAPPDATA%\oclif\node\node-10.15.0.exe" (
  "%LOCALAPPDATA%\oclif\node\node-10.15.0.exe" "%~dp0..\bin\run" %*
) else (
  node "%~dp0..\bin\run" %*
)
