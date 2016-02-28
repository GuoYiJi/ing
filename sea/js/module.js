// 定义模块
// 变量参数名不允许修改
define(function (require, exports, module){
	// require: 模块之间依赖的接口
	// 当引入的是sea下的模块，那么require执行完返回对应的接口
	var module2 = require('./module2.js');	
	function a(){
		alert(module2.num);
	}
	// 向外提供接口
	exports.a = a;
});