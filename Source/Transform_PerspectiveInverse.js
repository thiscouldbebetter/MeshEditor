
class Transform_PerspectiveInverse
{
	constructor(focalLength)
	{
		this.focalLength = focalLength;
	}

	transformCoords(coordsToTransform)
	{
		if (coordsToTransform.z != 0)
		{
			var multiplier = coordsToTransform.z / (this.focalLength * this.focalLength); // hack
			coordsToTransform.x *= multiplier;
			coordsToTransform.y *= multiplier;
			coordsToTransform.z /= this.focalLength; // fix
		}
		return coordsToTransform;
	}
}
