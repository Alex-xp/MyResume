cd %~dp0
cd ..
call npx webpack --config .build/webpack.dev.js  --watch

@REM pause
