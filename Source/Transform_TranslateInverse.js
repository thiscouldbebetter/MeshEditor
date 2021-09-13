
class Transform_TranslateInverse
{
	constructor(offset)
	{
		this.offset = offset;
	}

	transformCoords(coordsToTransform)
	{
		return coordsToTransform.subtract(this.offset);
	}
}
