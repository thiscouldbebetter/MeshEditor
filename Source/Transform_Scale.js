
class Transform_Scale
{
	constructor(scaleFactors)
	{
		this.scaleFactors = scaleFactors;
	}

	transformCoords(coordsToTransform)
	{
		return coordsToTransform.multiply(this.scaleFactors);
	}
}