$(fnInit())

var links;

function fnInit() {
	console.log("init");
	fnLoadData();
	//fnTestElementFromStructure();
}

function fnLoadData() {
	fetch("links.json").then(response => response.json()).then(data => {
		links = data;
		//console.log(links);
		fetch("data.json").then(response => response.json()).then(data => {
			let str = [
				"objective",
				"hobbies",
				"interests",
				"publications",
			];
			str.forEach(item => {
				const elementStructure = {
					"tagName": "div",
					"style": {
						"padding-bottom": "1rem",
					},
					"children": [
						{
							"tagName": "div",
							"style": {
								"padding-bottom": "0.5rem",
								"color": "black",
								"font-weight": "bolder"
							},
							"children": [
								{
									"tagName": "i",
									"class": data[item]["icon"],
								},
								{
									"tagName": "span",
									"style": {
										"padding-left": "0.2rem"
									},
									"innerText": data[item]["title"]
								}

							],
						},
						{
							"tagName": "div",
							"style": {
								"padding-left": "1.5rem",
								"font-size": "smaller",
								"text-align": "justify"
							},
							"innerHTML": fnReplaceKeywords2Links(data[item]["content"])
						}
					]
				};
				$('#' + item).append(fnCreateHTMLElementFromTableStructure(elementStructure));

				/*
				$('#' + item).append(`
					<div style="padding-bottom: 1rem;">
						<div style="padding-bottom: 0.5rem; color: black; font-weight: bolder;"><i class="`+ data[item]["icon"] + `"></i> ` +
					data[item]["title"] +
					`</div>
						<div style="padding-left: 1.5rem; font-size: smaller;">`+
					fnReplaceKeywords2Links(data[item]["content"]) +
					`</div>
					</div>
				`);
				*/
			});

			str = [
				"academics",
				"occupations",
				"trainings"
			];
			str.forEach(item => {
				if (data[item] != null) {
					let strHtml = `
						<div>
							<div style="color: black; font-weight: bolder;">
								<i class="`+
						data[item]["icon"] + `"></i> ` +
						data[item]["title"] + `
								<div style="padding-bottom: 0.5rem;"></div>
							</div>
						`;
					let strHtml_1 = "";
					let index = 0;
					data[item]["content"].forEach(item_1 => {
						let strPadding = "0.5";
						if (index == data[item]["content"].length - 1) {
							strPadding = "0";
						};
						index++;

						let strText_1 = "";
						let strText_2 = "";

						switch (item) {
							case str[0]:
								strText_1 = item_1["course"];
								strText_2 = item_1["subject"];
								break;
							case str[1]:
								strText_1 = item_1["designation"];
								strText_2 = item_1["field"];
								break;
							case str[2]:
								strText_1 = item_1["category"];
								strText_2 = item_1["scope"];
								break;
						}

						let strOrg = "";
						strType = "organization";
						if (item_1[strType] != "" && item_1[strType] != null) {
							strOrg = `<tr><td><i class="fas fa-landmark"></i></td><td>` + fnStr2LinkHTML(item_1[strType]) + `</td></tr>`;
						};

						let strIndustry = "";
						strType = "industry";
						if (item_1[strType] != "" && item_1[strType] != null) {
							strIndustry = `<tr><td><i class="fas fa-industry"></i></td><td>` + fnStr2LinkHTML(item_1[strType]) + `</td></tr>`;
						};

						let strScore = "";
						strType = "score";
						if (item_1[strType] != "" && item_1[strType] != null) {
							strScore = `<tr><td><i class="fas fa-chart-line"></i></td><td>` + item_1[strType] + `</td></tr>`;
						};

						let strTools = "";
						strType = "tools";
						if (item_1[strType] != "" && item_1[strType] != null) {
							strTools = `<tr><td><i class="fa fa-wrench"></i></td><td>` + fnList2linksHTML(item_1[strType]) + `</td></tr>`;
						};

						let strTasks = "";
						strType = "tasks"
						if (item_1[strType] != "" && item_1[strType] != null) {
							strTasks = `<tr><td><i class="fas fa-tasks"></i></td><td>` + fnReplaceKeywords2Links(item_1[strType]) + `</td></tr>`;
						};

						let strDate = "";
						strType = "date"
						if (item_1[strType] != "" && item_1[strType] != null) {
							strDate = `<tr><td><i class="far fa-calendar-alt"></i></td><td>` + item_1[strType] + `</td></tr>`;
						};

						let strDuration = "";
						if (item_1['start'] != "" && item_1['start'] != null && item_1['end'] != "" && item_1['end'] != null) {
							strDuration = `<tr><td><i class="far fa-calendar-alt"></i></td><td>` + item_1["start"] + ` - ` + item_1["end"] + `</td></tr>`
						}

						let strSubjects = "";
						strType = "subjects"
						if (item_1[strType] != "" && item_1[strType] != null) {
							strSubjects = `<tr><td><i class="fa fa-book"></i></td><td>` + item_1[strType] + `</td></tr>`;
						};

						let strTechnologies = "";
						strType = "technologies"
						if (item_1[strType] != "" && item_1[strType] != null) {
							strTasks = `<tr><td><i class="fas fa-cog"></i></td><td>` + fnList2linksHTML(item_1[strType]) + `</td></tr>`;
						};

						strHtml_1 += `
							<div style="padding-left: 1.5rem;">
								<div style="font-weight: bolder; font-size: 0.9rem;">`+ strText_1 + `</div>
								<div style="font-size: x-small;">`+ strText_2 + `
									<div style="padding-left: 0.5rem; font-size: small;">
									<table> `+
							strOrg +
							strIndustry +
							strDuration +
							strDate +
							strScore +
							strTools +
							strSubjects +
							strTechnologies +
							strTasks + `
									</table> 
									</div>
								</div>
								<div style="padding-bottom: `+ strPadding + `rem;"></div>
							</div>
							</div>
							`;
					});
					strHtml += strHtml_1 + `<div style="padding-bottom:1rem;"></div></div>`
					$('#' + item).append(strHtml);
				};
			});

			item = "projects";
			if (data[item] != null) {
				let strHtml = `
					<div>
						<div style="color: black; font-weight: bolder;">
							<i class="`+
					data[item]["icon"] + `"></i> ` +
					data[item]["title"] + `
							<div style="padding-bottom: 0.5rem;"></div>
						</div>
						<div style="padding-left: 1.5rem;">
					`;
				let strHtml_1 = "";
				data[item]["content"].forEach(item_1 => {
					let strText_1 = item_1["course"];
					let strText_2 = item_1["subject"];
					strHtml_1 += `
							<div style="font-weight: bolder; font-size: 0.9rem;">`+ strText_1 + `</div>
							<div style="font-size: x-small;">`+ strText_2 + `
							<div style="padding-bottom: 0.5rem;"></div>
								<div style="padding-left: 0.5rem; font-size: small;">
									<ol>
							`;
					let strHtml_2 = "";
					item_1["projects"].forEach(item_2 => {
						strHtml_2 += `
										<li>
											<i><strong>`+ fnReplaceKeywords2Links(item_2["title"]) + `</strong><br></i>` +
							fnReplaceKeywords2Links(item_2["description"]) + `
											<div style="padding-bottom: 0.5rem;"></div>
										</li>
						`
					});
					strHtml_1 += strHtml_2 + `
									</ol >
								</div >
							</div >
							`;
				});
				strHtml += strHtml_1 + `
					</div >
							`;

				$('#' + item).append(strHtml);
			};

			item = "skills";
			if (data[item] != null) {
				let strHtml = `
					<div>
						<div style="color: black; font-weight: bolder;">
							<i class="`+
					data[item]["icon"] + `"></i> ` +
					data[item]["title"] + `
							<div style="padding-bottom: 0.5rem;"></div>
						</div>
						<div style="padding-left: 1.5rem;">
					`;
				let strHtml_1 = "";
				data[item]["content"].forEach(item_1 => {
					let strText_1 = item_1["category"];
					strHtml_1 += `
							<div style="font-weight: bolder; font-size: 0.9rem;">`+ strText_1 + `</div>
							<div style="padding-bottom: 0rem;"></div>
								<div style="padding-left: 0.5rem; font-size: small;">
									<ul>
							`;
					let strHtml_2 = "";
					if (item_1["skills"] != null) {
						strType = "skills";
						item_1["skills"].forEach(item_2 => {
							strHtml_2 += `
											<li> `+
								fnList2linksHTML(item_2) +
								`
												<div style="padding-bottom: 0rem;"></div>
											</li>
							`
						});
					} else if (item_1["subcategory"] != null) {
						item_1["subcategory"].forEach(item_2 => {
							let strHtml_3 = "";
							if (item_2["description"] != null) {
								item_2["description"].forEach(item_3 => {
									strHtml_3 +=
										fnList2linksHTML(item_3);
								});
							}
							strHtml_2 += `
											<li><i><b>`+
								item_2["type"] +
								`
												</b></i>
											</li> `+ strHtml_3 + `
											<div style="padding-bottom: 0.2rem;"></div>
							`
						});
					};
					strHtml_1 += strHtml_2 + `
									</ul>
									<div style="padding-bottom: 0.5rem;"></div>
								</div>
							`;
				});
				strHtml += strHtml_1 + `
					</div>
							`;
				$('#' + item).append(strHtml);
			};

			item = "languages";
			if (data[item] != null) {
				let strHtml = `
					<div>
						<div style="color: black; font-weight: bolder;">
							<i class="`+
					data[item]["icon"] + `"></i> ` +
					data[item]["title"] + `
							<div style="padding-bottom: 0.5rem;"></div>
						</div>
						<div style="padding-left: 1.5rem;">
					` + data[item]["content"] + `</div>`;
				$('#' + item).append(strHtml);
			}

		});
	});
}

