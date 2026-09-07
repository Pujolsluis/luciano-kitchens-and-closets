import { cp, mkdir, mkdtemp, rm, symlink } from 'node:fs/promises';
import { execFileSync, spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Use a disposable build directory so local experiments never replace dist/.
if(process.env.CI) throw new Error('Brand staging is local-only and cannot run in CI.');
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const scratch=await mkdtemp(join(tmpdir(),'luciano-preview-'));
const output=join(root,'outputs/brand-staging');
const env={...process.env,LOCAL_STAGING:'true',NEXT_PUBLIC_BASE_PATH:'',NEXT_PUBLIC_SITE_ORIGIN:'https://local-preview.invalid'};
const npm=process.platform==='win32'?'npm.cmd':'npm';
try {
 for(const name of ['app','components','config','lib','public','scripts','package.json','package-lock.json','tsconfig.json','next.config.ts','vite.config.ts']) {
  await cp(join(root,name),join(scratch,name),{recursive:true});
 }
 await symlink(join(root,'node_modules'),join(scratch,'node_modules'),process.platform==='win32'?'junction':'dir');
 execFileSync(npm,['run','build'],{cwd:scratch,env,stdio:'inherit'});
 execFileSync(npm,['test'],{cwd:scratch,env,stdio:'inherit'});
 // Replace only the dedicated, ignored local preview output after a valid build.
 await mkdir(join(root,'outputs'),{recursive:true});
 await rm(output,{recursive:true,force:true});
 await cp(join(scratch,'dist/client'),output,{recursive:true});
} finally {
 await rm(scratch,{recursive:true,force:true});
}
console.log('Local brand previews built in outputs/brand-staging.');
if(!process.argv.includes('--build-only')) {
 const port=process.env.PORT || '4176';
 const server=spawn(process.execPath,[join(root,'scripts/preview.mjs')],{
  cwd:root,env:{...env,PREVIEW_ROOT:output,PORT:port},stdio:'inherit',
 });
 console.log('Open http://localhost:'+port+'/staging/ to compare all three options.');
 for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>server.kill(signal));
 await new Promise((resolve,reject)=>{
  server.on('error',reject);
  server.on('exit',code=>{process.exitCode=code || 0;resolve();});
 });
}
