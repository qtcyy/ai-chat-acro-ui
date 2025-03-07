"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["8717"],{13963:function(e,n,t){t.d(n,{Z:()=>i});var r=t(46306);let i=function(e){return(0,r.Z)(e,4)}},77218:function(e,n,t){t.r(n),t.d(n,{render:()=>D});var r=t(5285),i=t(62405);t(57621),t(52593);var a=t(98828);t(96536),t(60059);var d=t(60697),o=t(77802),c=t(2786),l=t(13963),s=t(22992);function g(e){var n,t,r={options:{directed:e.isDirected(),multigraph:e.isMultigraph(),compound:e.isCompound()},nodes:(n=e,s.Z(n.nodes(),function(e){var t=n.node(e),r=n.parent(e),i={v:e};return c.Z(t)||(i.value=t),c.Z(r)||(i.parent=r),i})),edges:(t=e,s.Z(t.edges(),function(e){var n=t.edge(e),r={v:e.v,w:e.w};return c.Z(e.name)||(r.name=e.name),c.Z(n)||(r.value=n),r}))};return c.Z(e.graph())||(r.value=l.Z(e.graph())),r}t(38129);var u=t(92950),f=new Map,h=new Map,p=new Map,w=(0,d.eW)(()=>{h.clear(),p.clear(),f.clear()},"clear"),v=(0,d.eW)((e,n)=>{let t=h.get(n)||[];return d.cM.trace("In isDescendant",n," ",e," = ",t.includes(e)),t.includes(e)},"isDescendant"),M=(0,d.eW)((e,n)=>{let t=h.get(n)||[];return d.cM.info("Descendants of ",n," is ",t),d.cM.info("Edge is ",e),e.v!==n&&e.w!==n&&(t?t.includes(e.v)||v(e.v,n)||v(e.w,n)||t.includes(e.w):(d.cM.debug("Tilt, ",n,",not in descendants"),!1))},"edgeInCluster"),y=(0,d.eW)((e,n,t,r)=>{d.cM.warn("Copying children of ",e,"root",r,"data",n.node(e),r);let i=n.children(e)||[];e!==r&&i.push(e),d.cM.warn("Copying (nodes) clusterId",e,"nodes",i),i.forEach(i=>{if(n.children(i).length>0)y(i,n,t,r);else{let a=n.node(i);d.cM.info("cp ",i," to ",r," with parent ",e),t.setNode(i,a),r!==n.parent(i)&&(d.cM.warn("Setting parent",i,n.parent(i)),t.setParent(i,n.parent(i))),e!==r&&i!==e?(d.cM.debug("Setting parent",i,e),t.setParent(i,e)):(d.cM.info("In copy ",e,"root",r,"data",n.node(e),r),d.cM.debug("Not Setting parent for node=",i,"cluster!==rootId",e!==r,"node!==clusterId",i!==e));let o=n.edges(i);d.cM.debug("Copying Edges",o),o.forEach(i=>{d.cM.info("Edge",i);let a=n.edge(i.v,i.w,i.name);d.cM.info("Edge data",a,r);try{M(i,r)?(d.cM.info("Copying as ",i.v,i.w,a,i.name),t.setEdge(i.v,i.w,a,i.name),d.cM.info("newGraph edges ",t.edges(),t.edge(t.edges()[0]))):d.cM.info("Skipping copy of edge ",i.v,"--\x3e",i.w," rootId: ",r," clusterId:",e)}catch(e){d.cM.error(e)}})}d.cM.debug("Removing node",i),n.removeNode(i)})},"copy"),X=(0,d.eW)((e,n)=>{let t=n.children(e),r=[...t];for(let i of t)p.set(i,e),r=[...r,...X(i,n)];return r},"extractDescendants"),m=(0,d.eW)((e,n,t)=>{let r=e.edges().filter(e=>e.v===n||e.w===n),i=e.edges().filter(e=>e.v===t||e.w===t),a=r.map(e=>({v:e.v===n?t:e.v,w:e.w===n?n:e.w})),d=i.map(e=>({v:e.v,w:e.w}));return a.filter(e=>d.some(n=>e.v===n.v&&e.w===n.w))},"findCommonEdges"),b=(0,d.eW)((e,n,t)=>{let r;let i=n.children(e);if(d.cM.trace("Searching children of id ",e,i),i.length<1)return e;for(let e of i){let i=b(e,n,t),a=m(n,t,i);if(i){if(!(a.length>0))return i;r=i}}return r},"findNonClusterChild"),E=(0,d.eW)(e=>f.has(e)&&f.get(e).externalConnections&&f.has(e)?f.get(e).id:e,"getAnchorId"),N=(0,d.eW)((e,n)=>{if(!e||n>10){d.cM.debug("Opting out, no graph ");return}for(let n of(d.cM.debug("Opting in, graph "),e.nodes().forEach(function(n){e.children(n).length>0&&(d.cM.warn("Cluster identified",n," Replacement id in edges: ",b(n,e,n)),h.set(n,X(n,e)),f.set(n,{id:b(n,e,n),clusterData:e.node(n)}))}),e.nodes().forEach(function(n){let t=e.children(n),r=e.edges();t.length>0?(d.cM.debug("Cluster identified",n,h),r.forEach(e=>{v(e.v,n)^v(e.w,n)&&(d.cM.warn("Edge: ",e," leaves cluster ",n),d.cM.warn("Descendants of XXX ",n,": ",h.get(n)),f.get(n).externalConnections=!0)})):d.cM.debug("Not a cluster ",n,h)}),f.keys())){let t=f.get(n).id,r=e.parent(t);r!==n&&f.has(r)&&!f.get(r).externalConnections&&(f.get(n).id=r)}e.edges().forEach(function(n){let t=e.edge(n);d.cM.warn("Edge "+n.v+" -> "+n.w+": "+JSON.stringify(n)),d.cM.warn("Edge "+n.v+" -> "+n.w+": "+JSON.stringify(e.edge(n)));let r=n.v,i=n.w;if(d.cM.warn("Fix XXX",f,"ids:",n.v,n.w,"Translating: ",f.get(n.v)," --- ",f.get(n.w)),f.get(n.v)||f.get(n.w)){if(d.cM.warn("Fixing and trying - removing XXX",n.v,n.w,n.name),r=E(n.v),i=E(n.w),e.removeEdge(n.v,n.w,n.name),r!==n.v){let i=e.parent(r);f.get(i).externalConnections=!0,t.fromCluster=n.v}if(i!==n.w){let r=e.parent(i);f.get(r).externalConnections=!0,t.toCluster=n.w}d.cM.warn("Fix Replacing with XXX",r,i,n.name),e.setEdge(r,i,t,n.name)}}),d.cM.warn("Adjusted Graph",g(e)),C(e,0),d.cM.trace(f)},"adjustClustersAndEdges"),C=(0,d.eW)((e,n)=>{if(d.cM.warn("extractor - ",n,g(e),e.children("D")),n>10){d.cM.error("Bailing out");return}let t=e.nodes(),r=!1;for(let n of t){let t=e.children(n);r=r||t.length>0}if(!r){d.cM.debug("Done, no node has children",e.nodes());return}for(let r of(d.cM.debug("Nodes = ",t,n),t))if(d.cM.debug("Extracting node",r,f,f.has(r)&&!f.get(r).externalConnections,!e.parent(r),e.node(r),e.children("D")," Depth ",n),f.has(r)){if(!f.get(r).externalConnections&&e.children(r)&&e.children(r).length>0){var i,a;d.cM.warn("Cluster without external connections, without a parent and with children",r,n);let t="TB"===e.graph().rankdir?"LR":"TB";(null===(a=f.get(r))||void 0===a?void 0:null===(i=a.clusterData)||void 0===i?void 0:i.dir)&&(t=f.get(r).clusterData.dir,d.cM.warn("Fixing dir",f.get(r).clusterData.dir,t));let o=new u.k({multigraph:!0,compound:!0}).setGraph({rankdir:t,nodesep:50,ranksep:50,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}});d.cM.warn("Old graph before copy",g(e)),y(r,e,o,r),e.setNode(r,{clusterNode:!0,id:r,clusterData:f.get(r).clusterData,label:f.get(r).label,graph:o}),d.cM.warn("New graph after copy node: (",r,")",g(o)),d.cM.debug("Old graph after copy",g(e))}else d.cM.warn("Cluster ** ",r," **not meeting the criteria !externalConnections:",!f.get(r).externalConnections," no parent: ",!e.parent(r)," children ",e.children(r)&&e.children(r).length>0,e.children("D"),n),d.cM.debug(f)}else d.cM.debug("Not a cluster",r,n);for(let r of(t=e.nodes(),d.cM.warn("New list of nodes",t),t)){let t=e.node(r);d.cM.warn(" Now next level",r,t),(null==t?void 0:t.clusterNode)&&C(t.graph,n+1)}},"extractor"),x=(0,d.eW)((e,n)=>{if(0===n.length)return[];let t=Object.assign([],n);return n.forEach(n=>{let r=e.children(n),i=x(e,r);t=[...t,...i]}),t},"sorter"),S=(0,d.eW)(e=>x(e,e.children()),"sortNodesByHierarchy"),I=(0,d.eW)(async(e,n,t,c,l,s)=>{d.cM.warn("Graph in recursive render:XAX",g(n),l);let u=n.graph().rankdir;d.cM.trace("Dir in recursive render - dir:",u);let h=e.insert("g").attr("class","root");n.nodes()?d.cM.info("Recursive render XXX",n.nodes()):d.cM.info("No nodes found for",n),n.edges().length>0&&d.cM.info("Recursive edges",n.edge(n.edges()[0]));let p=h.insert("g").attr("class","clusters"),w=h.insert("g").attr("class","edgePaths"),v=h.insert("g").attr("class","edgeLabels"),M=h.insert("g").attr("class","nodes");await Promise.all(n.nodes().map(async function(e){let r=n.node(e);if(void 0!==l){let t=JSON.parse(JSON.stringify(l.clusterData));d.cM.trace("Setting data for parent cluster XXX\n Node.id = ",e,"\n data=",t.height,"\nParent cluster",l.height),n.setNode(l.id,t),n.parent(e)||(d.cM.trace("Setting parent",e,l.id),n.setParent(e,l.id,t))}if(d.cM.info("(Insert) Node XXX"+e+": "+JSON.stringify(n.node(e))),null==r?void 0:r.clusterNode){d.cM.info("Cluster identified XBX",e,r.width,n.node(e));let{ranksep:a,nodesep:o}=n.graph();r.graph.setGraph({...r.graph.graph(),ranksep:a+25,nodesep:o});let l=await I(M,r.graph,t,c,n.node(e),s),g=l.elem;(0,i.jr)(r,g),r.diff=l.diff||0,d.cM.info("New compound node after recursive render XAX",e,"width",r.width,"height",r.height),(0,i.Yn)(g,r)}else n.children(e).length>0?(d.cM.trace("Cluster - the non recursive path XBX",e,r.id,r,r.width,"Graph:",n),d.cM.trace(b(r.id,n)),f.set(r.id,{id:b(r.id,n),node:r})):(d.cM.trace("Node - the non recursive path XAX",e,M,n.node(e),u),await (0,i.Lf)(M,n.node(e),{config:s,dir:u}))}));let y=(0,d.eW)(async()=>{let e=n.edges().map(async function(e){let t=n.edge(e.v,e.w,e.name);d.cM.info("Edge "+e.v+" -> "+e.w+": "+JSON.stringify(e)),d.cM.info("Edge "+e.v+" -> "+e.w+": ",e," ",JSON.stringify(n.edge(e))),d.cM.info("Fix",f,"ids:",e.v,e.w,"Translating: ",f.get(e.v),f.get(e.w)),await (0,r.I_)(v,t)});await Promise.all(e)},"processEdges");await y(),d.cM.info("Graph before layout:",JSON.stringify(g(n))),d.cM.info("############################################# XXX"),d.cM.info("###                Layout                 ### XXX"),d.cM.info("############################################# XXX"),(0,o.bK)(n),d.cM.info("Graph after layout:",JSON.stringify(g(n)));let X=0,{subGraphTitleTotalMargin:m}=(0,a.L)(s);return await Promise.all(S(n).map(async function(e){let t=n.node(e);if(d.cM.info("Position XBX => "+e+": ("+t.x,","+t.y,") width: ",t.width," height: ",t.height),null==t?void 0:t.clusterNode)t.y+=m,d.cM.info("A tainted cluster node XBX1",e,t.id,t.width,t.height,t.x,t.y,n.parent(e)),f.get(t.id).node=t,(0,i.aH)(t);else if(n.children(e).length>0){var r;d.cM.info("A pure cluster node XBX1",e,t.id,t.x,t.y,t.width,t.height,n.parent(e)),t.height+=m,n.node(t.parentId);let a=(null==t?void 0:t.padding)/2||0,o=(null==t?void 0:null===(r=t.labelBBox)||void 0===r?void 0:r.height)||0;d.cM.debug("OffsetY",o-a||0,"labelHeight",o,"halfPadding",a),await (0,i.us)(p,t),f.get(t.id).node=t}else{let e=n.node(t.parentId);t.y+=m/2,d.cM.info("A regular node XBX1 - using the padding",t.id,"parent",t.parentId,t.width,t.height,t.x,t.y,"offsetY",t.offsetY,"parent",e,null==e?void 0:e.offsetY,t),(0,i.aH)(t)}})),n.edges().forEach(function(e){let i=n.edge(e);d.cM.info("Edge "+e.v+" -> "+e.w+": "+JSON.stringify(i),i),i.points.forEach(e=>e.y+=m/2);let a=n.node(e.v);var o=n.node(e.w);let l=(0,r.QP)(w,i,f,t,a,o,c);(0,r.Jj)(i,l)}),n.nodes().forEach(function(e){let t=n.node(e);d.cM.info(e,t.type,t.diff),t.isGroup&&(X=t.diff)}),d.cM.warn("Returning from recursive render XAX",h,X),{elem:h,diff:X}},"recursiveRender"),D=(0,d.eW)(async(e,n)=>{var t,a,o,c,l,s;let f=new u.k({multigraph:!0,compound:!0}).setGraph({rankdir:e.direction,nodesep:(null===(t=e.config)||void 0===t?void 0:t.nodeSpacing)||(null===(o=e.config)||void 0===o?void 0:null===(a=o.flowchart)||void 0===a?void 0:a.nodeSpacing)||e.nodeSpacing,ranksep:(null===(c=e.config)||void 0===c?void 0:c.rankSpacing)||(null===(s=e.config)||void 0===s?void 0:null===(l=s.flowchart)||void 0===l?void 0:l.rankSpacing)||e.rankSpacing,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}}),h=n.select("g");(0,r.DQ)(h,e.markers,e.type,e.diagramId),(0,i.gU)(),(0,r.ZH)(),(0,i.ZH)(),w(),e.nodes.forEach(e=>{f.setNode(e.id,{...e}),e.parentId&&f.setParent(e.id,e.parentId)}),d.cM.debug("Edges:",e.edges),e.edges.forEach(e=>{if(e.start===e.end){let n=e.start,t=n+"---"+n+"---1",r=n+"---"+n+"---2",i=f.node(n);f.setNode(t,{domId:t,id:t,parentId:i.parentId,labelStyle:"",label:"",padding:0,shape:"labelRect",style:"",width:10,height:10}),f.setParent(t,i.parentId),f.setNode(r,{domId:r,id:r,parentId:i.parentId,labelStyle:"",padding:0,shape:"labelRect",label:"",style:"",width:10,height:10}),f.setParent(r,i.parentId);let a=structuredClone(e),d=structuredClone(e),o=structuredClone(e);a.label="",a.arrowTypeEnd="none",a.id=n+"-cyclic-special-1",d.arrowTypeEnd="none",d.id=n+"-cyclic-special-mid",o.label="",i.isGroup&&(a.fromCluster=n,o.toCluster=n),o.id=n+"-cyclic-special-2",f.setEdge(n,t,a,n+"-cyclic-special-0"),f.setEdge(t,r,d,n+"-cyclic-special-1"),f.setEdge(r,n,o,n+"-cyc<lic-special-2")}else f.setEdge(e.start,e.end,{...e},e.id)}),d.cM.warn("Graph at first:",JSON.stringify(g(f))),N(f),d.cM.warn("Graph after XAX:",JSON.stringify(g(f)));let p=(0,d.nV)();await I(h,f,e.type,e.diagramId,void 0,p)},"render")}}]);