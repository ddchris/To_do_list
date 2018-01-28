
var text = document.querySelector('.text');
var btn = document.querySelector('.send');
var el_ToDOList = document.querySelector('.list');

// 如果 things 不存在 Localstorge 便加入
if (!localStorage.getItem('things'))
	{	var things_str = '[]';
		localStorage.setItem('things', things_str);
	};
// 函式
function updateToDoList (things) {
	var toDoList ='';
	var len = things.length;
	for (var i=0; i<len;i++){
		toDoList+= '<li data-num="'+i+'">';
		toDoList+= '<button>刪除</button>   ';
		toDoList+= things[i];
		toDoList+= '</li>';
	}
	el_ToDOList.innerHTML = toDoList;

};

function addThing (e) {
	// 若無輸入不動作
	if (!text.value) {return};

	var thing = text.value;
	// 取得 localStorage 資料並添加新的一筆
	var things_str = localStorage.getItem('things');
	var things = JSON.parse(things_str);
	// 利用 陣列名.push(data) 添加一筆資料
	things.push(thing);

    // 將新資料送回 localStorage
	things_str = JSON.stringify(things);
	localStorage.setItem('things', things_str );

	// 更新待辦事項清單並清空欄位值
	updateToDoList(things);
	text.value =''
};

function deleteThing (e) {
	// 當點擊刪除時執行
	if (e.target.nodeName !='BUTTON'){return};
	// 取得 BOTTON 父元素 li 屬性值 num
	var num = e.target.parentElement.dataset.num;
	// 取得 localStorage 資料並轉成陣列
	var things_str = localStorage.getItem('things');
	var things = JSON.parse(things_str);
	// 刪除一筆指定的資料
	things.splice(num, 1);
	// 將資料寫回 Localstorge
	things_str = JSON.stringify(things);
	localStorage.setItem('things', things_str );
	// 再次更新代辦事項清單
	updateToDoList(things);
};

// 載入頁面時更新資料
var things_str = localStorage.getItem('things');
var things = JSON.parse(things_str);
updateToDoList(things);

// 事件監聽
btn.addEventListener('click', addThing, false);
el_ToDOList.addEventListener('click', deleteThing, false);


