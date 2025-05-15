// 获取 DOM 元素
const dragArea = document.getElementById('dragArea');
const fileInput = document.getElementById('fileInput');
const output = document.getElementById('output');
const progress = document.getElementById('progress');
const errCode14 = document.getElementById('errCode14');
const checkboxId = document.getElementById('checkboxId');
const errCode14Element = document.getElementById('errCode14');
const loading = document.getElementById('loadingOverlay');
let anaFileName = "";



let log12 = [];
let log13 = [];
let log14 = [];
let log15 = [];
let log16 = [];
let log17 = [];
let log18 = [];
let log19 = [];
let log20 = [];

// 监听拖拽区域的事件
dragArea.addEventListener('dragover', (e) => {
	e.preventDefault(); // 防止浏览器默认的拖拽行为
	dragArea.classList.add('dragover'); // 改变样式，提示用户可以放下文件
});

dragArea.addEventListener('dragleave', () => {
	dragArea.classList.remove('dragover'); // 恢复样式
});

dragArea.addEventListener('drop', (e) => {
	e.preventDefault();
	dragArea.classList.remove('dragover'); // 恢复样式
	const files = e.dataTransfer.files; // 获取拖拽的文件

	if (files.length > 0) {
		dragArea.innerText = files[0].name;
		handleFile(files[0]); // 处理第一个文件
	}
});

// 让文件输入框也支持点击选择文件
dragArea.addEventListener('click', () => {
	fileInput.click(); // 模拟点击文件输入框
});

// 处理文件内容
document.getElementById('fileInput').addEventListener('change', function(event) {
	const file = event.target.files[0];

	if (file) {
		handleFile(file);
	}
});

function handleFile(file) {
	anaFileName = file.name;
	console.log(file)
	log12 = [];
	log13 = [];
	log14 = [];
	log15 = [];
	log16 = [];
	log17 = [];
	log18 = [];
	log19 = [];
	log20 = [];
	const reader = new FileReader();

	reader.onload = function(e) {
		const content = e.target.result;
		// 记录开始时间
		const startTime = Date.now();

		// 按行分割文件内容
		const lines = content.split('\n');

		// 显示总行数
		const totalLines = lines.length;
		if(totalLines>10*1000){
			document.getElementById('myTitle').textContent = "数据解析,行数：" + totalLines + "，太多，隐藏显示，建议导出查看";
			toggleDisplayFasle(document.getElementById('output'));
			toggleDisplayFasle(document.getElementById('logTable12'));
			toggleDisplayFasle(document.getElementById('logTable13'));
			toggleDisplayFasle(document.getElementById('logTable14'));
			toggleDisplayFasle(document.getElementById('logTable15'));
			toggleDisplayFasle(document.getElementById('logTable16'));
			toggleDisplayFasle(document.getElementById('logTable17'));
			toggleDisplayFasle(document.getElementById('logTable18'));
			toggleDisplayFasle(document.getElementById('logTable19'));
			toggleDisplayFasle(document.getElementById('logTable20'));
		}
		let processedLines = 0;

		// 输出显示区域
		const outputElement = document.getElementById('output');
		const progressElement = document.getElementById('progress');

		// 清空输出区域
		outputElement.textContent = '';
		progressElement.textContent = `正在处理... 0/${totalLines} 行`;


		// 分批次处理（每1000行一个批次）
        const batchSize = 1000;
        let currentBatch = 0;
		function processBatch() {
			const start = currentBatch * batchSize;
			const end = Math.min(start + batchSize, totalLines);
			
			for (let i = start; i < end; i++) {
				const line = lines[i];
				let transformedLine = replaceAllLog(line);
				lines[i] = transformedLine;

				// 各日志分析逻辑...
				
				if (line.indexOf("getErrorCodes14") > -1) {
					transformedLine = anaStr14(line);
					log14.push(transformedLine);
				}
				if (line.indexOf("getLogs12") > -1) {
					transformedLine = anaStr12(line);
					log12.push(transformedLine);
				}
				if (line.indexOf("getLogs13") > -1) {
					transformedLine = anaStr13(line);
					log13.push(transformedLine);
				}
				if (line.indexOf("getLogs15") > -1) {
					transformedLine = anaStr15(line);
					log15.push(transformedLine);
				}
				if (line.indexOf("getLogs16") > -1) {
					transformedLine = anaStr16(line);
					log16.push(transformedLine);
				}
				if (line.indexOf("getLogs17") > -1) {
					transformedLine = anaStr17(line);
					log17.push(transformedLine);
				}
				if (line.indexOf("getLogs18") > -1) {
					transformedLine = anaStr18(line);
					log18.push(transformedLine);
				}
				if (line.indexOf("getLogs19") > -1) {
					transformedLine = anaStr19(line);
					log19.push(transformedLine);
				}
				if (line.indexOf("getLogs20") > -1) {
					transformedLine = anaStr20(line);
					log20.push(transformedLine);
				}
				
				
				// 更新进度
				//progressElement.textContent = `正在处理... ${processedLines}/${totalLines} 行`;
			}

			processedLines = end;
			
			// 降低进度更新频率（每批次更新一次）
			if (currentBatch % 10 === 0 || end === totalLines) {
				progressElement.textContent = `正在处理... ${processedLines}/${totalLines} 行`;
			}

			if (end < totalLines) {
				currentBatch++;
				setTimeout(processBatch, 0); // 让出主线程
			} else {
				// 最终处理
				outputElement.textContent = lines.join('\n');
				
				// 修改后的 batchInsert 函数
				function batchInsert(data, domName) {
				    const tableBody = document.querySelector(domName);
				    tableBody.innerHTML = '';
				    const batchSize = 500; // 每批插入500行
				    let currentIndex = 0;
				
				    function insertBatch() {
				        const fragment = document.createDocumentFragment();
				        const end = Math.min(currentIndex + batchSize, data.length);
				        
				        for (; currentIndex < end; currentIndex++) {
				            const row = data[currentIndex];
				            const tr = document.createElement('tr');
				            row.forEach(cell => {
				                const td = document.createElement('td');
				                td.textContent = cell;
				                tr.appendChild(td);
				            });
				            fragment.appendChild(tr);
				        }
				        
				        tableBody.appendChild(fragment);
				        
				        if (currentIndex < data.length) {
				            setTimeout(insertBatch, 0); // 让出主线程
				        }
				    }
				    
				    insertBatch();
				}

				// 使用 setTimeout 分步处理三个表格的渲染
				setTimeout(() => {
					batchInsert(log12.map(splitTab), '#logTable12 tbody');
					setTimeout(() => {
						batchInsert(log13.map(splitTab), '#logTable13 tbody');
						setTimeout(() => {
							batchInsert(log14.map(splitTab), '#logTable14 tbody');
							setTimeout(() => {
								batchInsert(log15.map(splitTab), '#logTable15 tbody');
								setTimeout(() => {
									batchInsert(log16.map(splitTab), '#logTable16 tbody');
									setTimeout(() => {
										batchInsert(log17.map(splitTab), '#logTable17 tbody');
										setTimeout(() => {
											batchInsert(log18.map(splitTab), '#logTable18 tbody');
											setTimeout(() => {
												batchInsert(log19.map(splitTab), '#logTable19 tbody');
												setTimeout(() => {
													batchInsert(log20.map(splitTab), '#logTable20 tbody');
												
												}, 0);
											}, 0);
										}, 0);
									}, 0);
								}, 0);
							}, 0);
						}, 0);
					}, 0);
				}, 0);
				
				batchInsert(log12.map(splitTab), '#logTable12 tbody');
				batchInsert(log13.map(splitTab), '#logTable13 tbody');
				batchInsert(log14.map(splitTab), '#logTable14 tbody');

				const endTime = Date.now();
				const timeTaken = (endTime - startTime) / 1000;
				progressElement.textContent = `处理完成! 耗时: ${timeTaken.toFixed(2)} 秒`;
			}
		}

		processBatch();
	};
	

	reader.readAsText(file);
	
	
	
}

