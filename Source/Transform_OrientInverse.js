
class Transform_OrientInverse
{
	constructor(orientation)
	{
		this.orientation = orientation;
	}

	transformCoords(coordsToTransform)
	{
		var original = coordsToTransform.clone();

		coordsToTransform.overwriteWith
		(
			this.orientation.right.clone().multiplyScalar(original.x)
		).add
		(
			this.orientation.down.clone().multiplyScalar(original.y)
		).add
		(
			this.orientation.forward.clone().multiplyScalar(original.z)
		);

		return coordsToTransform;
	}
}
