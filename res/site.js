window.onload = function() {
// id of Cytoscape Web container div
var div_id = "cytoscapeweb";

labels = ["Moteur\nde\nrecherche", "Mots\ncles", "Recherche\ndes\npages", "PageRank"] 

var options = {
	swfPath: "res/graphe/CytoscapeWeb",
	flashInstallerPath: "res/graphe/playerProductInstall"
};

var vis = new org.cytoscapeweb.Visualization(div_id, options);

var networ_json = {

	dataSchema: {
			nodes: [ { name: "label", 	type: "string" },
					 { name: "url", 	type: "string" },
					 { name: "size", 	type: "integer"},
					 { name: "color", 	type: "string"},
					 { name: "bcolor", 	type: "string"},
					 { name: "hbcolor", type: "string"},
					 { name: "fontS", 	type: "Integer"}
				],
			edges: [ { name: "label", 	type: "string" },
					 { name: "bar", 	type: "string" }
			]
	},

	data: {
		nodes: [{ id: "0", label:labels[0], color: "#ABCFD6", fontS: 23, bcolor: "#F7F7F7", hbcolor: "#F7F7F7", size: 200, url:""}, 
				{ id: "1", label:labels[1], color: "#F7F7F7", bcolor: "#ABCFD6", hbcolor: "#0B94B1", size: 90, url:"motsCle.html"}, 
				{ id: "2", label:labels[2], color: "#F7F7F7", bcolor: "#ABCFD6", hbcolor: "#0B94B1", size: 90, url:"recherche.html"}, 
				{ id: "3", label:labels[3], color: "#F7F7F7", bcolor: "#ABCFD6", hbcolor: "#0B94B1", size: 90, url:"pageRank.html"} ],

		edges: [ 	{ id: "0to1", target: "0", source: "1" }, 
					{ id: "0to2", target: "0", source: "2" }, 
					{ id: "0to3", target: "0", source: "3" } ]
	}
};		


// visual style we will use
var visual_style = {
	global: {
		backgroundColor: "#FFFFFF"
	},
	nodes: {
		shape: "ELIPSE",
		borderWidth: 3,
		borderColor: {
			passthroughMapper: { attrName: "bcolor"}
		},
		hoverBorderColor: {
			passthroughMapper: { attrName: "hbcolor"}
		},

		size: {
			passthroughMapper: { attrName: "size"}
		},
		color: {
			passthroughMapper: { attrName: "color"}
		},
		labelFontSize: 15,
		labelHorizontalAnchor: "center",
		selectionGlowColor: "#ABCFD6",
		labelFontName:"verdana",
		labelFontSize: {
			defaultValue: 15,
			passthroughMapper: { attrName: "fontS"}
		}
	},
	edges: {
		color: "#0B94B1",
		width: {
			defaultValue: 3
		},
		selectionGlowColor: "#ABCFD6"
	}
};


var draw_options = {
	// your data goes here
	network: networ_json,
						
	// let's try another layout
	layout: "Circle",
	// set the style at initialisation
	visualStyle: visual_style,
	
	// hide pan zoom
	panZoomControlVisible: true 
};



vis.ready(function() {

	vis.addListener("click", "nodes", function(evt) {
		var node = evt.target;
		if (node.data["id"] != "0") {
			deplacer();
			setTimeout(function(){document.location.href=node.data.url}, 500);
		}
	});
	vis.addListener("mouseover", "nodes", function(evt) {
		var node = evt.target;

		if (node.data.size == 90)  {
			for(var i = 90; i <= 105; i++) {
				node.data.size = i;
				vis.updateData([node]);
			}
		}
	});
	vis.addListener("mouseout", "nodes", function(evt) {
		var node = evt.target;
		if (node.data.size == 105)  {
			
			for(var i = 105; i >= 90; i--) {
				node.data.size = i;
				vis.updateData([node]);
			}
		}
		
	});
});


vis.draw(draw_options);

};

function deplacer() {
	$( "#cytoscapeweb" ).animate({
		top: -document.body.clientHeight+"px"
	}, 500);
// problème: quand on revient en arriere, top est tjs à - la taille de l'écran et non à 0.
}