// 辅助函数：分割制表符
function splitTab(item) {
    return item.split('\t');
}

//替换文件内容
function replaceAllLog(text) {
	// 定义替换规则
	const replacements = [
		["sendDefaultParams    on    start    end", "启动后发送默认值结束"],
		["sendDefaultParams    on    start", "启动后发送默认值"],
		["SelfCheck after start send cmd", "启动后自检发送命令"],
		["sendDefaultParams    on    selfCheck", "自检时发送默认参数"],
		["PREFILL open after jmhAlarm send cmd", "静脉壶报警打开预冲，发送命令"],
		["EXHAUST open send cmd", "开启膜外排气发送指令"],
		["HEPARIN_ALARM_OFF send cmd", "发送肝素遗忘报警关闭命令"],
		["startDialysis open send cmd", "点击开始透析，发送命令"],
		["uf open send cmd", "打开超滤，发送命令"],
		["CLEAN_UF_INFORMATION", "清除超滤参数"],
		["BloodPump stop send cmd", "发送血泵关命令"],
		["BloodPump open send cmd", "发送血泵开命令"],
		["flow open cancel", "开启流量，取消"],
		["send flow open cmd", "发送流量开命令"],
		["flow close cancel", "关闭流量，取消"],
		["flow close send cmd", "关闭流量，发送命令"],
		["uf open cancel", "开启超滤，取消"],
		["uf open send cmd", "打开超滤，发送命令"],
		["uf stop cancel", "停止超滤，取消"],
		["uf close send cmd", "停止超滤，发送命令"],
		["heparin open cancel", "启动肝素，取消"],
		["heparin open send cmd", "启动肝素，发送命令"],
		["heparin close cancel", "关闭肝素，取消"],
		["heparin close send cmd", "关闭肝素，发送命令"],
		["aloneUF open cancel", "启动单超，取消"],
		["aloneUF open send cmd", "启动单超，发送命令"],
		["aloneUF close cancel", "关闭单超，取消"],
		["aloneUF close send cmd", "关闭单超，发送命令"],
		["packetLoss", "丢包数据"],
		["LOU_XUE_ALARM_OFF close send cmd", "关闭漏血报警"],
		["LOU_XUE_ALARM_OFF close cancel", "关闭漏血报警，否"],
		["autoSetRangeConductivity after low send cmd", "电导度低自动调整"],
		["autoSetRangeConductivity after up send cmd", "电导度高自动调整"],
		["isAutoSetRangeKua after low cancel", "跨膜压低自动调整，取消"],
		["isAutoSetRangeKua after high send cmd", "跨膜压高自动调整"],
		["isAutoSetRangeKua after high cancel", "跨膜压高自动调整，取消"],
		["isAutoSetRangeKua after low send cmd", "跨膜压低自动调整"],
		["isAutoSetRangeJing after low cancel", "静脉压低自动调整，取消"],
		["isAutoSetRangeJing after low send cmd", "静脉压低自动调整"],
		["isAutoSetRangeJing after high cancel", "静脉压高自动调整，取消"],
		["isAutoSetRangeJing after high send cmd", "静脉压高自动调整"],
		["isAutoSetRangeDong after low cancel", "动脉压低自动调整，取消"],
		["isAutoSetRangeDong after low send cmd", "动脉压低自动调整"],
		["isAutoSetRangeDong after high cancel", "动脉压高自动调整，取消"],
		["isAutoSetRangeDong after high send cmd", "动脉压高自动调整"],
		["shutDown cancel", "取消关机"],
		["shutDown", "关机"],
		["PREFILL_OFF after prefill over send cmd", "检测到静脉壶液位已到达，是否继续预冲直到预冲量到达，继续预冲"],
		["flow open cancel", "当前流量未打开！是否打开?，关闭"],
		["flow open send cmd", "当前流量未打开！是否打开?，打开"],
		["receiveMessage", "接收信息"],
		["changeParams", "改变参数"],
		["@param", "参数"],
		["dialysisParams", "透析参数"],
		["JCNa=", "基础钠="],
		["CFNa=", "处方钠="],
		["CFbic=", "处方Bic="],
		["flow=", "流量="],
		[" ,T=", "，温度="],
		["getCmd", "收到命令"],
		["gansuParams", "肝素参数"],
		["gansuRate", "肝素速率"],
		["chaoLVParams", "超滤参数"],
		["buttonClick", "按钮点击"],
		["startSelfCheck", "开始自检"],
		["sendDefaultParams    on    selfCheck", "发送默认值在自检后"],
		["naCurveId", "钠曲线"],
		["bjyz：", "报警阈值："],
		["alarmJm", "静脉报警时间"],
		["alarmUF", "超滤报警时间"],
		["timeWash", "冲洗时间"],
		["timeHotWash", "热冲洗时间"],
		["timeDisinfect", "消毒时间"],
		["timeFreeWash", "自由冲洗时间"],
		["timeHotDisinfect", "热消毒时间"],
		["timeForceWash", "强制冲洗时间"],
		["mConductoscope", "电导度"],
		["timeDialysis", "透析时间"],
		["precool", "预冲时间"],
		["dilutionRate", "稀释比例"],
		["theMode", "调试模式/正式模式"],
		["exhaustQuantity", "膜外排气量"],
		["exhaustTime", "膜外排气时间"],
		["defaultGSSupp", "肝素追加"],
		["defaultBloodReturnValue", "回血量"],
		["ycValue", "预冲量"],
		["settingDialysisValueDdd", "电导度"],
		["settingDialysisValueTime", "透析时间"],
		["defaultYCTime", "预时间"],
		["alarmDm", "动脉报警时间"],
		["start", "开机"],
		["statusChange", "状态改变"],
		["=700301", "漏血正常"],
		["=700302", "漏血报警"],
		["=700311", "气泡正常-血告警"],
		["=700312", "气泡报警-血告警"],
		["=700321", "静脉壶液位正常"],
		["=700322", "静脉壶液位过低"],
		["=700331", "电导度正常"],
		["=700332", "电导度过低"],
		["=700333", "电导度过高"],

		["=700341", "跨膜压正常"],
		["=700342", "跨膜压过低"],
		["=700343", "跨膜压过高"],
		["=700347", "透析液压力报警-正常"],
		["=700348", "透析液压力报警-过高"],

		["=700351", "静脉压正常"],
		["=700352", "静脉压过低"],
		["=700353", "静脉压过高"],

		["=700361", "动脉压正常"],
		["=700362", "动脉压过低"],
		["=700363", "动脉压过高"],

		["=700364", "血泵故障正常"],
		["=700365", "血泵故障"],
		["=700367", "血泵开盖"],
		["=700368", "血泵关盖"],
		["=700369", "血泵不可操作"],
		["=70036a", "温度过高"],


		["=700370", "温度过低"],
		["=700371", "温度正常"],
		["=700372", "温度过低"],
		["=700373", "温度过高"],
		["=700374", "水位正常"],

		["=700375", "水位缺水"],
		["=700376", "高流量报警"],
		["=700377", "流量正常"],
		["=700378", "流量异常01"],
		["=700379", "流量异常02"],
		["=70037b", "旁路盒提示旁路盒打开"],
		["=70037c", "请检查浓缩液正常"],
		["=70037d", "请检查浓缩液"],
		["=70037e", "AB液管正常"],
		["=70037f", "AB液管装反"],

		["=700381", "A液未连接浓缩液告警"],
		["=700382", "A液未连接浓缩液正常"],
		["=700383", "A液未连接清洗室告警"],
		["=700384", "A液未连接清洗室正常"],
		["=700385", "B液未连接浓缩液告警"],
		["=700386", "B液未连接浓缩液正常"],
		["=700387", "B液未连接清洗室告警"],
		["=700388", "B液未连接清洗室正常"],
		["=700389", "供给管路未放回旁路盒告警"],
		["=70038a", "供给管路未放回旁路盒正常"],
		["=70038b", "供给管路未连接透析器告警"],
		["=70038c", "供给管路未连接透析器正常"],
		["=70038d", "回流管路未放回旁路盒告警"],
		["=70038e", "回流管路未放回旁路盒正常"],

		["=700391", "请将A液管连接至浓缩液"],
		["=700392", "请将A液管放置清洗室"],
		["=700393", "回流管路未连接透析器"],
		["=700394", "回流管路未连接透析器正常"],

		["=7003a1", "请将B液管连接至浓缩液"],
		["=7003a2", "请将B液管放置清洗室"],
		["=7003a3", "请将供给管路（蓝色）放回旁路盒"],
		["=7003a4", "请将供给管路（蓝色）连接透析器"],
		["=7003a5", "请将回流管路（红色）放回旁路盒"],
		["=7003a6", "请将回流管路（红色）连接透析器"],
		["=7003a7", "旁路盒打开"],
		["=7003a8", "旁路盒打开报警正常"],
		["=7003a9", "B粉盖打开"],
		["=7003aa", "B粉盖打开关闭"],
		["=7003ab", "B粉盖打开"],
		["=7003ac", "B粉盖关闭"],
		["=7003ad", "请将B液管连接消毒液(确保消毒液充足)"],
		["=7003ae", "B粉未安装"],
		["=7003af", "B粉未拔出"],


		["=7003b1", "电池正常"],
		["=7003b2", "电量不足"],
		["=7003b3", "未安装电池"],
		["=7003b4", "血泵速率异常"],


		["=7003c1", "220电源正常"],
		["=7003c2", "220V电源未连接"],
		["=7003c3", "注射器未装到位-废弃"],
		["=7003c4", "肝素阻塞报警"],
		["=7003c5", "阻塞正常"],
		["=7003c6", "注射器推至底部 -废弃"],
		["=7003c7", "注射器推至底部正常-废弃"],
		["=7003c8", "遗忘报警"],
		["=7003c9", "遗忘正常"],
		["=7003ca", "堵转报警"],
		["=7003cb", "堵转正常"],
		["=7003cc", "肝素流速异常"],
		["=7003cd", "肝素流速正常"],
		["=7003ce", "肝素注射器未装到位"],
		["=7003cf", "注射器已安装到位"],

		["=7003d0", "未检测到消毒液正常"],
		["=7003d1", "未检测到消毒液"],
		["=7003d2", "未检测到消毒液(化学消毒)"],
		["=7003d3", "超滤泵速度异常"],
		["=7003d4", "超滤泵脱水异常"],
		["=7003d5", "消毒液浓度正常"],
		["=7003d6", "消毒液浓度过低"],
		["=7003d7", "消毒液浓度过高"],
		["=7003d8", "供给管路与回流管路位置不一致"],
		["=7003d9", "静脉夹正常"],
		["=7003da", "静脉夹故障"],
		["=7003db", "气泡正常"],
		["=7003dc", "气泡报警"],



		["=700501", "测试中"],
		["=700502", "测试失败"],
		["=700503", "测试通过"],
		["=700511", "预冲中"],
		["=700512", "预冲完成"],
		["=700513", "预冲量已达到"],
		["=700514", "预冲停止"],
		["=700515", "预冲时间到了"],
		["=700516", "膜外排气完成"],
		["=700517", "膜外排气中"],
		["=700518", "膜外排气停止"],
		["=700521", "准备结束"],
		["=700531", "透析中"],
		["=700532", "透析结束"],
		["=700533", "透析停止"],

		["=700541", "超滤中"],
		["=700542", "超滤结束"],
		["=700543", "超滤暂停"],
		["=700544", "超滤时间达到暂停"],

		["=700545", "流量开"],
		["=700546", "流量关"],
		["=700547", "流量关闭成功"],
		["=700548", "流量打开成功"],
		["=700549", "单超中"],
		["=70054a", "单超结束"],
		["=70054b", "单超暂停"],
		["=70054c", "超滤参数清除成功"],


		["=700551", "回血中"],
		["=700552", "光路检测回血完成"],
		["=700553", "回血停止"],
		["=700554", "回血量达到"],
		["=700558", "排空BIBAG中"],
		["=700559", "排空BIBAG完成"],
		["=70055a", "排空透析器中"],
		["=70055b", "排空透析器完成"],

		["=700561", "冲洗中"],
		["=700562", "冲洗结束"],
		["=700563", "冲洗停止"],

		["=700570", "温度过低提示"],
		["=700571", "化学消毒中"],
		["=700572", "化学消毒结束"],
		["=700573", "化学消毒停止"],
		["=700574", "抽消毒液中"],
		["=700575", "抽消毒液完成"],

		["=700581", "热冲洗中"],
		["=700582", "热冲洗结束"],
		["=700583", "热冲洗停止"],

		["=700591", "热消毒中"],
		["=700592", "热消毒结束"],
		["=700593", "热消毒停止"],
		["=700594", "组合消毒中"],
		["=700595", "组合消毒结束"],
		["=700596", "组合消毒停止"],

		["=7005a1", "血泵启动"],
		["=7005a2", "血泵停止"],
		["=7005ae", "肝素遗忘报警关闭"],
		["=7005af", "肝素遗忘报警打开"],


		["=7005b1", "肝素泵注射完成"],
		["=7005b2", "肝素追加完成"],
		["=7005b3", "肝素泵启动"],
		["=7005b4", "肝素泵关闭"],
		["=7005b5", "肝素追加开始"],
		["=7005b6", "肝素追加停止"],
		["=7005b7", "注射器推至顶部"],
		["=7005b8", "注射器推至底部"],
		["=7005b9", "静脉壶上调中"],
		["=7005ba", "静脉壶上调停止"],
		["=7005bb", "静脉壶下调中"],
		["=7005bc", "静脉壶下调停止"],


		["=7005c1", "过滤器排空完成"],
		["=7005c2", "过滤器充注完成"],
		["=7005c3", "过滤器排空中"],
		["=7005c6", "正在充电"],
		["=7005c7", "充电完成"],
		["=7005c8", "肝素左移发送成功"],
		["=7005c9", "肝素左移弹起发送成功"],
		["=7005ca", "肝素右移发送成功"],
		["=7005cb", "肝素右移弹起发送成功"],
		["=7005cc", "关机请求"],
		["=7005cd", "未安装B粉"],
		["=7005ce", "安装B粉"],
		["=7005cf", "BVM超滤控制开启成功"],
		["=7005d0", "BVM超滤控制关闭成功"],
		["=7005d1", "中途下机开启成功"],
		["=7005d2", "中途下机关闭成功"],

		["analysis=", "分析="],

		["cltarget=", "超滤目标="],
		["clrate=", "超滤速率="],
		["cltime=", "超滤时间="],


		["gsTime=", "肝素时间="],
		["gsSyringe=", "注射器="],
		["gsSuperaddition=", "肝素追加="],
		["gsRate=", "肝素速率="],
		["getBloodPumpParams", "收到血泵数据"],

		["dmy_up=", "动脉压上限="],
		["dmy_low=", "动脉压下限="],
		["jmy_up=", "静脉压上限="],
		["jmy_low=", "静脉压下限="],
		["kmy_up=", "跨膜压上限="],
		["kmy_low=", "跨膜压下限="],
		["ddd_up=", "电导度上限="],
		["ddd_low=", "电导度下限="],
		["bloodPumpRate：    Rate=", "血泵速率：    速率="],
		["danChaoParams：", "单超参数："],
		["getAlarm    ====>", "收到报警    ====>"],
		["bp open send cmd", "血泵开发送命令"],
		["damParams", "DAM参数"],
		["bloodReturn open send cmd", "回血开发送命令"],
	];


	// 执行替换
	for (let [oldText, newText] of replacements) {
		const regex = new RegExp(oldText, "g");
		text = text.replace(regex, newText);
	}

	return text;
	
}

