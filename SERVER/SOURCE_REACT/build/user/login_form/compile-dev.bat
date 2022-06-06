@SET ROOT_DIR=%~dp0
@cd %ROOT_DIR%

call npx webpack --config webpack.dev.js  --watch

@REM pause
