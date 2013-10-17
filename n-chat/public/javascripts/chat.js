/**
 * chat.js
 * @authors Your Name (you@example.org)
 * @date    2013-10-14 10:45:41
 * @version $Id$
 */

$(document).ready(function() {

	//刷新页面时弹出确认
	$(window).keydown(function(e) {
		if (e.keyCode == 116) {
			if (!confirm("刷新将会清除所有聊天记录，确定要刷新么？")) {
				e.preventDefault();
			} else {}
		} else {}
	});


	var socket = io.connect(), //连接服务器
		from = $.cookie('user'), //从cookie中官渡区用户名存于from变量中
		to = 'all'; //设置默认接收对象为所有人

	//发送上线信号
	socket.emit('online', {
		user: from
	}); //发送用户上线信号

	//监听上线信号
	socket.on('online', function(data) {
		var sys = '';
		//显示系统消息
		if (data.user !== from) {
			sys = '<div style="color:#f00">系统（' + now() + '）：用户' + data.user + '上线了！</div>';
		} else {
			sys = '<div>系统（' + now() + '）:你进入了聊天室！</div>';
		}

		$('#contents').append(sys + '<br/>');
		flushUsers(data.users); //刷新用户在线列表
		showSayTo(); //显示正在对谁说话
	});

	//监听说话信号
	socket.on('say', function(data) {
		if (data.to === 'all') {
			$("#contents").append('<div>' + data.from + '(' + now() + ')对 所有人 说：<br/>' + data.msg + '</div><br />');
		} else {
			$("#contents").append('<div>' + data.from + '(' + now() + ')对 你 说：<br/>' + data.msg + '</div><br />');
		}
	});

	//监听offline信号
	socket.on('offline', function(data) {
		//显示系统消息
		var sys = '<div style="color:#f00">系统(' + now() + '):' + '用户 ' + data.user + ' 下线了！</div>';
		$("#contents").append(sys + "<br/>");
		//刷新用户在线列表
		flushUsers(data.users);
		//如果正对某人聊天，该人却下线了
		if (data.user == to) {
			to = "all";
		}
		//显示正在对谁说话
		showSayTo();
	});

	//服务器关闭
	socket.on('disconnect', function() {
		var sys = '<div style="color:#f00">系统:连接服务器失败！</div>';
		$("#contents").append(sys + "<br/>");
		$("#list").empty();
	});

	//重新启动服务器
	socket.on('reconnect', function() {
		var sys = '<div style="color:#f00">系统:重新连接服务器！</div>';
		$("#contents").append(sys + "<br/>");
		socket.emit('online', {
			user: from
		});
	});

	/**
	 * 刷新用户在线列表
	 * @param  {[type]} users [description]
	 * @return {[type]}       [description]
	 */

	function flushUsers(users) {
		console.log('users.length: ' + users.length);
		$("#list").empty().append('<li title="双击聊天" alt="all" class="sayingto" onselectstart="return false">所有人</li>');
		for (var i in users) {
			$("#list").append('<li alt="' + users[i] + '" title="双击聊天" onselectstart="return false">' + users[i] + '</li>');
		}
		$("#list > li").dblclick(function() {
			if ($(this).attr('alt') !== from) {
				to = $(this).attr('alt');
				$("#list > li").removeClass('sayingto');
				$(this).addClass('sayingto');
				showSayTo();
			} else {}
		});
	}

	/**
	 * 显示对谁说话
	 * @return {[type]} [description]
	 */

	function showSayTo() {
		$("#from").html(from);
		$("#to").html(to === 'all' ? '所有人' : to);
	}

	/**
	 * 返回当前时间
	 * @return {[type]} [description]
	 */

	function now() {
		var date = new Date();
		var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
		return time;
	}

	//监听发送click事件
	$("#say").click(function() {
		var $msg = $('#input_content').html();
		if (!$msg)
			return;
		if (to === 'all') {
			$('#contents').append('<div>你（' + now + '）对 <b>所有人</b> 说：<br/>' + $msg + '</div><br/>');
		} else {
			$("#contents").append('<div style="color:#00f" >你(' + now() + ')对 ' + to + ' 说：<br/>' + $msg + '</div><br />');
		}
		//客户端发射say信号
		socket.emit('say', {
			from: from,
			to: to,
			msg: $msg
		});
		$("#contents").html('').focus();
	});
});