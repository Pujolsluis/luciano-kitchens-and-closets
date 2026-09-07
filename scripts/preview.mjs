import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

// A plain static preview: no framework server or client-side route fallback.
const root=resolve(process.env.PREVIEW_ROOT || 'dist/client');
const index=await readFile(resolve(root,'index.html'),'utf8');
const canonical=index.match(/rel="canonical" href="([^"]+)"/)?.[1];
if(!canonical) throw new Error('Build the site before starting the static preview.');
const base=new URL(canonical).pathname.replace(/\/$/,'');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webp':'image/webp','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.xml':'application/xml','.ttf':'font/ttf','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method)) {res.writeHead(405);res.end();return;}
 try {
  const url=new URL(req.url,'http://localhost');
  const pathname=decodeURIComponent(url.pathname);
  if(base && pathname===base) {res.writeHead(301,{Location:base+'/'});res.end();return;}
  if(base && !pathname.startsWith(base+'/')) throw new Error('Outside base path');
  let file=resolve(root,'.'+pathname.slice(base.length));
  if(file!==root && !file.startsWith(root+sep)) throw new Error('Outside output');
  if((await stat(file)).isDirectory()) file=resolve(file,'index.html');
  const data=await readFile(file);
  res.writeHead(200,{'Content-Type':types[extname(file)] || 'application/octet-stream'});
  res.end(req.method==='HEAD'?undefined:data);
 } catch {
  res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
  res.end(req.method==='HEAD'?undefined:await readFile(resolve(root,'404.html')));
 }
});
const port=Number(process.env.PORT || 4174);
server.listen(port,'localhost',()=>console.log('Static preview: http://localhost:'+port+base+'/'));
