export function log(message:
string,..args:any[]){
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${message}`,...args);
}

export function getEnvVar(name: string):
string {
  const value = process.env[name];
  if(!value) {
    throw new Error(`Missing required enivrment variable: ${name}`);
  }
  return value;
}

export function formatMarkdownLink(label:string, url:string):string{
  return `[${label}](${url})`;
}