// 正则表达式特殊字符转义
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 将16进制字符串转换为2进制字符串表示
function hexToBit(hexMessage, theBits) {
	// 将16进制字符串转为整数
	let num = parseInt(hexMessage, 16);
	// 将数字转为二进制字符串，并确保位数
	return num.toString(2).padStart(theBits, '0');
}

// 4位hex字符串转负数int值
function hexStringToInt(str) {
	// 将16进制字符串转为无符号整数
	let num = parseInt(str, 16);
	// 如果大于32767，则转为负数
	if (num > 32767) {
		num -= 65536;
	}
	return num;
}

// 4位hex字符串转负数int值
function hexStringToInt2(str) {
	// 将16进制字符串转为无符号整数
	let num = parseInt(str, 16);
	return num;
}

// 分析的具体某一位，返回值
function anaStr14Detail(bitS, deft, returnV) {
	let s = "";
	// 根据复选框是否勾选来判断是否反转字符串
	if (document.getElementById('checkboxId').checked) { // 假设复选框有ID为'checkboxId'
		if (reverseString(bitS)[deft] === "1") {
			return returnV;
		}
	} else {
		if (bitS[deft] === "1") {
			return returnV;
		}
	}
	return s;
}

// 反转字符串
function reverseString(str) {
	return str.split('').reverse().join('');
}

