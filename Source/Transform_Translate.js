
class Transform_Translate
{
	constructor(offset)
	{
		this.offset = offset;
	}

	transformCoords(coordsToTransform)
	{
		return coordsToTransform.add(this.offset);
	}
}
