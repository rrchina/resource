/*
fixColumnNumber:冻结列数
autoShrinkWidth:当宽度大于table宽度时,显示区域自动缩小到table宽度
autoShrinkHeight:当高度大于table高度时,显示区域自动缩小到table高度
*/
function fixTable(tableID,width,height,fixColumnNumber,autoShrinkWidth,autoShrinkHeight){
    if(autoShrinkWidth==undefined){
        autoShrinkWidth=0;
    }
    if(autoShrinkHeight==undefined){
        autoShrinkHeight=0;
    }
    if(fixColumnNumber==undefined){
        fixColumnNumber=1;
    }
    if ($("#"+tableID+"_tableLayout").length!=0) {
        $("#"+tableID+"_tableLayout").before($("#"+tableID));
        $("#"+tableID+"_tableLayout").empty();
    }else {
        $("#"+tableID).after('<div id="'+tableID+'_tableLayout" autoShrinkWidth='+autoShrinkWidth+' fixColumNumber="'+fixColumnNumber+'" autoShrinkHeight="'+autoShrinkHeight+'" class="ftLayout" style="overflow:hidden;position:relative"></div>');
    }
    var $layoutDiv=$("#"+tableID+"_tableLayout");
    $layoutDiv.css({width:width,height:height});
    $('<div id="'+tableID+'_tableFix" class="ftFix"></div>'
    + '<div id="'+tableID+'_tableHead" class="ftHead"></div>'
    + '<div id="'+tableID+'_tableColumn" class="ftColumn"></div>'
    + '<div id="'+tableID+'_tableData" class="ftData"></div>').appendTo("#"+tableID+"_tableLayout");
    var $fixDiv=$("#"+tableID+"_tableFix"),$headDiv =$("#"+tableID+"_tableHead"),$columnDiv =$("#"+tableID+"_tableColumn"),$dataDiv=$("#"+tableID+"_tableData");
    var oldtable=$("#"+tableID);
    var tableFixClone=oldtable.clone(true);
    tableFixClone.attr("id", tableID+"_tableFixClone");
    tableFixClone.addClass("ftTableFix");
    $fixDiv.append(tableFixClone);
    var tableHeadClone=oldtable.clone(true);
    tableHeadClone.attr("id",tableID+"_tableHeadClone");
    tableHeadClone.addClass("ftTableHead");
    $headDiv.append(tableHeadClone);
    var tableColumnClone = oldtable.clone(true);
    tableColumnClone.attr("id",tableID+"_tableColumnClone");
    tableColumnClone.addClass("ftTableColumn");
    $columnDiv.append(tableColumnClone);
    $dataDiv.append(oldtable);
    var $dataTable=oldtable;
    $dataTable.addClass("ftTableData");
    $layoutDiv.find("table").each(function () {
        $(this).css("margin", "0");
    });
    $dataDiv.scroll(function () {
        $headDiv.scrollLeft($dataDiv.scrollLeft());
        $columnDiv.scrollTop($dataDiv.scrollTop());
    });
    $dataDiv.css({ "overflow-x":"scroll","overflow-y":"scroll","width":"100%","height":"100%","position":"absolute","left":0,"top":0});
    ftSetSize(tableID)
}
$(function(){
    $(window).resize(function () {
        $(".ftLayout").each(function(){
            var tableID = $(this).attr("id").replace("_tableLayout", "");
            ftSetSize(tableID);
        });
    });
})
function ftSetSize(tableID){
    var scrollBarWidth = getScrollBarWidth();
    var $layoutDiv, $dataDiv, $fixDiv, $headDiv, $columnDiv, $tableData, $tableFix, $tableHead, $tableColumn;
    var autoShrinkWidth, autoShrinkHeight, fixColumnNumber;

    $layoutDiv = $("#"+tableID+"_tableLayout");
    autoShrinkWidth=parseInt($layoutDiv.attr("autoShrinkWidth"));
    autoShrinkHeight=parseInt($layoutDiv.attr("autoShrinkHeight"));
    fixColumnNumber=parseInt($layoutDiv.attr("fixColumNumber"));
    $dataDiv = $layoutDiv.find(".ftData");
    $fixDiv = $layoutDiv.find(".ftFix");
    $headDiv = $layoutDiv.find(".ftHead");
    $columnDiv = $layoutDiv.find(".ftColumn");
    //$tableData = $layoutDiv.find(".ftTableData");
    $tableData = $layoutDiv.find("#" + tableID);
    $tableFix = $layoutDiv.find(".ftTableFix");
    $tableHead = $layoutDiv.find(".ftTableHead");
    $tableColumn = $layoutDiv.find(".ftTableColumn");

    //设置所有table宽度一致
    var dataTableWidth = $tableData.outerWidth();
    $tableFix.width(dataTableWidth);
    $tableHead.width(dataTableWidth);
    $tableColumn.width(dataTableWidth);

    var HeadHeight=$headDiv.find("td:first").outerHeight();
    var ColumnsWidth=0;
    var ColumnsNumber=0;
    $("#"+tableID+"_tableColumn tr:first td:lt("+fixColumnNumber+")").each(function(){
        ColumnsWidth += $(this).outerWidth(true);
        ColumnsNumber++;
    });
    //ColumnsWidth+=2;
    $fixDiv.css({"overflow":"hidden","width":ColumnsWidth,"height":HeadHeight,"position":"absolute","left":0,top:0,"z-index":"2","background-color":"white" });
    $headDiv.css({"overflow":"hidden","width":$layoutDiv.width()-scrollBarWidth,"height":HeadHeight,"position":"absolute","left":0,"top":0,"z-index":"1","background-color":"white" });
    $columnDiv.css({"overflow":"hidden","width":ColumnsWidth,"height":$layoutDiv.height()-scrollBarWidth,"position":"absolute","left":0,"top":0,"z-index":"1","background-color":"white" });
    if (autoShrinkWidth&&$dataDiv.width()>dataTableWidth+scrollBarWidth) {
        $headDiv.css("width", dataTableWidth);
        $dataDiv.css("width", dataTableWidth+scrollBarWidth);
        $layoutDiv.css("width", dataTableWidth + scrollBarWidth);
    }
    var dataTableHeight=$tableData.outerHeight();
    if (autoShrinkHeight&&$columnDiv.height()>dataTableHeight) {
        $columnDiv.css("height",dataTableHeight);
        $layoutDiv.css("height",dataTableHeight+scrollBarWidth);
    }
}
function getScrollBarWidth(){
    var $div1=$('<div style="width:100px;height:1px;overflow-y:scroll;overflow-x:hidden"></div>');
    var $div2=$('<div style="width:100%;height:1px;background:blue"></div>');
    $div1.append($div2);
    $("body").append($div1);
    var scrollBarWidth=100-$div2.width();
    $div1.remove();
    return scrollBarWidth;
}