// 解析并显示数据
function anaStr14(s) {
	let result = "";
	result += s;

	// 提取getCmd后的部分
	let anaS = s.substring(s.indexOf("getCmd=") + 7).toUpperCase();
	result += "解析14: " + anaS + " 解析内容" + " \t ";
	if (anaS.length < 50) {
		return (result + "长度不对");
	}

	// 从解析出的字符串中提取具体字段
	let bloodPath = anaS.substring(4, 6);
	let temperatureControl = anaS.substring(6, 8);
	let heparin = anaS.substring(8, 10);
	let leakSensor = anaS.substring(10, 12);
	let conductivitySensor = anaS.substring(12, 14);
	let pressureSensor = anaS.substring(14, 16);
	let temperatureSensor = anaS.substring(16, 18);
	let pumpA = anaS.substring(18, 20);
	let pumpB = anaS.substring(20, 22);
	let ultrafiltrationMotor = anaS.substring(22, 24);
	let waterPath1 = anaS.substring(24, 26);
	let waterPath2 = anaS.substring(26, 28);
	let waterPath3 = anaS.substring(28, 30);
	let waterPath4 = anaS.substring(30, 32);
	let bloodPathAD = anaS.substring(32, 36);
	
	
	let qq = anaS.substring(36, 38);
	let ww = anaS.substring(38, 42);
	let ee = anaS.substring(42, 46);
	let ff = anaS.substring(46, 50);

	// 输出详细信息
	result +=
		"血路(" + bloodPath + "):" + hexToBit(bloodPath, 8) + " :" +
		anaStr14Detail(hexToBit(bloodPath, 8), 7, "三通阀,") +
		anaStr14Detail(hexToBit(bloodPath, 8), 6, "气泵,") +
		anaStr14Detail(hexToBit(bloodPath, 8), 5, "系统重启,") + " \t ";

	result +=
		"温控(" + temperatureControl + "):" + hexToBit(temperatureControl, 8) + " : " +
		anaStr14Detail(hexToBit(temperatureControl, 8), 7, "过零检测,") +
		anaStr14Detail(hexToBit(temperatureControl, 8), 6, "s002温度传感器,") +
		anaStr14Detail(hexToBit(temperatureControl, 8), 5, "s002c温度传感器,") +
		anaStr14Detail(hexToBit(temperatureControl, 8), 4, "s109温度传感器,") +
		anaStr14Detail(hexToBit(temperatureControl, 8), 3, "进水阀,") + " \t ";

	result +=
		"肝素: (" + heparin + "):" + hexToBit(heparin, 8) + " : " +
		anaStr14Detail(hexToBit(heparin, 8), 7, "A相短路检测,") +
		anaStr14Detail(hexToBit(heparin, 8), 6, "B相短路检测,") +
		anaStr14Detail(hexToBit(heparin, 8), 5, "过温预警检测,") +
		anaStr14Detail(hexToBit(heparin, 8), 4, "过温检测,") + " \t ";

	result += "漏血感器(" + leakSensor + ") : " + (
		leakSensor === "00" ? "正常" :
		leakSensor === "01" ? "红光异常" :
		leakSensor === "02" ? "绿光异常" :
		leakSensor === "03" ? "蓝光异常" :
		"其它状态"
	) + " \t ";

	result +=
		"电导传感器: (" + conductivitySensor + ") " +
		(
			conductivitySensor === "00" ? "正常" :
			conductivitySensor === "01" ? "S007异常" :
			conductivitySensor === "02" ? "S007C异常" :
			conductivitySensor === "04" ? "S132异常" :
			"未知状态"
		) + "\t";


	result +=
		"压力传感器: (" + pressureSensor + ") " +
		(
			pressureSensor === "00" ? "正常" :
			pressureSensor === "01" ? "S009异常" :
			pressureSensor === "02" ? "S182异常" :
			"未知状态"
		) + "\t";

	result +=
		"温度传感器: (" + temperatureSensor + ") " +
		(
			temperatureSensor === "00" ? "正常" :
			temperatureSensor === "01" ? "S003异常" :
			temperatureSensor === "02" ? "S133异常" :
			"未知状态"
		) + "\t";

	result +=
		"A液泵: (" + pumpA + ") " +
		(
			pumpA === "A0" ? "正常" :
			pumpA === "A1" ? "A 相开路检测" :
			pumpA === "A2" ? "B相开路检测" :
			pumpA === "A3" ? "A 相短路检测" :
			pumpA === "A4" ? "B 相短路检测" :
			pumpA === "A5" ? "过温预警检测" :
			pumpA === "A6" ? "过温检测" :
			pumpA === "A7" ? "堵转检测" :
			pumpA === "A8" ? "初始化位置不对" :
			pumpA === "A9" ? "过程中未周期达到最高点" :
			"未知状态"
		) + "\t";

	// B液泵电机状态判断
	result +=
		"B液泵电机: (" + pumpB + ") " +
		(
			pumpB === "B0" ? "正常" :
			pumpB === "B1" ? "A 相开路检测" :
			pumpB === "B2" ? "B相开路检测" :
			pumpB === "B3" ? "A相短路检测" :
			pumpB === "B4" ? "B相短路检测" :
			pumpB === "B5" ? "过温预警检测" :
			pumpB === "B6" ? "过温检测" :
			pumpB === "B7" ? "堵转检测" :
			pumpB === "B8" ? "初始化位置不对" :
			pumpB === "B9" ? "过程中未周期达到最高点" :
			"未知状态"
		) + "\t";

	// 超滤电机状态判断
	result +=
		"超滤电机: (" + ultrafiltrationMotor + ") " +
		(
			ultrafiltrationMotor === "C0" ? "正常" :
			ultrafiltrationMotor === "C1" ? "A 相开路检测" :
			ultrafiltrationMotor === "C2" ? "B 相开路检测" :
			ultrafiltrationMotor === "C3" ? "A 相短路检测" :
			ultrafiltrationMotor === "C4" ? "B 相短路检测" :
			ultrafiltrationMotor === "C5" ? "过温预警检测" :
			ultrafiltrationMotor === "C6" ? "过温检测" :
			ultrafiltrationMotor === "C7" ? "堵转检测" :
			ultrafiltrationMotor === "C8" ? "初始化位置不对" :
			ultrafiltrationMotor === "C9" ? "过程中未周期达到最高点" :
			"未知状态"
		) + "\t";


	result +=
		"水路1: (" + waterPath1 + "):" + hexToBit(waterPath1, 8) + " : " +
		anaStr14Detail(hexToBit(waterPath1, 8), 7, "24,") +
		anaStr14Detail(hexToBit(waterPath1, 8), 6, "25,") +
		anaStr14Detail(hexToBit(waterPath1, 8), 5, "26,") +
		anaStr14Detail(hexToBit(waterPath1, 8), 4, "30,") +
		anaStr14Detail(hexToBit(waterPath1, 8), 3, "31,") +
		anaStr14Detail(hexToBit(waterPath1, 8), 2, "32,") +
		anaStr14Detail(hexToBit(waterPath1, 8), 1, "33,") +
		anaStr14Detail(hexToBit(waterPath1, 8), 0, "34,") +
		" \t ";

	result +=
		"水路2: (" + waterPath2 + "):" + hexToBit(waterPath2, 8) + " : " +
		anaStr14Detail(hexToBit(waterPath2, 8), 7, "35,") +
		anaStr14Detail(hexToBit(waterPath2, 8), 6, "36,") +
		anaStr14Detail(hexToBit(waterPath2, 8), 5, "37,") +
		anaStr14Detail(hexToBit(waterPath2, 8), 4, "38,") +
		anaStr14Detail(hexToBit(waterPath2, 8), 3, "39,") +
		anaStr14Detail(hexToBit(waterPath2, 8), 2, "43,") +
		anaStr14Detail(hexToBit(waterPath2, 8), 1, "84,") +
		anaStr14Detail(hexToBit(waterPath2, 8), 0, "86,") +
		" \t ";

	result +=
		"水路3: (" + waterPath3 + "):" + hexToBit(waterPath3, 8) + " : " +
		anaStr14Detail(hexToBit(waterPath3, 8), 7, "87,") +
		anaStr14Detail(hexToBit(waterPath3, 8), 6, "91,") +
		anaStr14Detail(hexToBit(waterPath3, 8), 5, "99,") +
		anaStr14Detail(hexToBit(waterPath3, 8), 4, "100,") +
		anaStr14Detail(hexToBit(waterPath3, 8), 3, "112,") +
		anaStr14Detail(hexToBit(waterPath3, 8), 2, "130,") +
		anaStr14Detail(hexToBit(waterPath3, 8), 1, "183,") +
		anaStr14Detail(hexToBit(waterPath3, 8), 0, "188,") +
		" \t ";

	result +=
		"水路4: (" + waterPath4 + "):" + hexToBit(waterPath4, 8) + " : " +
		anaStr14Detail(hexToBit(waterPath4, 8), 7, "189,") +
		anaStr14Detail(hexToBit(waterPath4, 8), 6, "21,") +
		anaStr14Detail(hexToBit(waterPath4, 8), 5, "29,") +
		anaStr14Detail(hexToBit(waterPath4, 8), 4, "97,") +
		anaStr14Detail(hexToBit(waterPath4, 8), 3, "185,") +
		anaStr14Detail(hexToBit(waterPath4, 8), 2, "134,") +
		" \t ";

	result +=
		"血路AD值: (" + bloodPathAD + "):" + hexStringToInt(bloodPathAD) + "\t";
		
	
	result +=
		"探针液位状态、平衡腔状态: (" + qq + "):" + hexStringToInt(qq) + "\t";
		
	result +=
		"S009压力传感器的值: (" + ww + "):" + hexStringToInt(ww) + "\t";
		
	result +=
		"静脉压的值: (" + ee + "):" + hexStringToInt(ee) + "\t";
		
	result +=
		"平衡腔切换时间: (" + ff + "):" + hexStringToInt(ff) + "\t";
		

	return result;
}


