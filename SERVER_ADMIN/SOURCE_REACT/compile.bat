@SET ROOT_DIR=%~dp0
@cd %ROOT_DIR%


cd ..\assets
call RD /S/Q js
mkdir js
cd %ROOT_DIR%

@REM "COMPILE MAIN_PAGE.JS" 
cd src
call compile-prod.bat
cd %ROOT_DIR%

@REM pause