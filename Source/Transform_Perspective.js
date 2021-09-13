
class Transform_Perspective
{
	constructor(focalLength)
	{
		this.focalLength = focalLength;
	}

	transformCoords(coordsToTransform)
	{
		if (coordsToTransform.z != 0)
		{
			var multiplier = this.focalLength / coordsToTransform.z;
			coordsToTransform.x *= multiplier;
			coordsToTransform.y *= multiplier;
			coordsToTransform.z *= this.focalLength;
		}
		return coordsToTransform;
	}
}
