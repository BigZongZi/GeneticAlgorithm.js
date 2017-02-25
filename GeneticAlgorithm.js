/* Javascript遗传算法插件，庵中十三居士提供 */
function GA(par){
	var pa = {
		fitness:function(g){return 1;},/* 适应度函数 */
		chrLength:5,/* 染色体长度 */
		geneType:[0,1],/* 基因类型 */
		popSize:100,/* 种群大小 */
		survival:0.8,/* 生存率 */
		variation:0.3,/* 变异概率 */
		loop:2000,/* 循环代数 */
		stop:12/* 停止适应度 */
	};
	for (var name in par){
		pa[name] = par[name];
	}
	/* 这里_GENETIC_ALHORITHM_作为内变量 */
	var _GENETIC_ALHORITHM_ = {};
	/* 初始 */
	console.log('准备中...');
	_GENETIC_ALHORITHM_.pops = Array();
	var chromosome;
	for (var i = 0; i < pa.popSize; i++){
		chromosome = Array();
		for (var j = 0; j < pa.chrLength; j++){
			chromosome.push(pa.geneType[parseInt(Math.random()*pa.geneType.length)]);
		}
		_GENETIC_ALHORITHM_.pops.push(chromosome);
	}
	var fitness;
	var temp;
	var saveNum = parseInt(pa.survival * pa.popSize);
	var halfg = parseInt(pa.chrLength / 2);
	console.log('每次将保留:'+saveNum);
	console.log('1/2断点:'+halfg);
	console.log('初始化结束，开始迭代');
	for (var i = 0; i < pa.loop; i++){
		fitness = [];
		for (var j = 0; j < pa.popSize; j++){
			fitness.push(pa.fitness(_GENETIC_ALHORITHM_.pops[j]));
		}
		/* 冒泡 */
		for (var j = pa.popSize-1; j > 0; j--){
			for (var k = 0; k < j; k++){
				if (fitness[k] < fitness[k+1]){
					temp = fitness[k];
					fitness[k] = fitness[k+1];
					fitness[k+1] = temp;
					temp = _GENETIC_ALHORITHM_.pops[k];
					_GENETIC_ALHORITHM_.pops[k] = _GENETIC_ALHORITHM_.pops[k+1];
					_GENETIC_ALHORITHM_.pops[k+1] = temp;
				}
			}
		}
		console.log(i+'代,适应程度');
		console.log(JSON.stringify(fitness));
		//console.log('内容');
		//for (var j = 0; j < pa.popSize; j++){
		//	console.log(JSON.stringify(_GENETIC_ALHORITHM_.pops[j]));
		//}
		if (fitness[0] >= pa.stop){
			_GENETIC_ALHORITHM_.fitness = fitness[0];
			_GENETIC_ALHORITHM_.loop = i;
			console.log('在第'+i+'代时找到符合条件的个体:'+JSON.stringify(_GENETIC_ALHORITHM_.pops[0]));
			return _GENETIC_ALHORITHM_.pops[0];
		}
		/* 保存最优 */
		var l = 0;
		for (var j = saveNum; j < pa.popSize; j++){
			_GENETIC_ALHORITHM_.pops[j] = Array();
			for (var k = 0; k < halfg; k++){
				if (Math.random() < pa.variation){
					_GENETIC_ALHORITHM_.pops[j].push(pa.geneType[parseInt(Math.random()*pa.geneType.length)]);
				} else {
					_GENETIC_ALHORITHM_.pops[j].push(_GENETIC_ALHORITHM_.pops[l][k]);
				}
			}
			for (var k = halfg; k < pa.chrLength; k++){
				if (Math.random() < pa.variation){
					_GENETIC_ALHORITHM_.pops[j].push(pa.geneType[parseInt(Math.random()*pa.geneType.length)]);
				} else {
					_GENETIC_ALHORITHM_.pops[j].push(_GENETIC_ALHORITHM_.pops[l+1][k]);
				}
			}
			l++;
		}
	}
	_GENETIC_ALHORITHM_.fitness = fitness[0];
	_GENETIC_ALHORITHM_.loop = pa.loop;
	console.log('在第'+(i-1)+'代达到循环条件，最佳个体:'+JSON.stringify(_GENETIC_ALHORITHM_.pops[0]));
	return _GENETIC_ALHORITHM_.pops[0];
}