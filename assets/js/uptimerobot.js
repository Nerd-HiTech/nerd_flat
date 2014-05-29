﻿			api_uptimerobot = "u142481-e8ad7454b1327071daa36e5d";
			danger_percentage = 95;
			
			$( document ).ready(function() {
				get_monitors();
				window.setInterval(function(){
					get_monitors();
				}, 300000);


			});

			function get_monitors(){
				reseter = 0;
				$.getJSON("http://api.uptimerobot.com/getMonitors?apiKey=" +api_uptimerobot+"&format=json&noJsonCallback=1", function(json) {
					for (var x in json.monitors.monitor) {
						if(json.monitors.monitor[x].alltimeuptimeratio>danger_percentage){uptime_color = "default";}else{uptime_color = "danger"}
						if(json.monitors.monitor[x].status==2){status_color="success";status="online";}else{status_color="danger";status="offiline";}
						if(json.monitors.monitor[x].status!=2 && json.monitors.monitor[x].alltimeuptimeratio<=danger_percentage) {row_color = "danger";}
							else if(json.monitors.monitor[x].status!=2 || json.monitors.monitor[x].alltimeuptimeratio<=danger_percentage) {row_color = "warning";}
							else{row_color = "success";}
						uptimerobot_row = document.getElementById("uptimerobot_data");

						if(reseter==0) {uptimerobot_row.innerHTML = "";}
						uptimerobot_row.innerHTML = uptimerobot_row.innerHTML + '<tr id="monitor-'+ x +'" class="'+row_color+'"></tr>';
						row = document.getElementById("monitor-"+x+"");

						uptime =Number(json.monitors.monitor[x].alltimeuptimeratio).toFixed(2)+"%";

						row.innerHTML = "<td><a href='"+json.monitors.monitor[x].url+"' target='_Blank'>"+json.monitors.monitor[x].friendlyname+"</a></td>";
						row.innerHTML = row.innerHTML+ "<td class='text-right'><span class='label label-"+uptime_color+"'>"+uptime+"</span></td>";
						row.innerHTML = row.innerHTML+ "<td class='text-right'><span class='label label-"+status_color+"'>"+status+"</span></td>";

						reseter = 1;
					}
				});
			}