function Dialog(width,height){
	this.Init(width||320,height||60);
	this.flagAutoMove = true;
	this.OpenAutoMove();
}

Dialog.prototype = {
	Init:function(width,height){
		this.width=width;
		this.height=height;
		this.left=((window.innerWidth||(document.body&&document.body.clientWidth))-this.width)/2;
		this.top=((window.innerHeight||(document.body&&document.body.clientHeight))-this.height)/2-((window.innerHeight||(document.body&&document.body.clientHeight))-this.height)/20;
		
		if(!this.obj)
		{
			this.obj = document.createElement('div');
			this.obj.style.position="absolute";
			this.obj.style.backgroundColor="#66ccff";
			this.obj.style.display="none";
			document.documentElement.appendChild(this.obj);
		}
		this.obj.style.width=this.width+"px";
		this.obj.style.height=this.height+"px";
		this.obj.style.left=this.left+"px";
		this.obj.style.top=this.top+"px";
	},
	Resize:function(width,height){
		this.width=width;
		this.height=height;
		this.obj.style.width=this.width+"px";
		this.obj.style.height=this.height+"px";
	},
	Show:function(diaText,diaTitle){
		var text = diaText||"";
		var title = diaTitle||"dialog";
		this.obj.style.display="block";
	},
	Close:function(){},
	CloseAutoMove(){
		this.flagAutoMove=false;
	},
	OpenAutoMove(){
		var w=(window.innerWidth||(document.body&&document.body.clientWidth));
		var h=(window.innerHeight||(document.body&&document.body.clientHeight));
		
		this.timerAutoMove = setInterval(function(){
			if((window.innerWidth||(document.body&&document.body.clientWidth))!=w||(window.innerHeight||(document.body&&document.body.clientHeight))!=h)
			{
				this.left=((window.innerWidth||(document.body&&document.body.clientWidth))-this.width)/2;
				this.top=((window.innerHeight||(document.body&&document.body.clientHeight))-this.height)/2-((window.innerHeight||(document.body&&document.body.clientHeight))-this.height)/20;
				this.obj.style.left=this.left+"px";
				this.obj.style.top=this.top+"px";
				w=(window.innerWidth||(document.body&&document.body.clientWidth));
				h=(window.innerHeight||(document.body&&document.body.clientHeight));
			}
			if(!this.flagAutoMove&&this.timerAutoMove)
			{
				clearInterval(this.timerAutoMove);
			}
		}.bind(this),30);
	},
	Move(left,top){
		if(this.flagAutoMove)
		{
			this.CloseAutoMove();
		}
		this.left=left;
		this.top=top;
		this.obj.style.left=this.left+"px";
		this.obj.style.top=this.top+"px";
	}
};
