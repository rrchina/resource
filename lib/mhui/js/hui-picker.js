﻿var HUI_PickerTimer = null, HUI_PickerId = 1;
function huiPickerHide(id){hui('.hui-picker').hide();}
function huiPicker(selector, callBack) {
    this.unSelectedColor = "#9e9e9e";
    this.selectedColor = "#000000";
    this.unSelectedFontSize = "14px";
    this.selectedFontSize = "14px";
	this.pickerBtn    = hui(selector);
	this.pickerId     = 'HUI_PickerMain' + HUI_PickerId;
	this.relevance    = true; 
	var huiPickerMain = document.createElement('div');
	huiPickerMain.setAttribute('class', 'hui-picker');
	huiPickerMain.setAttribute('id', this.pickerId);
	huiPickerMain.innerHTML = '<div class="hui-picker-menu">'+
	'<div class="hui-fl hui-button hui-button-small" style="color:#999999;" onclick="huiPickerHide();">取消</div>'+
	'<div class="hui-fr hui-button hui-button-small hui-primary" id="HUI_PickerConfirm'+HUI_PickerId+'">确定</div>'+
'</div>'+
'<div class="hui-picker-list-in"></div>'+
'<div class="hui-picker-line"></div>';
	document.body.appendChild(huiPickerMain);
	this.pickerMain   = hui('#'+this.pickerId);
	this.listAll      = null; this.level = 1; var thisObj = this;
	hui('#HUI_PickerConfirm'+HUI_PickerId).click(function(){
		huiPickerHide(thisObj.pickerId);
		if(callBack){callBack();}
	});
	HUI_PickerId++;
	this.pickerBtn.click(function () { hui('.hui-picker').hide(); thisObj.pickerMain.show(); if (thisObj.onshow) { setTimeout(thisObj.onshow,10)}});
	this.onshow = null;
	this.bindData = function(index, data){
		this.relevance = false;
		var lists = this.pickerMain.find('.hui-picker-list');
		if(lists.length < 1){
			var listsHtml = '';
			var cWidth = parseInt(100 / this.level) + '%';
			for(var i = 0; i < this.level; i++){
				listsHtml += '<div class="hui-picker-list" huiseindex="0" huisevalue="0" huisetext="" levelNumber="'+i+'" style="width:'+cWidth+';"></div>';
			}
			this.pickerMain.find('.hui-picker-list-in').eq(0).html(listsHtml);
		}
		this.listAll = this.pickerMain.find('.hui-picker-list');
		var html = '';
		for(var ii = 0; ii < data.length; ii++){html += '<div pickVal="'+data[ii].value+'">'+data[ii].text+'</div>';}
		this.listAll.eq(index).html('<div style="height:96px;"><input type="hidden" value="0" /></div>' + html + '<div style="height:66px;"></div>');
		this.listAll.eq(index).dom[0].addEventListener('scroll', this.scrollFun);
		//默认第一个被选中
		this.listAll.eq(index).find('div').eq(1).css({ color:this.selectedColor, 'fontSize': this.selectedFontSize }).siblings().css({ color: this.unSelectedColor, 'fontSize': this.unSelectedFontSize });
		if(typeof(data[0]) != 'undefined'){
			this.listAll.eq(index).attr('huisevalue', data[0].value);
			this.listAll.eq(index).attr('huisetext', data[0].text);
		}
	}
	this.bindRelevanceData = function(data){
		this.dataSave = data;
		//加载选项列表
		var lists = this.pickerMain.find('.hui-picker-list');
		if(lists.length < 1){
			var listsHtml = '';
			var cWidth = parseInt(100 / this.level) + '%';
			for(var i = 0; i < this.level; i++){
				listsHtml += '<div class="hui-picker-list" huiseindex="0" huisevalue="0" huisetext="" levelNumber="'+i+'" style="width:'+cWidth+';"></div>';
			}
			this.pickerMain.find('.hui-picker-list-in').eq(0).html(listsHtml);
		}
		this.listAll = this.pickerMain.find('.hui-picker-list');
		//循环设置选项
		var newData = data;
		for(var i = 0; i < this.level; i++){
			if(i >= 1){
				if(newData[0].children){newData = newData[0].children;}else{newData = new Array();}
			}
			this.listAll.eq(i).html('');
			var html = '';
			for(var ii = 0; ii < newData.length; ii++){html += '<div pickVal="'+newData[ii].value+'">'+newData[ii].text+'</div>';}
			this.listAll.eq(i).html('<div style="height:96px;"><input type="hidden" value="0" /></div>' + html + '<div style="height:66px;"></div>');
			this.listAll.eq(i).dom[0].addEventListener('scroll', this.scrollFun);
		    //默认第一个被选中
			this.listAll.eq(i).find('div').eq(1).css({ color: this.selectedColor, 'fontSize': this.selectedFontSize }).siblings().css({ color: this.unSelectedColor, 'fontSize': this.unSelectedFontSize });
			if(typeof(newData[0]) != 'undefined'){
				this.listAll.eq(i).attr('huisevalue', newData[0].value);
				this.listAll.eq(i).attr('huisetext', newData[0].text);
			}
		}
	}
	this.scrollFun = function () {
	    var scTop = this.scrollTop, scObj = this;
		if(HUI_PickerTimer != null){clearTimeout(HUI_PickerTimer);}
		HUI_PickerTimer = setTimeout(function(){thisObj.scrollDo(scTop, scObj);},50);
	}
	this.scrollDo = function(scTop, scObj){
		scObj.removeEventListener('scroll', this.scrollFun);
		var cList = hui(scObj), index = Math.round(scTop / 30), oldIndex = scObj.getAttribute('huiseindex');
		scObj.setAttribute('huiseindex', index);
		var selectDom   = cList.find('div').eq(index + 1);
		scObj.setAttribute('huisevalue', selectDom.attr('pickVal'));
		scObj.setAttribute('huisetext', selectDom.html());
		scObj.scrollTop = index * 30;
		cList.find('div').eq(index + 1).css({ color: this.selectedColor, 'fontSize': this.selectedFontSize,'transform':'scale(1)'}).siblings().css({ color: this.unSelectedColor, 'fontSize': this.unSelectedFontSize });
		var levelNumber = Number(scObj.getAttribute('levelNumber'));
		if(levelNumber < this.level - 1 && thisObj.relevance){
			if(oldIndex != index){this.nextReBind(index, levelNumber + 1);}
		}
		setTimeout(function(){scObj.addEventListener('scroll', thisObj.scrollFun);}, 100);
	}
	this.setSelectedTexts = function (texts) {
	    var allList = this.pickerMain.find('.hui-picker-list');
	    for (var i = 0; i < texts.length; i++) {
	        var clist = allList.eq(i);
	        var items = clist.find("[pickVal]");
	        for (var j = 0; j < items.length; j++) {
	            if (items.eq(j).html() == texts[i]) {
	                this.scrollDo(30 * j, clist.dom[0]);
	                break;
	            }
	        }
	    }
	}
	this.setSelectedVals = function (vals) {
	    var allList = this.pickerMain.find('.hui-picker-list');
	    for (var i = 0; i < vals.length; i++) {
	        var clist = allList.eq(i);
	        var items = clist.find("[pickVal]");
	        for (var j = 0; j < items.length; j++) {
	            if (items.eq(j).attr('pickval') == vals[i]) {
	                this.scrollDo(30 * j, clist.dom[0]);
	                break;
	            }
	        }
	    }
	}
	this.nextReBind = function(index, level){
		var allList  = this.pickerMain.find('.hui-picker-list');
		var bindList = allList.eq(level);
		bindList.html('');
		var html = '', newData = this.dataSave;
		//向上逐层寻找
		for(var k = 0; k < level; k++){
			var pIndex = allList.eq(k).attr('huiseindex');
			if(newData[pIndex].children){
				newData = newData[pIndex].children;
			}else{
				newData = new Array();
			}
		}
		if(newData.length > 0){
			for(var ii = 0; ii < newData.length; ii++){html += '<div pickVal="'+newData[ii].value+'">'+newData[ii].text+'</div>';}
			bindList.html('<div style="height:96px;"></div>' + html + '<div style="height:66px;"></div>');
			bindList.dom[0].scrollTop = 0;
			bindList.dom[0].setAttribute('huiseindex', 0);
			bindList.dom[0].setAttribute('huisevalue', newData[0].value);
			bindList.dom[0].setAttribute('huisetext', newData[0].text);
		}else{
			bindList.dom[0].setAttribute('huiseindex', 0);
			bindList.dom[0].setAttribute('huisevalue', 0);
			bindList.dom[0].setAttribute('huisetext', '');
		}
		if (newData.length > 0) {
		    allList.eq(level).find('div').eq(1).css({ color: this.selectedColor, 'fontSize': this.selectedFontSize }).siblings().css({ color: this.unSelectedColor, 'fontSize': this.unSelectedFontSize });
		}
		if(level < this.level - 1){this.nextReBind(0, level + 1);}
	}
	
	this.getVal  = function(index){
		if(!index){index = 0;}
		return this.pickerMain.find('.hui-picker-list').eq(index).attr('huisevalue');
	}
	this.getText = function(index){
		if(!index){index = 0;}
		return this.pickerMain.find('.hui-picker-list').eq(index).attr('huisetext');
	}
}