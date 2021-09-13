
class Face
{
	constructor(vertexIndices)
	{
		this.vertexIndices = vertexIndices;
	}

	medianForMesh(mesh)
	{
		var vertices = this.vertices(mesh);
		var median = vertices[0].clone();
		for (var i = 1; i < vertices.length; i++)
		{
			var vertex = vertices[i];
			median.add(vertex);
		}
		median.divideScalar(vertices.length);
		 
		return median;
	}
 
	plane(mesh)
	{
		var vertices = this.vertices(mesh);
		var plane = Plane.fromPoints(vertices);
		return plane;
	}
 
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
		var median = this.medianForMesh(mesh);
		var normal = this.plane(mesh).normal;
 
		var fromPos = median;
 
		var normalIndicatorLength = 1;
		var toPos = normal.multiplyScalar(normalIndicatorLength).add(median);
 
		camera.transformCoordsWorldToView(fromPos);
		camera.transformCoordsWorldToView(toPos);
		 
		display.drawRectangle
		(
			fromPos, Coords.Instances().Ones, null, display.colorFore
		);
		display.drawLine(fromPos, toPos);
	}
 
}
