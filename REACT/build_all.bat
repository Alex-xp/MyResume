@ECHO OFF

@SET ROOT_DIR=%~dp0
@cd %ROOT_DIR%

ECHO "CLEAR ALL DATA"
cd ..\SERVER\public

call RD /S/Q admin
mkdir admin

call RD /S/Q client
mkdir client

cd %ROOT_DIR%


ECHO "************************ COMPILE ADMIN\001-login ************************"
cd ADMIN\001-login\.build
call compile-prod.bat
cd %ROOT_DIR%


ECHO "************************ COMPILE ADMIN\002-admin_panel ************************"
cd ADMIN\002-admin_panel\.build
call compile-prod.bat
cd %ROOT_DIR%

ECHO "************************ COMPILE ADMIN\003-users ************************"
cd ADMIN\003-users\.build
call compile-prod.bat
cd %ROOT_DIR%





ECHO "************************ COMPILE CLIENTS\001-index ************************"
cd CLIENTS\001-index\.build
call compile-prod.bat
cd %ROOT_DIR%




pause
