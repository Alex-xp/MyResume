@ECHO OFF

SET ROOT_DIR=%~dp0
cd %ROOT_DIR%

cd ..\..\public
call RD /S/Q app
mkdir app
cd %ROOT_DIR%



ECHO "******* COMPILE main_page *******" 
cd main_page
call npx webpack --config webpack.prod.js
cd %ROOT_DIR%
ECHO "************************************************************************"
ECHO "-"
ECHO "-"
ECHO "-"


ECHO "******* COMPILE template_page *******" 
cd template_page
call npx webpack --config webpack.prod.js
cd %ROOT_DIR%
ECHO "************************************************************************"
ECHO "-"
ECHO "-"
ECHO "-"

ECHO "******* COMPILE user user_exit_page *******" 
cd user\user_exit_page
call npx webpack --config webpack.prod.js
cd %ROOT_DIR%
ECHO "************************************************************************"
ECHO "-"
ECHO "-"
ECHO "-"




pause