function anaStr12(s) {
	let result = s;
	// 提取getCmd后的部分
	let anaS = s.substring(s.indexOf("getCmd=") + 7);
	if (anaS.length < 24) {
		return ("解析失败，长度不够：" + s);
	}
	result += "\t解析12: " + anaS + " 解析内容:\t";
	let a = anaS.substring(4, 8);
	let b = anaS.substring(8, 12);
	let c = anaS.substring(12, 16);
	let d = anaS.substring(16, 20);
	let e = anaS.substring(20, 22);
	let f = anaS.substring(22, 24);
	result += "查询给血泵板下发的流速 (" + a + "): " + hexStringToInt(a) + "\t" +
		"查询给血泵下发的流速 (" + b + "): " + hexStringToInt(b) + "\t" +
		"给血泵下发的流速 (" + c + "): " + hexStringToInt(c) + "\t" +
		"血泵上传的真实血泵速率 (" + d + "): " + hexStringToInt(d) + "\t" +
		"透析液流量状态标志位 (" + e + "): " + hexStringToInt2(e) + "\t" +
		"主控状态机状态 (" + f + "): " + hexStringToInt2(f) + "\t";


	return result;
}

function anaStr13(s) {
	let result = s;
	// 提取getCmd后的部分
	let anaS = s.substring(s.indexOf("getCmd=") + 7);
	if (anaS.length < 24) {
		return ("解析失败，长度不够：" + s);
	}

	result += "\t解析13: " + anaS + " 解析内容: \t";
	let a = anaS.substring(4, 6);
	let b = anaS.substring(6, 8);
	let c = anaS.substring(8, 10);
	let d = anaS.substring(10, 12);
	let e = anaS.substring(12, 16);
	let f = anaS.substring(16, 18);
	let g = anaS.substring(18, 20);
	let h = anaS.substring(20, 22);
	let i = anaS.substring(22, 24);
	result += "软复位、上电复位、看门狗复位、引脚复位、外部晶振复位、内部晶振复位、低电压复位、识别是否和主控通信断开 (" + a + "): " + hexStringToInt2(a) + "\t" +
		"当前状态 (" + b + "): " + hexStringToInt2(b) + "\t" +
		"当前血泵系数 (" + c + "): " + hexStringToInt2(c) + "\t" +
		"转速不匹配调整次数 (" + d + "): " + hexStringToInt2(d) + "\t" +
		"光学传感器AD值 (" + e + "): " + hexStringToInt(e) + "\t" +
		"静脉压K系数 (" + f + "): " + hexStringToInt2(f) + "\t" +
		"静脉压B系数 (" + g + "): " + hexStringToInt2(g) + "\t" +
		"动脉压K系数 (" + h + "): " + hexStringToInt2(h) + "\t" +
		"动脉压B系数 (" + i + "): " + hexStringToInt2(i) + "\t";


	return result;
}

function anaStr15(s) {
	let result = s;
	// 提取getCmd后的部分
	let anaS = s.substring(s.indexOf("getCmd=") + 7);
	if (anaS.length < 44) {
		return ("解析失败，长度不够：" + s);
	}
	result += "\t解析15: " + anaS + " 解析内容:\t";
	let a = anaS.substring(4, 8);//漏血传感器R值
	let b = anaS.substring(8, 12);//漏血传感器G值
	let c = anaS.substring(12, 16);//漏血传感器B值
	let d = anaS.substring(16, 20);//S003温度值
	let e = anaS.substring(20, 24);//S132电导率传感器电压值
	let f = anaS.substring(24, 26);//S007C电导度值
	let g = anaS.substring(26, 30);//S009压力传感器值
	let h = anaS.substring(30, 34);//S182压力传感器值
	let i = anaS.substring(34, 36);//软复位、上电复位、看门狗复位、引脚复位、外部晶振复位、内部晶振复位、低电压复位、识别是否和上位机通信断开
	let j = anaS.substring(36, 38);//传感器当前状态
	let k = anaS.substring(38, 40);
	let l = anaS.substring(40, 42);
	let m = anaS.substring(42, 44);
	result += "漏血传感器R值 （传感器模块）(" + a + "): " + hexStringToInt(a) + "\t" +
		"漏血传感器G值 （传感器模块）(" + b + "): " + hexStringToInt(b) + "\t" +
		"漏血传感器B值 （传感器模块）(" + c + "): " + hexStringToInt(c) + "\t" +
		"S003温度值 （传感器模块）(" + d + "): " + hexStringToInt(d) + "\t" +
		"S132电导率传感器电压值（传感器模块） (" + e + "): " + hexStringToInt2(e) + "\t" +
		"S007C电导度值 （传感器模块）(" + f + "): " + hexStringToInt2(f) + "\t"+
		"S009压力传感器值（传感器模块）(" + g + "): " + hexStringToInt2(g) + "\t"+
		"S182压力传感器值 （传感器模块）(" + h + "): " + hexStringToInt2(h) + "\t"+
		"软复位、上电复位、看门狗复位、引脚复位、外部晶振复位、内部晶振复位、低电压复位、识别是否和上位机通信断开 （传感器模块）(" + i + "): " + hexStringToInt2(i) + "\t"+
		"传感器当前状态（传感器模块） (" + j + "): " + hexStringToInt2(j) + "\t"+
		"透析液供给管状态、透析液回流管状态、旁路盒状态、B液管状态、A液管状态、B粉状态、BIBAG二级触点、BIBAG一级触点 （主控模块）(" + k + "): " + hexStringToInt2(k) + "\t"+
		"软复位、上电复位、看门狗复位、引脚复位、外部晶振复位、内部晶振复位、低电压复位、识别是否和上位机通信断开（主控模块） (" + l + "): " + hexStringToInt2(l) + "\t"+
		"主控当前状态 （主控模块）(" + m + "): " + hexStringToInt2(m) + "\t"
		;


	return result;
}

