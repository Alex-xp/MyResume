@SET ROOT_DIR=%~dp0
@cd %ROOT_DIR%

cd ..\..\..\public
call RD /S/Q app
mkdir app
cd %ROOT_DIR%


@REM "COMPILE MAIN_PAGE.JS" 
cd src
call npx webpack --config webpack.dev.js  --watch
cd %ROOT_DIR%


@REM  pause
