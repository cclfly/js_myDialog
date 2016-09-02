function myAddEvent(obj,sEv,fn)
{
	if(obj.attachEvent)
	{
		obj.attachEvent("on"+sEv,fn);
	}
	else
	{
		obj.addEventListener(sEv,fn,false);
	}
}

function myDelEvent(obj,sEv,fn)
{
	if(obj.detachEvent)
	{
		obj.detachEvent("on"+sEv,fn);
	}
	else
	{
		obj.removeEventListener(sEv,fn,false);
	}
}

function Dialog(width,height){
	this.obj = null;
	this.Init(width||320,height||60);
	this.fnInit = this.Init.bind(this);				//自动居中用来绑定的函数
	this.OpenAutoCenter();
}

Dialog.prototype = {
	Init:function(width,height){
		if(!this.obj)
		{
			this.width = width;
			this.height = height;
			this.obj = document.createElement('div');
			this.obj.style.backgroundColor = "#66ccff";			//测试方便
			this.obj.style.position = "absolute";
			this.obj.style.display = "none";
			(document.body||document.documentElement).appendChild(this.obj);
		}
		this.left = ((window.innerWidth||(document.body&&document.body.clientWidth))-this.width)/2;
		this.top = ((window.innerHeight||(document.body&&document.body.clientHeight))-this.height)/2-((window.innerHeight||(document.body&&document.body.clientHeight))-this.height)/20;
		
		this.obj.style.width = this.width+"px";
		this.obj.style.height = this.height+"px";
		this.obj.style.left = this.left+"px";
		this.obj.style.top = this.top+"px";
	},
	Resize:function(width,height){
		this.width = width;
		this.height = height;
		this.obj.style.width = this.width+"px";
		this.obj.style.height = this.height+"px";
	},
	Show:function(diaText,diaTitle){
		var text = diaText||"";
		var title = diaTitle||"dialog";
		this.obj.style.display = "block";
	},
	Close:function(){
		(document.body||document.documentElement).removeChild(this.obj);
	},
	CloseAutoCenter:function(){
		myDelEvent(window,"resize",this.fnInit);
	},
	OpenAutoCenter:function(){
		myAddEvent(window,"resize",this.fnInit);
	},
	Move:function(left,top,width,height){
		this.CloseAutoCenter();
		
		this.left = left||this.left;
		this.top = top||this.top;
		this.width = width||this.width;
		this.height = height||this.height;
		
		this.obj.style.left = this.left + "px";
		this.obj.style.top = this.top + "px";
		this.obj.style.width = this.width + "px";
		this.obj.style.height = this.height + "px";
	}
};
