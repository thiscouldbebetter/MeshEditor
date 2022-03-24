
class Selection
{
	constructor()
	{
		this.vertexIndices = [];
	}

	medianForMesh(mesh)
	{
		var returnValue = null;
		if (this.vertexIndices.length > 0)
		{
			var verticesSelected = this.verticesForMesh(mesh);
			var bounds = Bounds.ofPoints(verticesSelected);
			returnValue = bounds.center();
		}
		return returnValue;
	}
	 
	verticesForMesh(mesh)
	{	   
		var returnValues = [];
	 
		for (var i = 0; i < this.vertexIndices.length; i++)
		{
			var vertexIndex = this.vertexIndices[i];
			var vertex = mesh.vertices[vertexIndex];
			returnValues.push(vertex);
		}
		 
		return returnValues;
	}
 
	// drawable
 
	drawToDisplayForCameraAndMesh(display, camera, mesh)
	{
		var drawPos = display.drawPos;
		var vertexHandleRadiusActual = .25;
		 
		for (var i = 0; i < this.vertexIndices.length; i++)
		{
			var vertexIndex = this.vertexIndices[i];
			var vertex = mesh.vertices[vertexIndex];
			drawPos.overwriteWith(vertex);
			camera.transformCoordsWorldToView(drawPos);
			var vertexHandleRadiusApparent = camera.transformDistanceWorldToView
			(
				vertexHandleRadiusActual, drawPos.z
			);
			display.drawCircle(drawPos, vertexHandleRadiusApparent, display.colorFore, null);
		}
	}
}
