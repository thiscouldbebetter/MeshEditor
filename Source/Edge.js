
class Edge
{
	constructor(vertexIndices)
	{
		this.vertexIndices = vertexIndices;
	}

	// helper variables
 
	static drawPosFrom = new Coords();
	static drawPosTo = new Coords();
 
	// methods
 
	vertices(mesh)
	{
		var returnValues = [];
	 
		var vertices = mesh.vertices;
		for (var i = 0; i < this.vertexIndices.length; i++)
		{
			var vertexIndex = this.vertexIndices[i];
			var vertex = vertices[vertexIndex];
			returnValues.push(vertex);
		}

		return returnValues;
	}

	// drawable

	drawToDisplayForCameraAndMesh(display, camera, mesh)
	{
		var fromPos = Edge.drawPosFrom;
		var toPos = Edge.drawPosTo;

		var vertices = this.vertices(mesh);

		fromPos.overwriteWith(vertices[0]);
		camera.transformCoordsWorldToView(fromPos);

		toPos.overwriteWith(vertices[1]);
		camera.transformCoordsWorldToView(toPos);

		display.drawLine(fromPos, toPos);
	}
}
