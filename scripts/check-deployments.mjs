import { execFileSync } from 'node:child_process';
const npm=process.platform==='win32'?'npm.cmd':'npm';
for(const [name,origin,base] of [
 ['Custom domain','https://www.lucianokitchensandclosets.com',''],
 ['GitHub Pages','https://pujolsluis.github.io','/luciano-kitchens-and-closets'],
]) {
 console.log('\nChecking '+name);
 const env={...process.env,NEXT_PUBLIC_SITE_ORIGIN:origin,NEXT_PUBLIC_BASE_PATH:base};
 execFileSync(npm,['run','build'],{env,stdio:'inherit'});
 execFileSync(npm,['test'],{env,stdio:'inherit'});
}
