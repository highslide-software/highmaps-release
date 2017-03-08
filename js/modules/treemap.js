/*
 Highcharts JS v5.0.8 (2017-03-08)

 (c) 2014 Highsoft AS
 Authors: Jon Arild Nygard / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(n){"object"===typeof module&&module.exports?module.exports=n:n(Highcharts)})(function(n){(function(f){var n=f.seriesType,q=f.seriesTypes,E=f.map,v=f.merge,y=f.extend,z=f.noop,m=f.each,x=f.grep,F=f.isNumber,A=f.isString,k=f.pick,u=f.Series,G=f.stableSort,H=function(a,b,c){var e;c=c||this;for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)},B=function(a,b,c,e){e=e||this;a=a||[];m(a,function(d,g){c=b.call(e,c,d,g,a)});return c},w=function(a,b,c){c=c||this;a=b.call(c,a);!1!==a&&w(a,b,c)};n("treemap",
"scatter",{showInLegend:!1,marker:!1,dataLabels:{enabled:!0,defer:!1,verticalAlign:"middle",formatter:function(){return this.point.name||this.point.id},inside:!0},tooltip:{headerFormat:"",pointFormat:"\x3cb\x3e{point.name}\x3c/b\x3e: {point.value}\x3c/b\x3e\x3cbr/\x3e"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}}},{pointArrayMap:["value"],axisTypes:q.heatmap?
["xAxis","yAxis","colorAxis"]:["xAxis","yAxis"],optionalAxis:"colorAxis",getSymbol:z,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",translateColors:q.heatmap&&q.heatmap.prototype.translateColors,trackerGroups:["group","dataLabelsGroup"],getListOfParents:function(a,b){a=B(a,function(a,b,d){b=k(b.parent,"");void 0===a[b]&&(a[b]=[]);a[b].push(d);return a},{});H(a,function(a,e,d){""!==e&&-1===f.inArray(e,b)&&(m(a,function(a){d[""].push(a)}),delete d[e])});return a},getTree:function(){var a=
E(this.data,function(a){return a.id}),a=this.getListOfParents(this.data,a);this.nodeMap=[];return this.buildNode("",-1,0,a,null)},init:function(a,b){u.prototype.init.call(this,a,b);this.options.allowDrillToNode&&f.addEvent(this,"click",this.onClickDrillToNode)},buildNode:function(a,b,c,e,d){var g=this,h=[],C=g.points[b],D;m(e[a]||[],function(b){D=g.buildNode(g.points[b].id,b,c+1,e,a);h.push(D)});b={id:a,i:b,children:h,level:c,parent:d,visible:!1};g.nodeMap[b.id]=b;C&&(C.node=b);return b},setTreeValues:function(a){var b=
this,c=b.options,e=0,d=[],g,h=b.points[a.i];w(b.nodeMap[b.rootNode],function(a){var c=!1,d=a.parent;a.visible=!0;if(d||""===d)c=b.nodeMap[d];return c});w(b.nodeMap[b.rootNode].children,function(a){var b=!1;m(a,function(a){a.visible=!0;a.children.length&&(b=(b||[]).concat(a.children))});return b});m(a.children,function(a){a=b.setTreeValues(a);d.push(a);a.ignore?w(a.children,function(a){var b=!1;m(a,function(a){y(a,{ignore:!0,isLeaf:!1,visible:!1});a.children.length&&(b=(b||[]).concat(a.children))});
return b}):e+=a.val});G(d,function(a,b){return a.sortIndex-b.sortIndex});g=k(h&&h.options.value,e);h&&(h.value=g);y(a,{children:d,childrenTotal:e,ignore:!(k(h&&h.visible,!0)&&0<g),isLeaf:a.visible&&!e,levelDynamic:c.levelIsConstant?a.level:a.level-b.nodeMap[b.rootNode].level,name:k(h&&h.name,""),sortIndex:k(h&&h.sortIndex,-g),val:g});return a},calculateChildrenAreas:function(a,b){var c=this,e=c.options,d=this.levelMap[a.levelDynamic+1],g=k(c[d&&d.layoutAlgorithm]&&d.layoutAlgorithm,e.layoutAlgorithm),
h=e.alternateStartingDirection,f=[];a=x(a.children,function(a){return!a.ignore});d&&d.layoutStartingDirection&&(b.direction="vertical"===d.layoutStartingDirection?0:1);f=c[g](b,a);m(a,function(a,d){d=f[d];a.values=v(d,{val:a.childrenTotal,direction:h?1-b.direction:b.direction});a.pointValues=v(d,{x:d.x/c.axisRatio,width:d.width/c.axisRatio});a.children.length&&c.calculateChildrenAreas(a,a.values)})},setPointValues:function(){var a=this.xAxis,b=this.yAxis;m(this.points,function(c){var e=c.node,d=e.pointValues,
g,h;d&&e.visible?(e=Math.round(a.translate(d.x,0,0,0,1))-0,g=Math.round(a.translate(d.x+d.width,0,0,0,1))-0,h=Math.round(b.translate(d.y,0,0,0,1))-0,d=Math.round(b.translate(d.y+d.height,0,0,0,1))-0,c.shapeType="rect",c.shapeArgs={x:Math.min(e,g),y:Math.min(h,d),width:Math.abs(g-e),height:Math.abs(d-h)},c.plotX=c.shapeArgs.x+c.shapeArgs.width/2,c.plotY=c.shapeArgs.y+c.shapeArgs.height/2):(delete c.plotX,delete c.plotY)})},setColorRecursive:function(a,b,c){var e=this,d,g;a&&(d=e.points[a.i],g=e.levelMap[a.levelDynamic],
b=k(d&&d.options.color,g&&g.color,b,e.color),c=k(d&&d.options.colorIndex,g&&g.colorIndex,c,e.colorIndex),d&&(d.color=b,d.colorIndex=c),a.children.length&&m(a.children,function(a){e.setColorRecursive(a,b,c)}))},algorithmGroup:function(a,b,c,e){this.height=a;this.width=b;this.plot=e;this.startDirection=this.direction=c;this.lH=this.nH=this.lW=this.nW=this.total=0;this.elArr=[];this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(a,b){return Math.max(a/b,b/a)}};this.addElement=function(a){this.lP.total=
this.elArr[this.elArr.length-1];this.total+=a;0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH));this.elArr.push(a)};
this.reset=function(){this.lW=this.nW=0;this.elArr=[];this.total=0}},algorithmCalcPoints:function(a,b,c,e){var d,g,h,f,k=c.lW,p=c.lH,l=c.plot,n,r=0,t=c.elArr.length-1;b?(k=c.nW,p=c.nH):n=c.elArr[c.elArr.length-1];m(c.elArr,function(a){if(b||r<t)0===c.direction?(d=l.x,g=l.y,h=k,f=a/h):(d=l.x,g=l.y,f=p,h=a/f),e.push({x:d,y:g,width:h,height:f}),0===c.direction?l.y+=f:l.x+=h;r+=1});c.reset();0===c.direction?c.width-=k:c.height-=p;l.y=l.parent.y+(l.parent.height-c.height);l.x=l.parent.x+(l.parent.width-
c.width);a&&(c.direction=1-c.direction);b||c.addElement(n)},algorithmLowAspectRatio:function(a,b,c){var e=[],d=this,g,h={x:b.x,y:b.y,parent:b},f=0,k=c.length-1,p=new this.algorithmGroup(b.height,b.width,b.direction,h);m(c,function(c){g=c.val/b.val*b.height*b.width;p.addElement(g);p.lP.nR>p.lP.lR&&d.algorithmCalcPoints(a,!1,p,e,h);f===k&&d.algorithmCalcPoints(a,!0,p,e,h);f+=1});return e},algorithmFill:function(a,b,c){var e=[],d,g=b.direction,f=b.x,k=b.y,n=b.width,p=b.height,l,q,r,t;m(c,function(c){d=
c.val/b.val*b.height*b.width;l=f;q=k;0===g?(t=p,r=d/t,n-=r,f+=r):(r=n,t=d/r,p-=t,k+=t);e.push({x:l,y:q,width:r,height:t});a&&(g=1-g)});return e},strip:function(a,b){return this.algorithmLowAspectRatio(!1,a,b)},squarified:function(a,b){return this.algorithmLowAspectRatio(!0,a,b)},sliceAndDice:function(a,b){return this.algorithmFill(!0,a,b)},stripes:function(a,b){return this.algorithmFill(!1,a,b)},translate:function(){var a=this.rootNode=k(this.rootNode,this.options.rootId,""),b,c;u.prototype.translate.call(this);
this.levelMap=B(this.options.levels,function(a,b){a[b.level]=b;return a},{});c=this.tree=this.getTree();b=this.nodeMap[a];""===a||b&&b.children.length||(this.drillToNode("",!1),a=this.rootNode,b=this.nodeMap[a]);this.setTreeValues(c);this.axisRatio=this.xAxis.len/this.yAxis.len;this.nodeMap[""].pointValues=a={x:0,y:0,width:100,height:100};this.nodeMap[""].values=a=v(a,{width:a.width*this.axisRatio,direction:"vertical"===this.options.layoutStartingDirection?0:1,val:c.val});this.calculateChildrenAreas(c,
a);this.colorAxis?this.translateColors():this.options.colorByPoint||this.setColorRecursive(this.tree);this.options.allowDrillToNode&&(b=b.pointValues,this.xAxis.setExtremes(b.x,b.x+b.width,!1),this.yAxis.setExtremes(b.y,b.y+b.height,!1),this.xAxis.setScale(),this.yAxis.setScale());this.setPointValues()},drawDataLabels:function(){var a=this,b=x(a.points,function(a){return a.node.visible}),c,e;m(b,function(b){e=a.levelMap[b.node.levelDynamic];c={style:{}};b.node.isLeaf||(c.enabled=!1);e&&e.dataLabels&&
(c=v(c,e.dataLabels),a._hasPointLabels=!0);b.shapeArgs&&(c.style.width=b.shapeArgs.width,b.dataLabel&&b.dataLabel.css({width:b.shapeArgs.width+"px"}));b.dlOptions=v(c,b.options.dataLabels)});u.prototype.drawDataLabels.call(this)},alignDataLabel:function(a){q.column.prototype.alignDataLabel.apply(this,arguments);a.dataLabel&&a.dataLabel.attr({zIndex:a.node.zIndex+1})},drawPoints:function(){var a=this,b=x(a.points,function(a){return a.node.visible});m(b,function(b){var c="levelGroup-"+b.node.levelDynamic;
a[c]||(a[c]=a.chart.renderer.g(c).attr({zIndex:1E3-b.node.levelDynamic}).add(a.group));b.group=a[c]});q.column.prototype.drawPoints.call(this);a.options.allowDrillToNode&&m(b,function(b){b.graphic&&(b.drillId=a.options.interactByLeaf?a.drillToByLeaf(b):a.drillToByGroup(b))})},onClickDrillToNode:function(a){var b=(a=a.point)&&a.drillId;A(b)&&(a.setState(""),this.drillToNode(b))},drillToByGroup:function(a){var b=!1;1!==a.node.level-this.nodeMap[this.rootNode].level||a.node.isLeaf||(b=a.id);return b},
drillToByLeaf:function(a){var b=!1;if(a.node.parent!==this.rootNode&&a.node.isLeaf)for(a=a.node;!b;)a=this.nodeMap[a.parent],a.parent===this.rootNode&&(b=a.id);return b},drillUp:function(){var a=this.nodeMap[this.rootNode];a&&A(a.parent)&&this.drillToNode(a.parent)},drillToNode:function(a,b){var c=this.nodeMap[a];this.rootNode=a;""===a?this.drillUpButton=this.drillUpButton.destroy():this.showDrillUpButton(c&&c.name||a);this.isDirty=!0;k(b,!0)&&this.chart.redraw()},showDrillUpButton:function(a){var b=
this;a=a||"\x3c Back";var c=b.options.drillUpButton,e,d;c.text&&(a=c.text);this.drillUpButton?this.drillUpButton.attr({text:a}).align():(d=(e=c.theme)&&e.states,this.drillUpButton=this.chart.renderer.button(a,null,null,function(){b.drillUp()},e,d&&d.hover,d&&d.select).attr({align:c.position.align,zIndex:7}).add().align(c.position,!1,c.relativeTo||"plotBox"))},buildKDTree:z,drawLegendSymbol:f.LegendSymbolMixin.drawRectangle,getExtremes:function(){u.prototype.getExtremes.call(this,this.colorValueData);
this.valueMin=this.dataMin;this.valueMax=this.dataMax;u.prototype.getExtremes.call(this)},getExtremesFromAll:!0,bindAxes:function(){var a={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};u.prototype.bindAxes.call(this);f.extend(this.yAxis.options,a);f.extend(this.xAxis.options,a)}},{getClassName:function(){var a=f.Point.prototype.getClassName.call(this),b=this.series,c=b.options;this.node.level<=b.nodeMap[b.rootNode].level?
a+=" highcharts-above-level":this.node.isLeaf||k(c.interactByLeaf,!c.allowDrillToNode)?this.node.isLeaf||(a+=" highcharts-internal-node"):a+=" highcharts-internal-node-interactive";return a},isValid:function(){return F(this.value)},setState:function(a){f.Point.prototype.setState.call(this,a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:0})},setVisible:q.pie.prototype.pointClass.prototype.setVisible})})(n)});
