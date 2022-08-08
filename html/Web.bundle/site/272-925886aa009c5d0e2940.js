"use strict";(("undefined"!=typeof self?self:this).webpackChunk_subwallet_web_runner=("undefined"!=typeof self?self:this).webpackChunk_subwallet_web_runner||[]).push([[272],{57272:function(e,t,s){s.r(t),s.d(t,{AddChainError:function(){return n},AlreadyDestroyedError:function(){return r},CrashError:function(){return o},JsonRpcDisabledError:function(){return a},start:function(){return i}});class n extends Error{constructor(e){super(e),this.name="AddChainError"}}class r extends Error{constructor(){super(),this.name="AlreadyDestroyedError"}}class a extends Error{constructor(){super(),this.name="JsonRpcDisabledError"}}class o extends Error{constructor(e){super(e)}}function i(e){const t=(e=e||{}).logCallback||((e,t,s)=>{e<=1?console.error("[%s] %s",t,s):2==e?console.warn("[%s] %s",t,s):3==e?console.info("[%s] %s",t,s):4==e?console.debug("[%s] %s",t,s):console.trace("[%s] %s",t,s)}),i=function(){if(!window.Worker)throw new Error("Workers not available");return new Worker(new URL(s.p+s.u(726),s.b),{name:"smoldot"})}();let l=null,u=[],d=new Map,h=new WeakMap;const f={name:null};let b=null;const p=()=>{null!==b&&globalThis.clearTimeout(b),b=globalThis.setTimeout((()=>{b=null,l||console.warn("Smoldot appears unresponsive"+(f.name?" while executing task `"+f.name+"`":"")+". Please open an issue at https://github.com/paritytech/smoldot/issues. If you have a debugger available, please pause execution, generate a stack trace of the thread that isn't the main execution thread, and paste it in the issue. Please also include any other log found in the console or elsewhere.")}),1e4)};return globalThis.setTimeout((()=>p()),15e3),function(e,t){e.onmessage=e=>t(e.data)}(i,(e=>{switch(e.kind){case"jsonrpc":{const t=d.get(e.chainId)?.jsonRpcCallback;t&&t(e.data);break}case"chainAddedOk":{const t=u.shift(),s=e.chainId;if(d.has(s))throw"Unexpected reuse of a chain ID";d.set(s,{jsonRpcCallback:t.jsonRpcCallback,databasePromises:new Array});const n={sendJsonRpc:e=>{if(l)throw l;if(!d.has(s))throw new r;if(!d.get(s)?.jsonRpcCallback)throw new a;e.length>=8388608||c(i,{ty:"request",request:e,chainId:s})},databaseContent:e=>{if(l)return Promise.reject(l);const t=d.get(s)?.databasePromises;if(!t)return Promise.reject(new r);const n=new Promise(((e,s)=>{t.push({resolve:e,reject:s})})),a=e||4294967295;return c(i,{ty:"databaseContent",chainId:s,maxUtf8BytesSize:a>=4*(1<<30)?4294967295:a}),n},remove:()=>{if(l)throw l;if(!d.delete(s))throw new r;console.assert(h.has(n)),h.delete(n),c(i,{ty:"removeChain",chainId:s})}};h.set(n,s),t.resolve(n);break}case"chainAddedErr":u.shift().reject(new n(e.error));break;case"databaseContent":{const t=d.get(e.chainId)?.databasePromises;t&&t.shift().resolve(e.data);break}case"log":t(e.level,e.target,e.message);break;case"livenessPing":p();break;case"currentTask":f.name=e.taskName;break;default:return e}})),function(e,t){e.onerror=e=>{e.error instanceof Error?t(e.error):t(new Error(e.message||e))}}(i,(e=>{const t=e.toString();for(var s of(console.error("Smoldot has panicked"+(f.name?" while executing task `"+f.name+"`":"")+". This is a bug in smoldot. Please open an issue at https://github.com/paritytech/smoldot/issues with the following message:\n"+t),l=new o(t),u))"chainAdded"==s.ty&&s.reject(l);u=[];for(const e of d)for(const t of e[1].databasePromises)t.reject(l);d.clear()})),c(i,{maxLogLevel:e.maxLogLevel||3,enableCurrentTask:!0,cpuRateLimit:e.cpuRateLimit||1,forbidTcp:e.forbidTcp||!1,forbidWs:e.forbidWs||!1,forbidNonLocalWs:e.forbidNonLocalWs||!1,forbidWss:e.forbidWss||!1}),{addChain:e=>{if(l)throw l;if("string"!=typeof e.chainSpec)throw new Error("Chain specification must be a string");let t,s,n=[];if(e.potentialRelayChains)for(const t of e.potentialRelayChains){const e=h.get(t);void 0!==e&&n.push(e)}const r=new Promise(((e,n)=>{t=e,s=n}));return u.push({ty:"chainAdded",reject:s,resolve:t,jsonRpcCallback:e.jsonRpcCallback}),c(i,{ty:"addChain",chainSpec:e.chainSpec,databaseContent:"string"==typeof e.databaseContent?e.databaseContent:"",potentialRelayChains:n,jsonRpcRunning:!!e.jsonRpcCallback}),r},terminate:()=>l?Promise.reject(l):(l=new r,null!==b&&globalThis.clearTimeout(b),function(e){return e.terminate(),Promise.resolve()}(i))}}function c(e,t){e.postMessage(t)}}}]);