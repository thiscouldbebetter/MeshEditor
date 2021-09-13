
class Mesh
{
	constructor(vertices, faces)
	{
		this.vertices = vertices;
		this.faces = faces;
		 
		this.edgesBuild();
	}

	// helper variables

	static drawPos = new Coords();

	// instance methods

	edgesBuild()
	{
		this.edges = [];
		var edgeLookup = [];
		 
		for (var f = 0; f < this.faces.length; f++)
		{
			var face = this.faces[f];
			var faceVertexIndices = face.vertexIndices;
			 
			for (var vi = 0; vi < faceVertexIndices.length; vi++)
			{		   
				var vertexIndex = faceVertexIndices[vi];
				var vertex = this.vertices[vertexIndex];
 
				var viNext = NumberHelper.wrapValueToRangeMax(vi + 1, faceVertexIndices.length);
				var vertexIndexNext = faceVertexIndices[viNext];
				var vertexNext = this.vertices[vertexIndexNext];
				 
				var vertexIndicesSorted;
				if (vertexIndex < vertexIndexNext)
				{
					vertexIndicesSorted = [vertexIndex, vertexIndexNext];
				}
				else
				{
					vertexIndicesSorted = [vertexIndexNext, vertexIndex];
				}
				 
				var vertexIndexLesser = vertexIndicesSorted[0];
				var vertexIndexGreater = vertexIndicesSorted[1];
				 
				var edgesWithVertexIndexLesser = edgeLookup[vertexIndexLesser];
				if (edgesWithVertexIndexLesser == null)
				{
					edgesWithVertexIndexLesser = [];
					edgeLookup[vertexIndexLesser] = edgesWithVertexIndexLesser;
				}
				var edgeExisting = edgesWithVertexIndexLesser[vertexIndexGreater];
				if (edgeExisting == null)
				{
					var edgeNew = new Edge([vertexIndexLesser, vertexIndexGreater])
					edgesWithVertexIndexLesser.push(edgeNew);
					 
					this.edges.push(edgeNew);
				}
				else
				{
					// todo
				}
			}
		}
	}
	 
	edgesConnectWithFace(vertexIndicesForEdges)
	{
		if (vertexIndicesToConnect.length < 3 || vertexIndicesToConnect.length > 4)
		{
			alert("Either 3 or 4 vertices must be selected!");
		}
		else
		{
			var face = new Face(vertexIndicesToConnect.slice(0));
			this.faces.add(face);
			this.edgesBuild();
		}
	}
	 
 
	vertexRemove(vertexToRemove)
	{
		// todo
		var vertexIndexBeingRemoved = this.vertices.indexOf(vertexToRemove);
		this.vertices.remove(vertexToRemove);
		 
		var facesToRemove = [];
		 
		for (var f = 0; f < this.faces.length; f++)
		{
			var face = this.faces[f];
			var faceVertexIndices = face.vertexIndices;
			for (var vi = 0; vi < faceVertexIndices.length; vi++)
			{
				var faceVertexIndex = faceVertexIndices[vi];
				if (faceVertexIndex == vertexIndexBeingRemoved)
				{
					facesToRemove.push(face);
					break;
				}
				else if (faceVertexIndex > vertexIndexBeingRemoved)
				{
					faceVertexIndices[vi] = faceVertexIndex - 1;
				}
			}
		}
		 
		for (var fi = 0; fi < facesToRemove.length; fi++)
		{
			var faceToRemove = facesToRemove[fi];
			this.faces.remove(faceToRemove);
		}
		 
		this.edgesBuild();
	}
	 
	verticesConnectWithEdge(vertexIndicesToConnect)
	{
		if (vertexIndicesToConnect.length != 2)
		{
			alert("Exactly 2 vertices must be selected!");
		}
		else
		{
			var edge = new Edge(vertexIndicesToConnect);
			this.edges.push(edge);
		}
	}
	 
	verticesRemove(verticesToRemove)
	{
		for (var i = 0; i < verticesToRemove.length; i++)
		{
			var vertex = verticesToRemove[i];
			 
			this.vertexRemove(vertex);
		}
	}
		 
	// drawable
	 
	drawToDisplayForScene(display, scene)
	{
		var camera = scene.camera;
	 
		for (var i = 0; i < this.edges.length; i++)
		{
			var edge = this.edges[i];
			edge.drawToDisplayForCameraAndMesh(display, camera, this);
		}
		 
		var drawPos = Mesh.drawPos;
		var vertexHandleRadiusActual = .25;
		 
		if (scene.highlightVertices == true)
		{
			for (var i = 0; i < this.vertices.length; i++)
			{
				var vertex = this.vertices[i];
				drawPos.overwriteWith(vertex);
				camera.transformCoordsWorldToView(drawPos);
				var vertexHandleRadiusApparent = camera.transformDistanceWorldToView
				(
					vertexHandleRadiusActual, drawPos.z
				);
				display.drawCircle(drawPos, vertexHandleRadiusApparent, null, display.colorFore);
			}
		}
		 
		if (scene.highlightFaces == true)
		{
			for (var i = 0; i < this.faces.length; i++)
			{
				var face = this.faces[i];
				face.drawToDisplayForCameraAndMesh(display, camera, this);
			}
		}
	}
}