function anaStr16(s) {
	let result = s;
	// 提取getCmd后的部分
	let anaS = s.substring(s.indexOf("getCmd=") + 7);
	if (anaS.length < 32) {
		return ("解析失败，长度不够：" + s);
	}
	result += "\t解析16: " + anaS + " 解析内容:\t";
	let a = anaS.substring(4, 6);//软复位、上电复位、看门狗复位、引脚复位、外部晶振复位、内部晶振复位、低电压复位、识别是否和主控通信断开
	let b = anaS.substring(6, 8);//当前状态
	let c = anaS.substring(8, 12);//A泵当前步数泵次数
	let d = anaS.substring(12, 20);//A泵当前步数
	let e = anaS.substring(20, 24);//B泵当前步数泵次数
	let f = anaS.substring(24, 32);//B泵当前步数
	result += "软复位、上电复位、看门狗复位、引脚复位、外部晶振复位、内部晶振复位、低电压复位、识别是否和主控通信断开 (" + a + "): " + hexStringToInt(a) + "\t" +
		"当前状态 (" + b + "): " + hexStringToInt(b) + "\t" +
		"A泵当前步数泵次数 (" + c + "): " + hexStringToInt(c) + "\t" +
		"A泵当前步数 (" + d + "): " + hexStringToInt(d) + "\t" +
		"B泵当前步数泵次数 (" + e + "): " + hexStringToInt2(e) + "\t" +
		"B泵当前步数 (" + f + "): " + hexStringToInt2(f) + "\t"
		;


	return result;
}

function anaStr17(s) {
	let result = s;
	// 提取getCmd后的部分
	let anaS = s.substring(s.indexOf("getCmd=") + 7);
	if (anaS.length < 22) {
		return ("解析失败，长度不够：" + s);
	}
	result += "\t解析17: " + anaS + " 解析内容:\t";
	let a = anaS.substring(4, 6);//软复位、上电复位、看门狗复位、引脚复位、外部晶振复位、内部晶振复位、低电压复位、识别是否和主控通信断开
	let b = anaS.substring(6, 8);//当前状态
	let c = anaS.substring(8, 10);//加热棒状态
	let d = anaS.substring(10, 14);//上位机设定温度
	let e = anaS.substring(14, 16);//软复位、上电复位、看门狗复位、引脚复位、外部晶振复位、内部晶振复位、低电压复位、识别是否和主控通信断开
	let f = anaS.substring(16, 18);//当前状态
	let g = anaS.substring(18, 20);//泵的状态、上限光电开关状态、下限光电开关状态
	let h = anaS.substring(20, 22);//压力传感器的压力值
	result += "软复位、上电复位、看门狗复位、引脚复位、外部晶振复位、内部晶振复位、低电压复位、识别是否和主控通信断开（温控模块） (" + a + "): " + hexStringToInt(a) + "\t" +
		"当前状态 （温控模块）(" + b + "): " + hexStringToInt(b) + "\t" +
		"加热棒状态 （温控模块）(" + c + "): " + hexStringToInt(c) + "\t" +
		"上位机设定温度（温控模块） (" + d + "): " + hexStringToInt(d) + "\t" +
		"软复位、上电复位、看门狗复位、引脚复位、外部晶振复位、内部晶振复位、低电压复位、识别是否和主控通信断开 （肝素模块）(" + e + "): " + hexStringToInt2(e) + "\t" +
		"当前状态 （肝素模块）(" + f + "): " + hexStringToInt2(f) + "\t"+
		"泵的状态、上限光电开关状态、下限光电开关状态 （肝素模块）(" + g + "): " + hexStringToInt2(g) + "\t"+
		"压力传感器的压力值 （肝素模块）(" + h + "): " + hexStringToInt2(h) + "\t"
		;


	return result;
}

function anaStr18(s) {
	let result = s;
	// 提取getCmd后的部分
	let anaS = s.substring(s.indexOf("getCmd=") + 7);
	if (anaS.length < 34) {
		return ("解析失败，长度不够：" + s);
	}
	result += "\t解析18: " + anaS + " 解析内容:\t";
	let a = anaS.substring(4, 8);//S134压力传感器值
	let b = anaS.substring(8, 10);//泵阀状态P185,P97,P29,P21, V24, V24B,V26,V30
	let c = anaS.substring(10, 12);//泵阀状态V31,V32,V33,V34,V35, V36,V37,V38
	let cc = anaS.substring(12, 14);//泵阀状态V39,V43,V84,V86,V87,V91,V99,V100
	let d = anaS.substring(14, 16);//泵阀状态V112,V130,V183,V188,V189,0,0,0
	let e = anaS.substring(16, 18);//软复位、上电复位、看门狗复位、引脚复位、外部 晶振复位、内部晶振复位、低电压复位、识别是否 和主控通信断开
	let f = anaS.substring(18, 20);//S202、S204、S006 探针液位状态、排空 bibag 完成不控制 AB 泵、188、130 阀抽 A、B 液两次后液位没升高不控制 AB 泵 、220v 断开不控制 AB 泵、使用 B 粉旁路测试完成不控制 B 泵、A、B 液放反不控制 AB 泵
	let g = anaS.substring(20, 22);//机器当前工作状态
	let h = anaS.substring(22, 26);//平衡腔切换时间
	let i = anaS.substring(26, 30);//A 液泵停止抽取 V188 打开次数
	let j = anaS.substring(30, 34);//B 液泵停止抽取 V130 打开次数
	result += "S134压力传感器值 (" + a + "): " + hexStringToInt(a) + "\t" +
		"泵阀状态P185,P97,P29,P21, V24, V24B,V26,V30 (" + b + "): " + hexStringToInt(b) + "\t" +
		"泵阀状态V31,V32,V33,V34,V35, V36,V37,V38 (" + c + "): " + hexStringToInt(c) + "\t" +
		"泵阀状态V39,V43,V84,V86,V87,V91,V99,V100 (" + cc + "): " + hexStringToInt(cc) + "\t" +
		"泵阀状态V112,V130,V183,V188,V189,0,0,0 (" + d + "): " + hexStringToInt(d) + "\t" +
		"软复位、上电复位、看门狗复位、引脚复位、外部 晶振复位、内部晶振复位、低电压复位、识别是否 和主控通信断开 (" + e + "): " + hexStringToInt2(e) + "\t" +
		"S202、S204、S006 探针液位状态、排空 bibag 完成不控制 AB 泵、188、130 阀抽 A、B 液两次后液位没升高不控制 AB 泵 、220v 断开不控制 AB 泵、使用 B 粉旁路测试完成不控制 B 泵、A、B 液放反不控制 AB 泵 (" + f + "): " + hexStringToInt2(f) + "\t"+
		"机器当前工作状态 (" + g + "): " + hexStringToInt2(g) + "\t"+
		"平衡腔切换时间 (" + h + "): " + hexStringToInt2(h) + "\t"+
		"A 液泵停止抽取 V188 打开次数 (" + i + "): " + hexStringToInt2(i) + "\t"+
		"B 液泵停止抽取 V130 打开次数 (" + j + "): " + hexStringToInt2(j) + "\t"
		;


	return result;
}

