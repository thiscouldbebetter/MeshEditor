
class Transform_Orient
{
	constructor(orientation)
	{
		this.orientation = orientation;
	}

	transformCoords(coordsToTransform)
	{
		coordsToTransform.overwriteWithXYZ
		(
			this.orientation.right.dotProduct(coordsToTransform),
			this.orientation.down.dotProduct(coordsToTransform),
			this.orientation.forward.dotProduct(coordsToTransform)
		);
	 
		return coordsToTransform;
	}
}
