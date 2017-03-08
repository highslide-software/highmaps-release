/*
 Highcharts JS v5.0.8 (2017-03-08)
 Boost module

 (c) 2010-2016 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(p){"object"===typeof module&&module.exports?module.exports=p:p(Highcharts)})(function(p){(function(d){function p(a,b,c,g,e){e=e||0;g=g||5E4;for(var d=e+g,f=!0;f&&e<d&&e<a.length;)f=b(a[e],e),e+=1;f&&(e<a.length?setTimeout(function(){p(a,b,c,g,e)}):c&&c())}function z(a){return a.series.length>=((a.options.boost?a.options.boost.seriesThreshold:0)||a.options.chart.seriesBoostThreshold||10)}var A=d.win.document,Z=function(){},aa=d.Color,m=d.Series,k=d.seriesTypes,w=d.each,B=d.extend,x=d.addEvent,
ba=d.fireEvent,r=d.isNumber,ca=d.merge,da=d.pick,n=d.wrap;d.getOptions();var L;d.initCanvasBoost=function(){d.seriesTypes.heatmap&&d.wrap(d.seriesTypes.heatmap.prototype,"drawPoints",function(){var a=this.getContext();a?(w(this.points,function(b){var c=b.plotY;void 0===c||isNaN(c)||null===b.y||(c=b.shapeArgs,b=b.pointAttr&&b.pointAttr[""]||b.series.pointAttribs(b),a.fillStyle=b.fill,a.fillRect(c.x,c.y,c.width,c.height))}),this.canvasToSVG()):this.chart.showLoading("Your browser doesn't support HTML5 canvas, \x3cbr\x3eplease use a modern browser")});
d.extend(m.prototype,{directTouch:!1,pointRange:0,allowDG:!1,hasExtremes:function(a){var b=this.options,c=this.xAxis&&this.xAxis.options,g=this.yAxis&&this.yAxis.options;return b.data.length>(b.boostThreshold||Number.MAX_VALUE)&&r(g.min)&&r(g.max)&&(!a||r(c.min)&&r(c.max))},destroyGraphics:function(){var a=this,b=this.points,c,g;if(b)for(g=0;g<b.length;g+=1)(c=b[g])&&c.graphic&&(c.graphic=c.graphic.destroy());w(["graph","area","tracker"],function(c){a[c]&&(a[c]=a[c].destroy())})},getContext:function(){var a=
this.chart,b=a.chartWidth,c=a.chartHeight,g=this.group,e=this,d,f=function(a,c,b,e,g,d,f){a.call(this,b,c,e,g,d,f)};z(a)&&(e=a,g=a.seriesGroup);d=e.ctx;e.canvas||(e.canvas=A.createElement("canvas"),e.image=a.renderer.image("",0,0,b,c).add(g),e.ctx=d=e.canvas.getContext("2d"),a.inverted&&w(["moveTo","lineTo","rect","arc"],function(a){n(d,a,f)}),e.boostClipRect=a.renderer.clipRect(a.plotLeft,a.plotTop,a.plotWidth,a.chartHeight),e.image.clip(e.boostClipRect));e.canvas.width!==b&&(e.canvas.width=b);e.canvas.height!==
c&&(e.canvas.height=c);e.image.attr({x:0,y:0,width:b,height:c,style:"pointer-events: none"});e.boostClipRect.attr({x:0,y:0,width:a.plotWidth,height:a.chartHeight});return d},canvasToSVG:function(){z(this.chart)?this.image&&this.image.attr({href:""}):this.image.attr({href:this.canvas.toDataURL("image/png")})},cvsLineTo:function(a,b,c){a.lineTo(b,c)},renderCanvas:function(){var a=this,b=a.options,c=a.chart,g=this.xAxis,e=this.yAxis,k=(c.options.boost||{}).timeRendering||!1,f,t=0,m=a.processedXData,
w=a.processedYData,n=b.data,l=g.getExtremes(),C=l.min,D=l.max,l=e.getExtremes(),x=l.min,A=l.max,M={},E,ea=!!a.sampling,N,F=b.marker&&b.marker.radius,O=this.cvsDrawPoint,G=b.lineWidth?this.cvsLineTo:!1,P=F&&1>=F?this.cvsMarkerSquare:this.cvsMarkerCircle,fa=this.cvsStrokeBatch||1E3,ga=!1!==b.enableMouseTracking,Q,l=b.threshold,u=e.getThreshold(l),R=r(l),S=u,ha=this.fill,T=a.pointArrayMap&&"low,high"===a.pointArrayMap.join(","),U=!!b.stacking,ia=a.cropStart||0,l=c.options.loading,ja=a.requireSorting,
V,ka=b.connectNulls,W=!m,H,I,v,y,J,q=U?a.data:m||n;z(c);var la=a.fillOpacity?(new aa(a.color)).setOpacity(da(b.fillOpacity,.75)).get():a.color,X=function(){ha?(f.fillStyle=la,f.fill()):(f.strokeStyle=a.color,f.lineWidth=b.lineWidth,f.stroke())},Y=function(b,e,g,d){0===t&&(f.beginPath(),G&&(f.lineJoin="round"));c.scroller&&"highcharts-navigator-series"===a.options.className?(e+=c.scroller.top,g&&(g+=c.scroller.top)):e+=c.plotTop;b+=c.plotLeft;V?f.moveTo(b,e):O?O(f,b,e,g,Q):G?G(f,b,e):P&&P.call(a,f,
b,e,F,d);t+=1;t===fa&&(X(),t=0);Q={clientX:b,plotY:e,yBottom:g}},K=function(a,b,d){J=a+","+b;ga&&!M[J]&&(M[J]=!0,c.inverted&&(a=g.len-a,b=e.len-b),N.push({clientX:a,plotX:a,plotY:b,i:ia+d}))};(this.points||this.graph)&&this.destroyGraphics();a.plotGroup("group","series",a.visible?"visible":"hidden",b.zIndex,c.seriesGroup);a.markerGroup=a.group;N=this.points=[];f=this.getContext();a.buildKDTree=Z;99999<n.length&&(c.options.loading=ca(l,{labelStyle:{backgroundColor:d.color("#ffffff").setOpacity(.75).get(),
padding:"1em",borderRadius:"0.5em"},style:{backgroundColor:"none",opacity:1}}),clearTimeout(L),c.showLoading("Drawing..."),c.options.loading=l);k&&console.time("canvas rendering");p(q,function(b,d){var f,h,k,l=!1,p=!1,m=!1,n=!1,r="undefined"===typeof c.index,t=!0;if(!r){W?(f=b[0],h=b[1],q[d+1]&&(m=q[d+1][0]),q[d-1]&&(n=q[d-1][0])):(f=b,h=w[d],q[d+1]&&(m=q[d+1]),q[d-1]&&(n=q[d-1]));m&&m>=C&&m<=D&&(l=!0);n&&n>=C&&n<=D&&(p=!0);T?(W&&(h=b.slice(1,3)),k=h[0],h=h[1]):U&&(f=b.x,h=b.stackY,k=h-b.y);b=null===
h;ja||(t=h>=x&&h<=A);if(!b&&(f>=C&&f<=D&&t||l||p))if(f=Math.round(g.toPixels(f,!0)),ea){if(void 0===v||f===E){T||(k=h);if(void 0===y||h>I)I=h,y=d;if(void 0===v||k<H)H=k,v=d}f!==E&&(void 0!==v&&(h=e.toPixels(I,!0),u=e.toPixels(H,!0),Y(f,R?Math.min(h,S):h,R?Math.max(u,S):u,d),K(f,h,y),u!==h&&K(f,u,v)),v=y=void 0,E=f)}else h=Math.round(e.toPixels(h,!0)),Y(f,h,u,d),K(f,h,d);V=b&&!ka;0===d%5E4&&a.canvasToSVG()}return!r},function(){var b=c.loadingDiv,e=c.loadingShown;X();a.canvasToSVG();k&&console.timeEnd("canvas rendering");
ba(a,"renderedCanvas");e&&(B(b.style,{transition:"opacity 250ms",opacity:0}),c.loadingShown=!1,L=setTimeout(function(){b.parentNode&&b.parentNode.removeChild(b);c.loadingDiv=c.loadingSpan=null},250));a.directTouch=!1;a.options.stickyTracking=!0;delete a.buildKDTree;a.buildKDTree()},c.renderer.forExport?Number.MAX_VALUE:void 0)}});n(m.prototype,"setData",function(a){this.hasExtremes&&this.hasExtremes(!0)&&"heatmap"!==this.type||a.apply(this,Array.prototype.slice.call(arguments,1))});n(m.prototype,
"processData",function(a){this.hasExtremes&&this.hasExtremes(!0)&&"heatmap"!==this.type||a.apply(this,Array.prototype.slice.call(arguments,1))});k.scatter.prototype.cvsMarkerCircle=function(a,b,c,d){a.moveTo(b,c);a.arc(b,c,d,0,2*Math.PI,!1)};k.scatter.prototype.cvsMarkerSquare=function(a,b,c,d){a.rect(b-d,c-d,2*d,2*d)};k.scatter.prototype.fill=!0;k.bubble&&(k.bubble.prototype.cvsMarkerCircle=function(a,b,c,d,e){a.moveTo(b,c);a.arc(b,c,this.radii&&this.radii[e],0,2*Math.PI,!1)},k.bubble.prototype.cvsStrokeBatch=
1);B(k.area.prototype,{cvsDrawPoint:function(a,b,c,d,e){e&&b!==e.clientX&&(a.moveTo(e.clientX,e.yBottom),a.lineTo(e.clientX,e.plotY),a.lineTo(b,c),a.lineTo(b,d))},fill:!0,fillOpacity:!0,sampling:!0});B(k.column.prototype,{cvsDrawPoint:function(a,b,c,d){a.rect(b-1,c,1,d-c)},fill:!0,sampling:!0});d.Chart.prototype.callbacks.push(function(a){x(a,"predraw",function(){a.image&&a.image.attr({href:""});a.canvas&&a.canvas.getContext("2d").clearRect(0,0,a.canvas.width,a.canvas.height)});x(a,"render",function(){a.image&&
a.canvas&&a.image.attr({href:a.canvas.toDataURL("image/png")})})})}})(p)});