function anaStr19(s) {
	let result = s;
	// 提取getCmd后的部分
	let anaS = s.substring(s.indexOf("getCmd=") + 7);
	if (anaS.length < 60) {
		return ("解析失败，长度不够：" + s);
	}
	result += "\t解析19: " + anaS + " 解析内容:\t";
	let a = anaS.substring(4, 6);//软复位（水路）
	let b = anaS.substring(6, 8);//上电复位（水路）
	let c = anaS.substring(8, 10);//看门狗复位（水路）
	let d = anaS.substring(10, 12);//引脚复位（水路）
	let e = anaS.substring(12, 14);//外部晶振复位（水路）
	let f = anaS.substring(14, 16);//内部晶振复位（水路）
	let g = anaS.substring(16, 18);//低电压复位（水路）
	let h = anaS.substring(18, 20);//识别是否和主控通信断开（水路）
	let i = anaS.substring(20, 22);//软复位（温控）
	let j = anaS.substring(22, 24);//上电复位（温控）
	let k = anaS.substring(24, 26);//看门狗复位（温控）
	let l = anaS.substring(26, 28);//引脚复位（温控）
	let m = anaS.substring(28, 30);//外部晶振复位（温控）
	let n = anaS.substring(30, 32);//内部晶振复位（温控）
	let o = anaS.substring(32, 34);//低电压复位（温控）
	let p = anaS.substring(34, 36);//识别是否和主控通信断开（温控）
	let q = anaS.substring(36, 38);//软复位（血路）
	let r = anaS.substring(38, 40);//上电复位（血路）
	let ss = anaS.substring(40, 42);//看门狗复位（血路）
	let t = anaS.substring(42, 44);//引脚复位（血路）
	let u = anaS.substring(44, 46);//外部晶振复位（血路）
	let v = anaS.substring(46, 48);//内部晶振复位（血路）
	let w = anaS.substring(48, 50);//低电压复位（血路）
	let xx = anaS.substring(50, 52);//识别是否和主控通信断开（血路）
	let yy = anaS.substring(52, 54);//软复位（主控）
	let zz = anaS.substring(54, 56);//上电复位（主控）
	let aa = anaS.substring(56, 58);//看门狗复位（主控）
	let ab = anaS.substring(58, 60);//引脚复位（主控）
	
	result += "软复位（水路） (" + a + "): " + hexStringToInt(a) + "\t" +
		"上电复位（水路） (" + b + "): " + hexStringToInt(b) + "\t" +
		"看门狗复位（水路） (" + c + "): " + hexStringToInt(c) + "\t" +
		"引脚复位（水路） (" + d + "): " + hexStringToInt(d) + "\t" +
		"外部晶振复位（水路） (" + e + "): " + hexStringToInt2(e) + "\t" +
		"内部晶振复位（水路） (" + f + "): " + hexStringToInt2(f) + "\t"+
		"低电压复位（水路） (" + g + "): " + hexStringToInt2(g) + "\t"+
		"识别是否和主控通信断开（水路） (" + h + "): " + hexStringToInt2(h) + "\t"+
		"软复位（温控） (" + i + "): " + hexStringToInt2(i) + "\t"+
		"上电复位（温控） (" + j + "): " + hexStringToInt2(j) + "\t"+
		"看门狗复位（温控） (" + k + "): " + hexStringToInt2(k) + "\t"+
		"引脚复位（温控） (" + l + "): " + hexStringToInt2(l) + "\t"+
		"外部晶振复位（温控） (" + m + "): " + hexStringToInt2(m) + "\t"+
		"内部晶振复位（温控） (" + n + "): " + hexStringToInt2(n) + "\t"+
		"低电压复位（温控） (" + o + "): " + hexStringToInt2(o) + "\t"+
		"识别是否和主控通信断开（温控） (" + p + "): " + hexStringToInt2(p) + "\t"+
		"软复位（血路） (" + q + "): " + hexStringToInt2(q) + "\t"+
		"上电复位（血路） (" + r + "): " + hexStringToInt2(r) + "\t"+
		"看门狗复位（血路） (" + ss + "): " + hexStringToInt2(ss) + "\t"+
		"引脚复位（血路） (" + t + "): " + hexStringToInt2(t) + "\t"+
		"外部晶振复位（血路） (" + u + "): " + hexStringToInt2(u) + "\t"+
		"内部晶振复位（血路） (" + v + "): " + hexStringToInt2(v) + "\t"+
		"低电压复位（血路） (" + w + "): " + hexStringToInt2(w) + "\t"+
		"识别是否和主控通信断开（血路） (" + xx + "): " + hexStringToInt2(xx) + "\t"+
		"软复位（主控） (" + yy + "): " + hexStringToInt2(yy) + "\t"+
		"上电复位（主控） (" + zz + "): " + hexStringToInt2(zz) + "\t"+
		"看门狗复位（主控） (" + aa + "): " + hexStringToInt2(aa) + "\t"+
		"引脚复位（主控） (" + ab + "): " + hexStringToInt2(ab) + "\t"
		
		;


	return result;
}

function anaStr20(s) {
	let result = s;
	// 提取getCmd后的部分
	let anaS = s.substring(s.indexOf("getCmd=") + 7);
	if (anaS.length < 60) {
		return ("解析失败，长度不够：" + s);
	}
	result += "\t解析20: " + anaS + " 解析内容:\t";
	let a = anaS.substring(4, 6);//软复位（肝素）
	let b = anaS.substring(6, 8);//上电复位（肝素）
	let c = anaS.substring(8, 10);//看门狗复位（肝素）
	let d = anaS.substring(10, 12);//引脚复位（肝素）
	let e = anaS.substring(12, 14);//外部晶振复位（肝素）
	let f = anaS.substring(14, 16);//内部晶振复位（肝素）
	let g = anaS.substring(16, 18);//低电压复位（肝素）
	let h = anaS.substring(18, 20);//识别是否和主控通信断开（肝素）
	let i = anaS.substring(20, 22);//软复位（传感器）
	let j = anaS.substring(22, 24);//上电复位（传感器）
	let k = anaS.substring(24, 26);//看门狗复位（传感器）
	let l = anaS.substring(26, 28);//引脚复位（传感器）
	let m = anaS.substring(28, 30);//外部晶振复位（传感器）
	let n = anaS.substring(30, 32);//内部晶振复位（传感器）
	let o = anaS.substring(32, 34);//低电压复位（传感器）
	let p = anaS.substring(34, 36);//识别是否和主控通信断开（传感器）
	let q = anaS.substring(36, 38);//软复位（超滤）
	let r = anaS.substring(38, 40);//上电复位（超滤）
	let ss = anaS.substring(40, 42);//看门狗复位（超滤）
	let t = anaS.substring(42, 44);//引脚复位（超滤）
	let u = anaS.substring(44, 46);//外部晶振复位（超滤）
	let v = anaS.substring(46, 48);//内部晶振复位（超滤）
	let w = anaS.substring(48, 50);//低电压复位（超滤）
	let xx = anaS.substring(50, 52);//识别是否和主控通信断开（超滤）
	let yy = anaS.substring(52, 54);//外部晶振复位（主控）
	let zz = anaS.substring(54, 56);//内部晶振复位（主控）
	let aa = anaS.substring(56, 58);//低电压复位（主控）
	let ab = anaS.substring(58, 60);//识别是否和上位机通信断开（主控）
	
	result += "软复位（肝素） (" + a + "): " + hexStringToInt(a) + "\t" +
		"上电复位（肝素） (" + b + "): " + hexStringToInt(b) + "\t" +
		"看门狗复位（肝素） (" + c + "): " + hexStringToInt(c) + "\t" +
		"引脚复位（肝素） (" + d + "): " + hexStringToInt(d) + "\t" +
		"外部晶振复位（肝素） (" + e + "): " + hexStringToInt2(e) + "\t" +
		"内部晶振复位（肝素） (" + f + "): " + hexStringToInt2(f) + "\t"+
		"低电压复位（肝素） (" + g + "): " + hexStringToInt2(g) + "\t"+
		"识别是否和主控通信断开（肝素） (" + h + "): " + hexStringToInt2(h) + "\t"+
		"软复位（传感器） (" + i + "): " + hexStringToInt2(i) + "\t"+
		"上电复位（传感器） (" + j + "): " + hexStringToInt2(j) + "\t"+
		"看门狗复位（传感器） (" + k + "): " + hexStringToInt2(k) + "\t"+
		"引脚复位（传感器） (" + l + "): " + hexStringToInt2(l) + "\t"+
		"外部晶振复位（传感器） (" + m + "): " + hexStringToInt2(m) + "\t"+
		"内部晶振复位（传感器） (" + n + "): " + hexStringToInt2(n) + "\t"+
		"低电压复位（传感器） (" + o + "): " + hexStringToInt2(o) + "\t"+
		"识别是否和主控通信断开（传感器） (" + p + "): " + hexStringToInt2(p) + "\t"+
		"软复位（超滤） (" + q + "): " + hexStringToInt2(q) + "\t"+
		"上电复位（超滤） (" + r + "): " + hexStringToInt2(r) + "\t"+
		"看门狗复位（超滤） (" + ss + "): " + hexStringToInt2(ss) + "\t"+
		"引脚复位（超滤） (" + t + "): " + hexStringToInt2(t) + "\t"+
		"外部晶振复位（超滤） (" + u + "): " + hexStringToInt2(u) + "\t"+
		"内部晶振复位（超滤） (" + v + "): " + hexStringToInt2(v) + "\t"+
		"低电压复位（超滤） (" + w + "): " + hexStringToInt2(w) + "\t"+
		"识别是否和主控通信断开（超滤） (" + xx + "): " + hexStringToInt2(xx) + "\t"+
		"外部晶振复位（主控） (" + yy + "): " + hexStringToInt2(yy) + "\t"+
		"内部晶振复位（主控） (" + zz + "): " + hexStringToInt2(zz) + "\t"+
		"低电压复位（主控） (" + aa + "): " + hexStringToInt2(aa) + "\t"+
		"识别是否和上位机通信断开（主控） (" + ab + "): " + hexStringToInt2(ab) + "\t"
		
		;


	return result;
}