function fnTestElementFromStructure() {
	const elementStructure = {
		"tagName": "div",
		"style": {
			"color": "black",
		},
		"innerText": "DIV",
		"children": [
			{
				"tagName": "h1",
				"style": {
					"color": "green"
				},
				"innerText": "H1",
				"innerHTML": "<h2>Hello World</h2>"
			},
			{
				"tagName": "h2",
				"style": {
					"color": "red",
					"text-align": "center",
					"background-color": "yellow"
				},
				"children": [
					{
						"tagName": "i",
						"class": "fas fa-book",
					},
					{
						"tagName": "span",
						"style": {
							"padding-left": "0.5rem"
						},
						"innerText": "H2",
					}
				],
				"innerHTML": "<i>Hello Two World<i>"
			}
		]
	}
	const testElement = fnCreateHTMLElementFromTableStructure(elementStructure);
	const elTest = document.getElementById("test");
	elTest.append(testElement);
	console.log(elTest.innerText);
}

function fnCreateHTMLElementFromTableStructure(elementStructure) {
	if ("tagName" in elementStructure) {
		const elementHTML = document.createElement(elementStructure["tagName"]);
		/*
		if (key === "class") {
			elementHTML.className = elementStructure["class"];
		} else 
		 */
		if ("style" in elementStructure) {
			let attrStyle = "";
			for (const key1 in elementStructure["style"]) {
				attrStyle += `${key1}:${elementStructure["style"][key1]};`
			};
			elementHTML.setAttribute("style", attrStyle);
		}
		if ("innerHTML" in elementStructure) {
			elementHTML.innerHTML = elementStructure["innerHTML"];
		}
		if ("children" in elementStructure) {
			elementStructure["children"].forEach(childElementStructure => {
				const elementHTMLChild = fnCreateHTMLElementFromTableStructure(childElementStructure);
				//console.log(elementHTMLChild.tagName);
				elementHTML.appendChild(elementHTMLChild);
			});
		}
		if ("innerText" in elementStructure) {
			elementHTML.append(document.createTextNode(elementStructure["innerText"]));
		}
		if ("class" in elementStructure) {
			elementHTML.setAttribute("class", elementStructure["class"]);
			console.log("class", elementStructure["class"], elementHTML.className, elementHTML.tagName);
		}
		//console.log(elementHTML.innerHTML);
		return elementHTML;
	}
}

function fnList2linksHTML(arrayStr) {
	//console.log(arrayStr);
	if (!Array.isArray(arrayStr)) {
		return fnStr2LinkHTML(arrayStr);
	};
	let strSeperator = "";
	switch (strType) {
		default:
			strSeperator = ", ";
			break;
		case "technologies":
			strSeperator = "";
			break;
		case "skills":
			strSeperator = "";
			break;
		case "tasks":
			strSeperator = " ";
			break;
	}
	let strLinkHTML = ""
	let index = 0;
	arrayStr.forEach(item => {
		strLinkHTML += fnStr2LinkHTML(item);
		if (index < arrayStr.length - 1) {
			strLinkHTML += strSeperator;
		};
		index++;
	});
	strLinkHTML += "."
	return strLinkHTML;
}

function fnStr2LinkHTML(str) {
	if (links[str] != null) {
		return `<a href = '` + links[str] + `' >` + str + `</a>`;
	}
	return str;
}

function fnReplaceKeywords2Links(textWithKeywords) {
	const strS = "<l>";
	const strE = "</l>";
	let strLinkKeyword = textWithKeywords;
	let iS = textWithKeywords.indexOf(strS);
	let iE = textWithKeywords.indexOf(strE);
	let count = 0;
	do {
		let keyWord = strLinkKeyword.substring(iS + strS.length, iE);
		strLinkKeyword = strLinkKeyword.replace(strS + keyWord + strE, fnStr2LinkHTML(keyWord));
		//console.log(iS, keyWord, iE);
		//console.log("Substring:" + strLinkKeyword);
		count++;
		iS = strLinkKeyword.indexOf(strS);
		iE = strLinkKeyword.indexOf(strE);
	} while (iE != -1 && iS != -1);
	return strLinkKeyword;
}