// 一键导出所有表格到同一个Excel文件（多Sheet模式）
function exportCombinedTables() {   
	try {
		// 显示加载动画
		loading.style.display = 'flex';
		// 给浏览器渲染机会
		setTimeout(() => {
			loading.style.display = 'flex';
			// 创建新的工作簿
			const wb = XLSX.utils.book_new();
			
			// 定义需要导出的表格列表
			const tableIds = [
			    {id: 'logTable12', name: 'Log12'},
			    {id: 'logTable13', name: 'Log13'},
			    {id: 'logTable14', name: 'Log14'},
			    {id: 'logTable15', name: 'Log15'},
			    {id: 'logTable16', name: 'Log16'},
			    {id: 'logTable17', name: 'Log17'},
			    {id: 'logTable18', name: 'Log18'},
			    {id: 'logTable19', name: 'Log19'},
			    {id: 'logTable20', name: 'Log20'}
			];
			
			// 遍历所有表格
			tableIds.forEach(table => {
			    const tableElem = document.getElementById(table.id);
			    if (tableElem) {
			        // 将表格转换为工作表
			        const ws = XLSX.utils.table_to_sheet(tableElem);
			        // 添加工作表到工作簿
			        XLSX.utils.book_append_sheet(wb, ws, table.name);
			    }
			});
			
			// 添加文本内容作为第一个Sheet
			const outputContent = document.getElementById('output').textContent;
			const outputWs = XLSX.utils.aoa_to_sheet([["日志解析"], ...outputContent.split('\n').map(line => [line])]);
			XLSX.utils.book_append_sheet(wb, outputWs, "原始日志", 0); // 作为第一个Sheet
			
			// 生成文件名
			const fileName = anaFileName ? 
			    anaFileName.replace(".txt", "-完整日志.xlsx") : 
			    "combined_tables.xlsx";
			
			// 写入文件
			XLSX.writeFile(wb, fileName);
			loading.style.display = 'none';
		}, 0);
	} finally {
		// 确保最终隐藏加载动画
		//loading.style.display = 'none';
	}
    
}





function displayLogData(data, domName) {

	const tableBody = document.querySelector(domName);
	tableBody.innerHTML = '';

	// 强制刷新：让浏览器完成当前的渲染，随后强制刷新
	window.requestAnimationFrame(() => {
		window.requestAnimationFrame(() => {
			// 这里可以执行一些后续操作，如重新渲染表格数据等
			// Loop through each row of log data (log12Array is a 2D array)
			data.forEach((row, rowIndex) => {
				// For each row, create a new table row (tr)
				const tr = document.createElement('tr');

				// For each field in the row, create a new table cell (td)
				row.forEach((cell, cellIndex) => {
					const td = document.createElement('td');
					td.textContent = cell; // Set the text content of the cell
					tr.appendChild(td); // Append the cell to the row
				});

				// Append the row to the table body
				tableBody.appendChild(tr);
			});
		});
	});

}

// Function to export table data to Excel (.xlsx)
function exportTableToExcel(tableId, fileName) {
	try {
		// 显示加载动画
		loading.style.display = 'flex';
		
		// 给浏览器渲染机会
		setTimeout(() => {
			const table = document.getElementById(tableId);
			
			// Create a new workbook
			const wb = XLSX.utils.table_to_book(table, {
				sheet: "Sheet1"
			});
			
			// Write the workbook and trigger download
			XLSX.writeFile(wb, anaFileName.replace(".txt","-")+fileName);
			loading.style.display = 'none';
		}, 100);
	} finally {
		// 确保最终隐藏加载动画
		
	}
	
}

// Add event listener for export buttons
document.getElementById('exportButton12').addEventListener('click', function() {
	exportTableToExcel('logTable12', 'log12.xlsx'); // Only trigger the export when the button is clicked
});

document.getElementById('exportButton13').addEventListener('click', function() {
	exportTableToExcel('logTable13', 'log13.xlsx'); // Only trigger the export when the button is clicked
});

document.getElementById('exportButton14').addEventListener('click', function() {
	exportTableToExcel('logTable14', 'log14.xlsx'); // Only trigger the export when the button is clicked
});

document.getElementById('exportButton15').addEventListener('click', function() {
	exportTableToExcel('logTable15', 'log15.xlsx'); // Only trigger the export when the button is clicked
});

document.getElementById('exportButton16').addEventListener('click', function() {
	exportTableToExcel('logTable16', 'log16.xlsx'); // Only trigger the export when the button is clicked
});

document.getElementById('exportButton17').addEventListener('click', function() {
	exportTableToExcel('logTable17', 'log17.xlsx'); // Only trigger the export when the button is clicked
});

document.getElementById('exportButton18').addEventListener('click', function() {
	exportTableToExcel('logTable18', 'log18.xlsx'); // Only trigger the export when the button is clicked
});

document.getElementById('exportButton19').addEventListener('click', function() {
	exportTableToExcel('logTable19', 'log19.xlsx'); // Only trigger the export when the button is clicked
});

document.getElementById('exportButton20').addEventListener('click', function() {
	exportTableToExcel('logTable20', 'log20.xlsx'); // Only trigger the export when the button is clicked
});

function toggleDisplay(element) {
	// 检查当前元素的 display 样式
	const currentDisplay = window.getComputedStyle(element).display;

	// 如果元素的 display 是 'none'，则将其更改为默认显示值（例如 'block'），否则设置为 'none'
	if (currentDisplay === 'none') {
		element.style.display = 'block'; // 或者你可以设置为 'inline', 'flex' 等，根据需求
	} else {
		element.style.display = 'none';
	}
}

function toggleDisplayFasle(element) {
	// 检查当前元素的 display 样式
	const currentDisplay = window.getComputedStyle(element).display;

	element.style.display = 'none';
}